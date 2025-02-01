import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { bubble } from '../../../../../../src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { BubbleChartModule } from './bubble-chart.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: '',
  standalone: false
})
class TestComponent {
  results: any[] = bubble;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bubble-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, BubbleChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-bubble-chart
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="results">
              </ngx-charts-bubble-chart>`
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

    it('should render 12 circle elements', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const circleElements = fixture.debugElement.nativeElement.querySelectorAll('g.circle');

      expect(circleElements.length).toEqual(12);
    });
  });
});
