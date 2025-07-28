import { APP_BASE_HREF } from '@angular/common';
import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { boxData } from '../../../../../../src/app/data';
import { BoxChartModule } from './box-chart.module';
import { cloneLineCoordinates } from './box.component';
import { IVector2D } from '@swimlane/ngx-charts/models/coordinates.model';

@Component({
  selector: 'test-component',
  template: '',
  standalone: false
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

    it('test simple clone for LineCoordinates', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      type LineCoordinates = [IVector2D, IVector2D, IVector2D, IVector2D];
      const line1Coordinates: LineCoordinates = [
        {
          v1: { x: 109.5, y: 245 },
          v2: { x: 109.5, y: 107.96610169491527 }
        },
        {
          v1: { x: 121.66666666666667, y: 245 },
          v2: { x: 97.33333333333333, y: 245 }
        },
        {
          v1: { x: 150, y: 191.01694915254237 },
          v2: { x: 69, y: 191.01694915254237 }
        },
        {
          v1: { x: 121.66666666666667, y: 107.96610169491527 },
          v2: { x: 97.33333333333333, y: 107.96610169491527 }
        }
      ];
      const line2Coordinates: LineCoordinates = [
        {
          v1: { x: 254.5, y: 211.77966101694915 },
          v2: { x: 254.5, y: 41.52542372881356 }
        },
        {
          v1: { x: 266.6666666666667, y: 211.77966101694915 },
          v2: { x: 242.33333333333334, y: 211.77966101694915 }
        },
        {
          v1: { x: 295, y: 149.4915254237288 },
          v2: { x: 214, y: 149.4915254237288 }
        },
        {
          v1: { x: 266.6666666666667, y: 41.52542372881356 },
          v2: { x: 242.33333333333334, y: 41.52542372881356 }
        }
      ];

      const cloneLine1Coordinates = cloneLineCoordinates(line1Coordinates);
      const cloneLine2Coordinates = cloneLineCoordinates(line2Coordinates);

      expect(cloneLine1Coordinates).toEqual([
        {
          v1: { x: 109.5, y: 245 },
          v2: { x: 109.5, y: 107.96610169491527 }
        },
        {
          v1: { x: 121.66666666666667, y: 245 },
          v2: { x: 97.33333333333333, y: 245 }
        },
        {
          v1: { x: 150, y: 191.01694915254237 },
          v2: { x: 69, y: 191.01694915254237 }
        },
        {
          v1: { x: 121.66666666666667, y: 107.96610169491527 },
          v2: { x: 97.33333333333333, y: 107.96610169491527 }
        }
      ]);
      expect(cloneLine2Coordinates).toEqual([
        {
          v1: { x: 254.5, y: 211.77966101694915 },
          v2: { x: 254.5, y: 41.52542372881356 }
        },
        {
          v1: { x: 266.6666666666667, y: 211.77966101694915 },
          v2: { x: 242.33333333333334, y: 211.77966101694915 }
        },
        {
          v1: { x: 295, y: 149.4915254237288 },
          v2: { x: 214, y: 149.4915254237288 }
        },
        {
          v1: { x: 266.6666666666667, y: 41.52542372881356 },
          v2: { x: 242.33333333333334, y: 41.52542372881356 }
        }
      ]);
    });
  });
});
