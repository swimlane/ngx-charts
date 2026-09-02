import { YAxisTicksComponent } from './y-axis-ticks.component';
import { calculateViewDimensions } from '../view-dimensions.helper';
import { trimLabel } from '../trim-label.helper';
import {
  CATEGORY_AXIS_LAYOUT_INSET,
  CATEGORY_AXIS_MAX_LINE_CHARS,
  CATEGORY_AXIS_MAX_WIDTH,
  CATEGORY_AXIS_TRIM_CHAR_WIDTH,
  displayLinesForLabel,
  resolveCategoryAxisLayout,
  wrapCategoryLabel
} from './category-axis-label.helper';

describe('YAxisTicksComponent layout width', () => {
  it('derives AXIS_LAYOUT_INSET from y-axis padding, tick spacing, and view-dim spacer', () => {
    expect(YAxisTicksComponent.AXIS_LAYOUT_INSET).toBe(4);
  });

  it('requiredYAxisWidth adds layout inset to text width', () => {
    expect(YAxisTicksComponent.requiredYAxisWidth(100)).toBe(104);
  });

  it('aligns longest label left edge with margins[3] when yAxisWidth uses requiredYAxisWidth', () => {
    const marginsLeft = 20;
    const textWidth = 96;
    const yAxisWidth = YAxisTicksComponent.requiredYAxisWidth(textWidth);

    expect(YAxisTicksComponent.labelLeftFromLayout(marginsLeft, yAxisWidth, textWidth)).toBe(marginsLeft);
  });

  it('browser bbox width converts to layout yAxisWidth without left gap', () => {
    const textWidth = 96;
    const tickSpacing = YAxisTicksComponent.INNER_TICK_SIZE + YAxisTicksComponent.TICK_PADDING;
    const bboxWidth = textWidth + tickSpacing;
    const textFromBbox = Math.max(0, bboxWidth - tickSpacing);
    const yAxisWidth = YAxisTicksComponent.requiredYAxisWidth(textFromBbox);

    expect(YAxisTicksComponent.labelLeftFromLayout(20, yAxisWidth, textWidth)).toBe(20);
  });

  it('approximateTickLabelsWidth returns layout width for SSR seeding', () => {
    const labels = ['Short', 'A much longer category label'];
    const layout = YAxisTicksComponent.resolveAxisLayout(labels, true, 16);

    expect(YAxisTicksComponent.approximateTickLabelsWidth(labels, true, 16)).toBe(layout.yAxisWidth);
  });

  it('SSR horizontal bar seed + calculateViewDimensions align label left with margins[3]', () => {
    const margins = [10, 20, 10, 20];
    const labels = ['Germany', 'United States of America'];
    const layout = YAxisTicksComponent.resolveAxisLayout(labels, true, 16, true);
    const yAxisWidth = layout.yAxisWidth;
    const wrapped = displayLinesForLabel('United States of America', yAxisWidth, true, true);
    const textWidth = Math.max(...wrapped.map(line => line.length)) * YAxisTicksComponent.TRIM_CHAR_WIDTH;
    const dims = calculateViewDimensions({
      width: 400,
      height: 300,
      margins,
      showYAxis: true
    });

    const seededDims = calculateViewDimensions({
      width: 400,
      height: 300,
      margins,
      showYAxis: true,
      yAxisWidth
    });

    expect(seededDims.xOffset).toBe(margins[3] + yAxisWidth + 10);
    expect(YAxisTicksComponent.labelLeftFromLayout(margins[3], yAxisWidth, textWidth)).toBe(margins[3]);
    expect(dims.xOffset).toBe(margins[3] + 10);
  });

  it('truncates a long single word to fit the reserved axis band instead of clipping left', () => {
    const longWord = 'Supercalifragilisticexpialidocious';
    const yAxisWidth = 100;
    const effectiveMax = YAxisTicksComponent.effectiveMaxTickLength(yAxisWidth, 16, true, longWord);

    expect(effectiveMax).toBeLessThan(16);

    const trimmed = trimLabel(longWord, effectiveMax);
    expect(trimmed.endsWith('...')).toBe(true);

    expect(trimmed.length * YAxisTicksComponent.TRIM_CHAR_WIDTH).toBeLessThanOrEqual(
      yAxisWidth - YAxisTicksComponent.AXIS_LAYOUT_INSET
    );
  });

  it('reserves ellipsis slots when computing effective max tick length', () => {
    const yAxisWidth = 100;
    const effectiveMax = YAxisTicksComponent.effectiveMaxTickLength(
      yAxisWidth,
      16,
      true,
      'Supercalifragilisticexpialidocious'
    );
    const trimmed = trimLabel('Supercalifragilisticexpialidocious', effectiveMax);

    expect(effectiveMax).toBe(10);
    expect(trimmed).toBe('Supercalif...');
    expect(trimmed.length * YAxisTicksComponent.TRIM_CHAR_WIDTH).toBeLessThanOrEqual(
      yAxisWidth - YAxisTicksComponent.AXIS_LAYOUT_INSET
    );
  });

  it('word-wraps long labels to at most 2 lines with 23-char budget', () => {
    const label = "The People's Republic of ASLLKJhdkajhsdlkjahsldkjhals";
    const { yAxisWidth } = resolveCategoryAxisLayout([label], true, true);
    const lines = wrapCategoryLabel(label, CATEGORY_AXIS_MAX_LINE_CHARS, 2);

    expect(lines.length).toBe(2);
    expect(lines[0]).toBe("The People's Republic");
    expect(lines[1]).toBe('of ASLLKJhdkajhsdlkj...');
    expect(yAxisWidth).toBeLessThanOrEqual(CATEGORY_AXIS_MAX_WIDTH);
    expect(Math.max(...lines.map(line => line.length)) * CATEGORY_AXIS_TRIM_CHAR_WIDTH).toBeLessThanOrEqual(
      yAxisWidth - CATEGORY_AXIS_LAYOUT_INSET
    );
  });

  it('layout truncation stays stable when measured width fluctuates within the cap', () => {
    const label = "The People's Republic of ASLLKJhdkajhsdlkjahsldkjhals";
    const layout = resolveCategoryAxisLayout([label], true, true);
    const linesA = displayLinesForLabel(label, layout.yAxisWidth, true, true);
    const linesB = displayLinesForLabel(label, Math.min(layout.yAxisWidth + 2, CATEGORY_AXIS_MAX_WIDTH), true, true);

    expect(linesA).toEqual(linesB);
  });
});
