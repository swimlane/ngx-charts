import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { boxData } from '../../../../../../src/app/data';
import { BoxChartModule } from './box-chart.module';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  data: any = boxData;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-box-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, BoxChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-box-chart
                [animations]="true"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="data">
              </ngx-charts-box-chart>`
        }
      });
    });

    it('should set the svg width and height', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });
  });
});
