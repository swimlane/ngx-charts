import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import d3 from '../d3';
import '../../config/testing-utils';
import { single } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { PieChartModule } from './pie-chart.module';

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

describe('<ngx-charts-pie>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [PieChartModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  describe('basic setup', () => {

    beforeEach(() => {
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
      });
    });

    it('should set the svg width and height', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        const svg = d3.select(compiled.querySelectorAll('svg')[0]);

        expect(svg.attr('width')).toEqual('400');
        expect(svg.attr('height')).toEqual('800');
        done();
      });
    });

    it('should render 6 arc elements', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('path.arc').length).toEqual(6);
        done();
      });
    });

    it('should render an arc', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;
        const arcs = compiled.querySelectorAll('path.arc');

        const arc = d3.arc()
          .innerRadius(0)
          .outerRadius(440 / 3)
          .startAngle(0)
          .endAngle(1.0996941056424656);

        expect(d3.select(arcs[0]).attr('d')).toEqual(arc());
        done();
      });
    });
  });

  describe('doughnut', () => {
    it('should render an arc, default width', (done) => {
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

        const compiled = fixture.debugElement.nativeElement;
        const arcs = compiled.querySelectorAll('path.arc');
        const outerRadius = 440 / 3;

        const arc = d3.arc()
          .innerRadius(outerRadius * 3 / 4) // default arc is 1/4 outerwidth
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(1.0996941056424656);

        expect(d3.select(arcs[0]).attr('d')).toEqual(arc());
        done();
      });
    });

    it('should render an arc, set width', (done) => {
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

        const compiled = fixture.debugElement.nativeElement;
        const arcs = compiled.querySelectorAll('path.arc');
        const outerRadius = 440 / 3;

        const arc = d3.arc()
          .innerRadius(outerRadius * 0.90) // default arc is 1/4 outerwidth
          .outerRadius(outerRadius)
          .startAngle(0)
          .endAngle(1.0996941056424656);

        expect(d3.select(arcs[0]).attr('d')).toEqual(arc());
        done();
      });
    });
  });
});
