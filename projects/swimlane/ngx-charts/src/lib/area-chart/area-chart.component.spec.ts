import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement, ChangeDetectionStrategy, PLATFORM_ID } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { APP_BASE_HREF } from '@angular/common';

import { multi } from '../../../../../../src/app/data';

import { AreaChartModule } from './area-chart.module';
import { AreaChartComponent } from './area-chart.component';
import { AreaChartStackedComponent } from './area-chart-stacked.component';
import { AreaChartNormalizedComponent } from './area-chart-normalized.component';

vi.setConfig({ testTimeout: 30000, hookTimeout: 30000 });

const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-area-chart [animations]="false" [view]="[400, 800]" [scheme]="colorScheme" [results]="data">
    </ngx-charts-area-chart>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AreaChartModule]
})
class TestComponent {
  data: any = multi;
  colorScheme = {
    domain: colors
  };
}

const ssrDates = Array.from({ length: 24 }, (_, i) => new Date(Date.UTC(2026, i, 1)));

@Component({
  selector: 'test-server-component',
  template: `
    @for (xAxis of [false, true]; track xAxis) {
    <ngx-charts-area-chart
      [animations]="false"
      [view]="view"
      [scheme]="colorScheme"
      [results]="data"
      [xAxis]="xAxis"
      [yAxis]="true"
      [wrapTicks]="true"
    >
    </ngx-charts-area-chart>
    <ngx-charts-area-chart-stacked
      [animations]="false"
      [view]="view"
      [scheme]="colorScheme"
      [results]="data"
      [xAxis]="xAxis"
      [yAxis]="true"
      [wrapTicks]="true"
    >
    </ngx-charts-area-chart-stacked>
    <ngx-charts-area-chart-normalized
      [animations]="false"
      [view]="view"
      [scheme]="colorScheme"
      [results]="data"
      [xAxis]="xAxis"
      [yAxis]="true"
      [wrapTicks]="true"
    >
    </ngx-charts-area-chart-normalized>
    }
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AreaChartModule]
})
class ServerTestComponent {
  view: [number, number] = [360, 225];
  colorScheme = { domain: colors };
  data = [
    { name: 'Alerts', series: ssrDates.map((name, i) => ({ name, value: 10 + ((i * 7) % 13) })) },
    { name: 'Cases', series: ssrDates.map((name, i) => ({ name, value: 5 + ((i * 5) % 11) })) }
  ];
}

describe('<ngx-charts-area-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TestComponent, ServerTestComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    let fixture: ComponentFixture<TestComponent>;
    let de: DebugElement;

    beforeEach(() => {
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      de = fixture.debugElement;
    });

    it('should set the svg width and height', () => {
      const svg = de.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });

    it('should render 4 area elements', () => {
      const compiled = de.nativeElement;
      expect(compiled.querySelectorAll('path.area').length).toEqual(4);
    });

    it('should match specified colors for area elements', () => {
      const compiled = de.nativeElement;

      const fills = Array.from(compiled.querySelectorAll('path.area')).map((areaElement: Element) =>
        areaElement.getAttribute('fill')
      );
      expect(colors.every(color => fills.includes(color))).toBeTruthy();
    });
  });

  describe('server', () => {
    // Single change-detection pass: SSR serializes before deferred tick measurements are applied.
    function renderOnServer(): ComponentFixture<ServerTestComponent> {
      TestBed.overrideProvider(PLATFORM_ID, { useValue: 'server' });
      const fixture = TestBed.createComponent(ServerTestComponent);
      fixture.detectChanges();
      return fixture;
    }

    for (const [selector, type] of [
      ['ngx-charts-area-chart', AreaChartComponent],
      ['ngx-charts-area-chart-stacked', AreaChartStackedComponent],
      ['ngx-charts-area-chart-normalized', AreaChartNormalizedComponent]
    ] as const) {
      it(`${selector} reserves x-axis tick label height before the deferred measurement`, () => {
        const [withoutAxis, chart] = renderOnServer()
          .debugElement.queryAll(By.directive(type))
          .map(de => de.componentInstance);

        expect(chart.xAxisHeight).toBeGreaterThan(0);
        expect(chart.dims.height).toBe(withoutAxis.dims.height - 5 - chart.xAxisHeight);
      });
    }
  });
});
