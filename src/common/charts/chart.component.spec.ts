import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../../d3';
import '../../../config/testing-utils';

import { ChartCommonModule } from '../chart-common.module';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  barData: any;
}

describe('<ngx-charts-chart>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ChartCommonModule]
    });

  });

  describe('basic setup', () => {

    beforeEach(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <ngx-charts-chart
                        [view]="[400,800]"
                        >
                        <p>ngx-charts is cool!</p>
                    </ngx-charts-chart>
                `
        }
      });
    });

    it('should set the svg width and height', async(() => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        const svg = compiled.querySelectorAll('svg')[0];
        expect(d3.select(svg).attr('width')).toEqual('400');
        expect(d3.select(svg).attr('height')).toEqual('800');
      });
    }));

    it('should correctly project the inner content', async((done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        const svg = d3.select(compiled.querySelectorAll('svg')[0]);

        const textNode = svg.select('p');
        expect(textNode.text()).toEqual('ngx-charts is cool!');

      });
    }));

  });
});
