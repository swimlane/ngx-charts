import { TestBed } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { single } from '../../../../../../src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { BarChartModule } from './bar-chart.module';
import { BarComponent } from './bar.component';
import { YAxisTicksComponent } from '../common/axes/y-axis-ticks.component';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  single: any = single;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bar-horizontal>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, BarChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-horizontal
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single">
              </ngx-charts-bar-horizontal>`
        }
      }).compileComponents();
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

      expect(bar.componentInstance.height).toEqual(123); // ~(780 - 5 * barPadding) / 6
    });
  });

  describe('padding', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-horizontal
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="0">
              </ngx-charts-bar-horizontal>`
        }
      }).compileComponents();
    });

    it('should render correct cell size, with zero padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.height).toEqual(130); // ~(780 - 5 * barPadding) / 6
    });
  });

  describe('padding -2', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
          <ngx-charts-bar-horizontal
            [animations]="false"
            [view]="[400,800]"
            [scheme]="colorScheme"
            [results]="single"
            [barPadding]="20">
          </ngx-charts-bar-horizontal>`
        }
      }).compileComponents();
    });

    it('should render correct cell size, with padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.height).toEqual(113); // ~(780 - 5 * barPadding) / 6
    });
  });

  describe('y-axis - wrap ticks', () => {
    const getContent = (axisTick: DebugElement) =>
      axisTick.queryAll(By.css('tspan')).map(entry => entry.nativeElement.textContent.trim());

    it('should wrap tick if there is available space', () => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
          <ngx-charts-bar-horizontal
            [animations]="false"
            [view]="[400, 300]"
            [scheme]="colorScheme"
            [results]="[
              { name: 'Lorem Ipsum', value: 40632 },
              { name: 'Lorem Ipsum is simply', value: 50000 },
              { name: 'Lorem Ipsum is simply dummy text', value: 36240 },
              { name: 'Lorem Ipsum is simply dummy text of the printing', value: 3000 },
              { name: 'Lorem Ipsum is simply dummy text of the printing and typesetting industry', value: 5655 },
            ]"
            [xAxis]="true"
            [yAxis]="true"
            [wrapTicks]="true"
          >
          </ngx-charts-bar-horizontal>`
        }
      }).compileComponents();

      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const yAxisTicks = fixture.debugElement.query(By.directive(YAxisTicksComponent));
      const axisTicks = yAxisTicks.queryAll(By.css('g.tick > text'));

      expect(axisTicks.length).toEqual(5);

      expect(axisTicks[0].nativeElement.textContent.trim()).toEqual('Lorem Ipsum');

      expect(axisTicks[1].queryAll(By.css('tspan')).length).toEqual(2);
      expect(getContent(axisTicks[1])).toEqual(['Lorem Ipsum is', 'simply']);

      expect(axisTicks[2].queryAll(By.css('tspan')).length).toEqual(3);
      expect(getContent(axisTicks[2])).toEqual(['Lorem Ipsum is', 'simply dummy', 'text']);

      expect(axisTicks[3].queryAll(By.css('tspan')).length).toEqual(3);
      expect(getContent(axisTicks[3])).toEqual(['Lorem Ipsum is', 'simply dummy', 'text of the...']);

      expect(axisTicks[4].queryAll(By.css('tspan')).length).toEqual(3);
      expect(getContent(axisTicks[4])).toEqual(['Lorem Ipsum is', 'simply dummy', 'text of the...']);
    });
  });
});
