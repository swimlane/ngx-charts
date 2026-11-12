import { ChangeDetectorRef, ElementRef } from '@angular/core';
import { CountUpDirective } from './count.directive';

describe('CountUpDirective decimals', () => {
  let directive: CountUpDirective;
  let frames: Map<number, (timestamp: number) => void>;
  let nextId: number;

  function create(): CountUpDirective {
    directive = new CountUpDirective(
      { markForCheck(): void {} } as ChangeDetectorRef,
      { nativeElement: {} } as ElementRef
    );
    return directive;
  }

  function finishAnimation(): void {
    let timestamp = 0;
    while (frames.size) {
      const [id, frame] = frames.entries().next().value;
      frames.delete(id);
      frame(timestamp);
      timestamp += 10_000;
    }
  }

  beforeEach(() => {
    frames = new Map();
    nextId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: (timestamp: number) => void) => {
      frames.set(++nextId, callback);
      return nextId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));
  });

  afterEach(() => {
    directive?.ngOnDestroy();
    vi.unstubAllGlobals();
  });

  it('uses the magnitude heuristic when precision was never set', () => {
    const counter = create();

    counter.countTo = 72.7;

    expect(counter.countDecimals).toBe(0);
  });

  it('finishes on the fractional value when precision is set before countTo', () => {
    const counter = create();

    counter.countDecimals = 1;
    counter.countTo = 72.7;
    finishAnimation();

    expect(counter.value).toBe('72.7');
  });

  it('finishes on the fractional value when precision is set after countTo', () => {
    const counter = create();

    counter.countTo = 72.7;
    counter.countDecimals = 1;
    finishAnimation();

    expect(counter.value).toBe('72.7');
  });

  it('applies prefix, suffix and formatter changes made after the animation started', () => {
    const counter = create();

    counter.countTo = 5;
    counter.countSuffix = '%';
    finishAnimation();

    expect(counter.value).toBe('5%');

    counter.valueFormatting = (value: number) => `<${value}>`;
    counter.countTo = 6;
    finishAnimation();

    expect(counter.value).toBe('<6>');
  });
});
