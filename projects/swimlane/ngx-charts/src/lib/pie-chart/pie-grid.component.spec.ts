import { TestBed } from '@angular/core/testing';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { PieChartModule } from './pie-chart.module';
import { InjectionService } from '../common/tooltip/injection.service';

vi.setConfig({ testTimeout: 30000, hookTimeout: 30000 });

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-pie-grid [animations]="animations" [results]="results" [view]="[600, 400]" [scheme]="colorScheme">
    </ngx-charts-pie-grid>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [PieChartModule]
})
class TestComponent {
  animations = true;
  results = [
    { name: 'a', value: 23 },
    { name: 'b', value: 57 }
  ];
  colorScheme = { domain: ['#5AA454', '#A10A28'] };
}

describe('<ngx-charts-pie-grid> percent labels', () => {
  let frames: Map<number, (timestamp: number) => void>;
  let nextId: number;

  function finishAnimation(): void {
    let timestamp = 0;
    while (frames.size) {
      const [id, frame] = frames.entries().next().value;
      frames.delete(id);
      frame(timestamp);
      timestamp += 10_000;
    }
  }

  function percentLabels(element: HTMLElement): string[] {
    return Array.from(element.querySelectorAll('.percent-label')).map(label => label.textContent.trim());
  }

  beforeEach(() => {
    frames = new Map();
    nextId = 0;
    vi.stubGlobal('requestAnimationFrame', (callback: (timestamp: number) => void) => {
      frames.set(++nextId, callback);
      return nextId;
    });
    vi.stubGlobal('cancelAnimationFrame', (id: number) => frames.delete(id));

    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TestComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }, InjectionService]
    });
  });

  afterEach(() => vi.unstubAllGlobals());

  it('prints one decimal on a static percent label', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.animations = false;
    fixture.detectChanges();

    expect(percentLabels(fixture.nativeElement)).toEqual(['28.7%', '71.3%']);
  });

  it('ends the animated percent label on exactly the static text', () => {
    const staticFixture = TestBed.createComponent(TestComponent);
    staticFixture.componentInstance.animations = false;
    staticFixture.detectChanges();
    const expected = percentLabels(staticFixture.nativeElement);

    const animatedFixture = TestBed.createComponent(TestComponent);
    animatedFixture.detectChanges();
    finishAnimation();
    animatedFixture.detectChanges();

    expect(percentLabels(animatedFixture.nativeElement)).toEqual(expected);
  });
});
