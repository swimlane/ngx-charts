import {
  CATEGORY_AXIS_LAYOUT_INSET,
  CATEGORY_AXIS_MAX_CONTENT_CHARS,
  CATEGORY_AXIS_MAX_LINE_CHARS,
  CATEGORY_AXIS_MAX_WIDTH,
  CATEGORY_AXIS_TRIM_CHAR_WIDTH,
  charsPerLine,
  displayLinesForLabel,
  displayWidthForLines,
  requiredCategoryAxisWidth,
  resolveCategoryAxisLayout,
  wrapCategoryLabel
} from './category-axis-label.helper';
import { trimLabel } from '../trim-label.helper';

describe('category-axis-label.helper', () => {
  const userLabel = "The People's Republic of ASLLKJhdkajhsdlkjahsldkjhals";

  it('wrapCategoryLabel packs words and ellipsizes on the last line within 23 chars', () => {
    const lines = wrapCategoryLabel(userLabel, CATEGORY_AXIS_MAX_LINE_CHARS, 2);

    expect(lines.length).toBe(2);
    expect(lines[0]).toBe("The People's Republic");
    expect(lines[1]).toBe('of ASLLKJhdkajhsdlkj...');
    expect(lines.every(line => line.length <= CATEGORY_AXIS_MAX_LINE_CHARS)).toBe(true);
  });

  it('does not split words mid-character', () => {
    const lines = wrapCategoryLabel(userLabel, 16, 2);

    expect(lines.length).toBeLessThanOrEqual(2);
    expect(lines.some(line => line === 'jahsldkjhals')).toBe(false);
    expect(lines[lines.length - 1].endsWith('...')).toBe(true);
  });

  it('truncates a single huge word to the 23-char display budget', () => {
    const huge = 'ASLLKJhdkajhsdlkjahsldkjhals';
    const lines = wrapCategoryLabel(huge, CATEGORY_AXIS_MAX_LINE_CHARS, 2);
    const expected = trimLabel(huge, CATEGORY_AXIS_MAX_CONTENT_CHARS);

    expect(lines).toEqual([expected]);
    expect(lines[0].length).toBe(CATEGORY_AXIS_MAX_LINE_CHARS);
    expect(lines[0].endsWith('...')).toBe(true);
  });

  it('resolveCategoryAxisLayout never exceeds the max axis band', () => {
    const huge = 'ASLLKJhdkajhsdlkjahsldkjhalsEXTRAEXTRAEXTRA';
    const { yAxisWidth } = resolveCategoryAxisLayout([huge], true, true);

    expect(yAxisWidth).toBeLessThanOrEqual(CATEGORY_AXIS_MAX_WIDTH);
  });

  it('resolveCategoryAxisLayout converges for wrapped labels within 2 lines', () => {
    const { yAxisWidth } = resolveCategoryAxisLayout([userLabel], true, true);
    const lines = displayLinesForLabel(userLabel, yAxisWidth, true, true);

    expect(lines.length).toBeLessThanOrEqual(2);
    expect(lines.every(line => line.length <= CATEGORY_AXIS_MAX_LINE_CHARS)).toBe(true);
    expect(yAxisWidth).toBeLessThanOrEqual(CATEGORY_AXIS_MAX_WIDTH);

    const maxLineWidth = Math.max(...lines.map(line => line.length)) * CATEGORY_AXIS_TRIM_CHAR_WIDTH;
    expect(maxLineWidth).toBeLessThanOrEqual(yAxisWidth - CATEGORY_AXIS_LAYOUT_INSET);
  });

  it('requiredCategoryAxisWidth adds layout inset to text width', () => {
    expect(requiredCategoryAxisWidth(100)).toBe(104);
  });

  it('displayWidthForLines uses the longest line capped at max line chars', () => {
    expect(displayWidthForLines(['Short', 'A longer line'])).toBe(
      'A longer line'.length * CATEGORY_AXIS_TRIM_CHAR_WIDTH
    );
    expect(displayWidthForLines(['x'.repeat(40)])).toBe(CATEGORY_AXIS_MAX_LINE_CHARS * CATEGORY_AXIS_TRIM_CHAR_WIDTH);
  });

  it('charsPerLine derives from y-axis width minus inset and never exceeds 23', () => {
    expect(charsPerLine(137)).toBe(19);
    expect(charsPerLine(10_000)).toBe(CATEGORY_AXIS_MAX_LINE_CHARS);
  });

  it('documents lorem wrap lines for horizontal bar wrap spec', () => {
    const labels = [
      'Lorem Ipsum',
      'Lorem Ipsum is simply',
      'Lorem Ipsum is simply dummy text',
      'Lorem Ipsum is simply dummy text of the printing',
      'Lorem Ipsum is simply dummy text of the printing and typesetting industry'
    ];
    const { yAxisWidth } = resolveCategoryAxisLayout(labels, true, true);
    const perLine = charsPerLine(yAxisWidth);
    const wrapped = labels.map(label => wrapCategoryLabel(label, perLine, 2));

    expect(wrapped.every(lines => lines.length <= 2)).toBe(true);
    expect(wrapped[0]).toEqual(['Lorem Ipsum']);
    expect(wrapped[1]).toEqual(['Lorem Ipsum is simply']);
    expect(wrapped[2]).toEqual(['Lorem Ipsum is simply', 'dummy text']);
    expect(wrapped[3]).toEqual(['Lorem Ipsum is simply', 'dummy text of the pr...']);
    expect(wrapped[4]).toEqual(['Lorem Ipsum is simply', 'dummy text of the pr...']);
  });
});
