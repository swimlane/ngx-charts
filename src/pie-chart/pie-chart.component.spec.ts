import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { arc } from 'd3-shape';

import { single } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { PieChartModule } from './pie-chart.module';

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

xdescribe('<ngx-charts-pie>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, PieChartModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  describe('basic setup', () => {

    beforeEach(async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ngx-charts-pie-chart
                [results]="single"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [doughnut]="false">
            </ngx-charts-pie-chart>`
        }
      }).compileComponents();
    }));

    it('should set the svg width and height', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    }));

    it('should render 6 arc elements', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.arc').length).toEqual(6);
    }));

    it('should render an arc', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const arcElement = fixture.debugElement.nativeElement.querySelector('path.arc');

      const testArc: any = arc()
        .innerRadius(0)
        .outerRadius(180)
        .startAngle(0)
        .endAngle(1.0996941056424656);

      expect(arcElement.getAttribute('d')).toEqual(testArc());
    }));
  });

  describe('doughnut', () => {
    it('should render an arc, default width', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ngx-charts-pie-chart
                [results]="single"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [doughnut]="true">
            </ngx-charts-pie-chart>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const arcElement = fixture.debugElement.nativeElement.querySelector('path.arc');
        const outerRadius = 180;

        const testArc: any = arc()
          .innerRadius(outerRadius * 3 / 4) // default arc is 1/4 outerwidth
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(1.0996941056424656);

        expect(arcElement.getAttribute('d')).toEqual(testArc());
      });
    }));

    it('should render an arc, set width', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
            <ngx-charts-pie-chart
                [results]="single"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [doughnut]="true"
                [arcWidth]="0.1">
            </ngx-charts-pie-chart>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const arcElement = fixture.debugElement.nativeElement.querySelector('path.arc');
        const outerRadius = 180;

        const testArc: any = arc()
          .innerRadius(outerRadius * 0.90) // default arc is 1/4 outerwidth
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(1.0996941056424656);

        expect(arcElement.getAttribute('d')).toEqual(testArc());
      });
    }));
  });
});
