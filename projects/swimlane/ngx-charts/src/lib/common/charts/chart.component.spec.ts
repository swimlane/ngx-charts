import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { ChartCommonModule } from '../chart-common.module';

@Component({
    selector: 'test-component',
    template: '',
    standalone: false
})
class TestComponent {
  barData: any;
}

describe('<ngx-charts-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, ChartCommonModule]
    });
  });

  describe('basic setup', () => {
    beforeEach(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <ngx-charts-chart
                      [animations]="false"
                      [view]="[400,800]">
                      <p>ngx-charts is cool!</p>
                    </ngx-charts-chart>
                `
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

    it('should correctly project the inner content', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const textNode = fixture.debugElement.nativeElement.querySelector('svg p');

      expect(textNode.textContent).toEqual('ngx-charts is cool!');
    });
  });
});
