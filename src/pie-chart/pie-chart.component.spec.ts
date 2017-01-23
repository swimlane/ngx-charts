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
  });
});
