import { TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { single } from '../../../../../../src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { BarChartModule } from './bar-chart.module';
import { BarComponent } from './bar.component';
import { XAxisTicksComponent } from '../common/axes/x-axis-ticks.component';

vi.setConfig({ testTimeout: 30000, hookTimeout: 30000 });

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-bar-vertical
      [animations]="false"
      [view]="[400, 800]"
      [scheme]="colorScheme"
      [results]="single"
      [barPadding]="barPadding"
    >
    </ngx-charts-bar-vertical>
  `,
  imports: [BarChartModule]
})
class TestComponent {
  single: any = single;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  barPadding: number = 8;
}

@Component({
  selector: 'test-wrap-ticks',
  template: `
    <ngx-charts-bar-vertical
      [animations]="false"
      [view]="[400, 300]"
      [scheme]="colorScheme"
      [results]="results"
      [xAxis]="true"
      [yAxis]="true"
      [wrapTicks]="true"
    >
    </ngx-charts-bar-vertical>
  `,
  imports: [BarChartModule]
})
class WrapTicksTestComponent {
  results: any = [];
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bar-vertical>', () => {
  describe('basic setup', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, TestComponent],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
      });
    });

    it('should set the svg width and height', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });

    it('should render 12 cell elements', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.bar').length).toEqual(6);
    });

    it('should render correct cell size', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.width).toEqual(53); // ~(360 - 5 * barPadding) / 6
    });
  });

  describe('padding', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, TestComponent],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
      });
    });

    it('should render correct cell size, with zero padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.barPadding = 0;
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.width).toEqual(60); // ~(360 - 5 * barPadding) / 6
    });
  });

  describe('padding - 2', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, TestComponent],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
      });
    });

    it('should render correct cell size, with padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.barPadding = 20;
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.width).toEqual(43); // ~(360 - 5 * barPadding) / 6
    });
  });

  describe('x-axis - wrap ticks', () => {
    beforeEach(() => {
      TestBed.configureTestingModule({
        imports: [NoopAnimationsModule, WrapTicksTestComponent],
        providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
      });
    });

    const getContent = (axisTick: DebugElement) =>
      axisTick.queryAll(By.css('tspan')).map(entry => entry.nativeElement.textContent.trim());

    it('should wrap tick if there is available space', () => {
      const fixture = TestBed.createComponent(WrapTicksTestComponent);
      fixture.componentInstance.results = [
        { name: 'Lorem Ipsum', value: 40632 },
        { name: 'Lorem Ipsum is simply', value: 50000 },
        { name: 'Lorem Ipsum is simply dummy text', value: 36240 },
        { name: 'Lorem Ipsum is simply dummy text of the printing', value: 3000 },
        {
          name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry',
          value: 5655
        }
      ];
      fixture.detectChanges();

      const xAxisTicks = fixture.debugElement.query(By.directive(XAxisTicksComponent));
      const axisTicks = xAxisTicks.queryAll(By.css('g.tick > text'));

      expect(axisTicks.length).toEqual(5);

      expect(axisTicks[0].queryAll(By.css('tspan')).length).toEqual(1);
      expect(getContent(axisTicks[0])).toEqual(['Lorem Ipsum']);

      expect(axisTicks[1].queryAll(By.css('tspan')).length).toEqual(2);
      expect(getContent(axisTicks[1])).toEqual(['Lorem Ipsum is', 'simply']);

      expect(axisTicks[2].queryAll(By.css('tspan')).length).toEqual(3);
      expect(getContent(axisTicks[2])).toEqual(['Lorem Ipsum is', 'simply dummy', 'text']);

      expect(axisTicks[3].queryAll(By.css('tspan')).length).toEqual(4);
      expect(getContent(axisTicks[3])).toEqual(['Lorem Ipsum is', 'simply dummy', 'text of the', 'printing']);

      expect(axisTicks[4].queryAll(By.css('tspan')).length).toEqual(5);
      expect(getContent(axisTicks[4])).toEqual([
        'Lorem Ipsum is',
        'simply dummy',
        'text of the',
        'printing and',
        'typesetting...'
      ]);
    });

    it('should show a max of 5 lines for a wrapped tick', () => {
      const fixture = TestBed.createComponent(WrapTicksTestComponent);
      fixture.componentInstance.results = [
        { name: 'Lorem Ipsum', value: 40632 },
        {
          name:
            'Lorem Ipsum is simply dummy text of the printing and typesetting industry. ' +
            'Lorem Ipsum has been the industrys standard dummy text ever since the 1500s',
          value: 5655
        }
      ];
      fixture.detectChanges();

      const xAxisTicks = fixture.debugElement.query(By.directive(XAxisTicksComponent));
      const axisTicks = xAxisTicks.queryAll(By.css('g.tick > text'));

      expect(axisTicks.length).toEqual(2);

      expect(axisTicks[0].queryAll(By.css('tspan')).length).toEqual(1);
      expect(getContent(axisTicks[0])).toEqual(['Lorem Ipsum']);

      expect(axisTicks[1].queryAll(By.css('tspan')).length).toEqual(5);
      expect(getContent(axisTicks[1])).toEqual([
        'Lorem Ipsum is simply',
        'dummy text of the',
        'printing and typesetting',
        'industry. Lorem Ipsum',
        'has been the industrys...'
      ]);
    });
  });
});
