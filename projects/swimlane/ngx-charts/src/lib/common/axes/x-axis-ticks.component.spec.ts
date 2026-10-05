import { scalePoint } from 'd3-scale';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';

function createServerTicks(labels: string[], width: number, rotateTicks = true): XAxisTicksComponent {
  const ticks = new XAxisTicksComponent('server');
  ticks.scale = scalePoint<string>().domain(labels).range([0, width]);
  ticks.orient = Orientation.Bottom;
  ticks.width = width;
  ticks.rotateTicks = rotateTicks;
  ticks.update();
  return ticks;
}

function emittedHeight(ticks: XAxisTicksComponent): number {
  let height: number;
  ticks.dimensionsChanged.subscribe(({ height: h }) => (height = h));
  ticks.updateDims();
  return height;
}

describe('XAxisTicksComponent SSR height', () => {
  it('reserves a full label line when ticks are not rotated', () => {
    const ticks = createServerTicks(['Jan', 'Feb', 'Mar'], 600, false);

    expect(emittedHeight(ticks)).toBe(14);
  });

  it('reserves a full label line for horizontal ticks that fit without rotation', () => {
    const ticks = createServerTicks(['Jan', 'Feb', 'Mar'], 600);

    expect(ticks.textTransform).toBe('');
    expect(emittedHeight(ticks)).toBe(14);
  });

  const dateLabels = Array.from({ length: 12 }, (_, i) => `2026-09-${String(i + 10)}T00:00`);

  it('includes the projected glyph height for partially rotated ticks', () => {
    const ticks = createServerTicks(dateLabels, 1200);
    const radians = Math.PI / 6;
    const textRun = Math.sin(radians) * ticks.maxTicksLength * 7;
    const glyph = Math.cos(radians) * 14;

    expect(ticks.textTransform).toBe('rotate(-30)');
    expect(emittedHeight(ticks)).toBeGreaterThanOrEqual(Math.floor(textRun + glyph));
    expect(emittedHeight(ticks)).toBeGreaterThan(ticks.approxHeight);
  });

  it('never reserves less than the previous approximation for fully rotated ticks', () => {
    const ticks = createServerTicks(dateLabels, 300);

    expect(ticks.textTransform).toBe('rotate(-90)');
    expect(emittedHeight(ticks)).toBeGreaterThanOrEqual(ticks.approxHeight);
  });
});
