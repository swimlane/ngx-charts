import { TestBed, ComponentFixture } from '@angular/core/testing';
import { scaleBand } from 'd3-scale';

import { AxesModule } from './axes.module';
import { XAxisTicksComponent } from './x-axis-ticks.component';
import { Orientation } from '../types/orientation.enum';

const monthLabels = (year: number): string[] =>
  Array.from({ length: 12 }, (_, i) => `${String(i + 1).padStart(2, '0')}-${year}`);

// 12 labels of 7 characters need 12 * 49px = 588px to stay horizontal and fit at -30° from 516px.
const W_BIG = 600;
const W_SMALL = 580;
const OUTER_WIDTH = 700;

describe('XAxisTicksComponent rotation', () => {
  let fixture: ComponentFixture<XAxisTicksComponent>;
  let component: XAxisTicksComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({ imports: [AxesModule] });
    fixture = TestBed.createComponent(XAxisTicksComponent);
    component = fixture.componentInstance;
    Object.assign(component, {
      orient: Orientation.Bottom,
      scale: scaleBand().domain(monthLabels(2025)).range([0, W_BIG]),
      outerWidth: OUTER_WIDTH
    });
    fixture.detectChanges();
  });

  const renderAt = (width: number, inputs: Record<string, unknown> = {}): string => {
    Object.assign(component, { width, ...inputs });
    component.ngOnChanges({});
    return component.textTransform;
  };

  it('keeps the rotation once the width oscillates across a threshold within one layout', () => {
    const transforms = [W_BIG, W_SMALL, W_BIG, W_SMALL, W_BIG, W_SMALL, W_BIG].map(width => renderAt(width));

    expect(transforms).toEqual(['', 'rotate(-30)', '', 'rotate(-30)', 'rotate(-30)', 'rotate(-30)', 'rotate(-30)']);
  });

  it('keeps the rotation when the oscillating width changes how many ticks are shown', () => {
    // 24 labels are all shown from 260px and thinned to every second one below it.
    const labels = Array.from({ length: 24 }, (_, i) => `A${String(i + 1).padStart(2, '0')}`);
    const transforms = [265, 255, 265, 255, 265].map(width =>
      renderAt(width, { scale: scaleBand().domain(labels).range([0, width]) })
    );

    expect(transforms).toEqual(['rotate(-60)', '', 'rotate(-60)', 'rotate(-60)', 'rotate(-60)']);
  });

  it('follows the tick width as before when the outer width is not bound', () => {
    const transforms = [W_BIG, W_SMALL, W_BIG, W_SMALL, W_BIG].map(width => renderAt(width, { outerWidth: undefined }));

    expect(transforms).toEqual(['', 'rotate(-30)', '', 'rotate(-30)', '']);
  });

  it('still rotates further once the rotation is kept', () => {
    [W_BIG, W_SMALL, W_BIG, W_SMALL].forEach(width => renderAt(width));

    expect(renderAt(400)).toBe('rotate(-60)');
    expect(renderAt(W_BIG)).toBe('rotate(-60)');
  });

  it.each([
    ['outer width', { outerWidth: OUTER_WIDTH + 10 }],
    ['labels', { scale: scaleBand().domain(monthLabels(2026)).range([0, W_BIG]) }],
    ['max tick length', { maxTickLength: 20 }],
    ['trim ticks', { trimTicks: false }]
  ])('un-rotates again after the %s changes', (_, inputs: Record<string, unknown>) => {
    [W_BIG, W_SMALL, W_BIG, W_SMALL].forEach(width => renderAt(width));

    expect(renderAt(W_BIG, inputs)).toBe('');
  });

  it('rotates step by step while the width only shrinks', () => {
    const transforms = [W_BIG, W_SMALL, 400, 200].map(width => renderAt(width));

    expect(transforms).toEqual(['', 'rotate(-30)', 'rotate(-60)', 'rotate(-90)']);
  });

  it('un-rotates step by step while the width only grows', () => {
    const transforms = [200, 400, W_SMALL, W_BIG].map(width => renderAt(width));

    expect(transforms).toEqual(['rotate(-90)', 'rotate(-60)', 'rotate(-30)', '']);
  });

  it('un-rotates when the width grows back after a single rotation', () => {
    const transforms = [W_BIG, W_SMALL, W_BIG].map(width => renderAt(width));

    expect(transforms).toEqual(['', 'rotate(-30)', '']);
  });

  it('restores the horizontal tick spacing when the ticks are un-rotated', () => {
    renderAt(W_SMALL);
    expect(component.verticalSpacing).toBe(10);

    renderAt(W_BIG);
    expect(component.verticalSpacing).toBe(20);
  });

  it('resets the kept rotation when rotateTicks is turned off and on again', () => {
    [W_BIG, W_SMALL, W_BIG, W_SMALL].forEach(width => renderAt(width));

    renderAt(W_BIG, { rotateTicks: false });

    expect(renderAt(W_BIG, { rotateTicks: true })).toBe('');
  });
});
