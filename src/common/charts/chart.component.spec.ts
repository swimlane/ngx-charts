import {
  TestBed
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../../d3';
import '../../../config/testing-utils';

// app imports
// import { Chart } from './Chart'; // since we HAVE to import the CommonModule, we don't even have to import the Chart.ts..
import { CommonModule } from '../common.module';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  barData: any;

  constructor() {
  }
}

describe('<chart>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule]
    });

  });

  describe('basic setup', () => {

    beforeEach(() => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <chart
                        [view]="[400,800]"
                        >
                        <text>a2d3 is cool!</text>
                    </chart>
                `
        }
      });
    });

    it('should set the svg width and height', (done) => {
      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let svg = compiled.querySelectorAll('svg')[0];
        expect(d3.select(svg).attr('width')).toEqual('400');
        expect(d3.select(svg).attr('height')).toEqual('800');

        done();
      });
    });

    it('should correctly project the inner content', (done) => {
      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let svg = d3.select(compiled.querySelectorAll('svg')[0]);

        let textNode = svg.select('text');
        expect(textNode.text()).toEqual('a2d3 is cool!');

        done();
      });
    });

  });

  /*
  // Todo: write a test after the base test for the legend itself is done
  describe('when adding a legend', () => {

    it('should render a scale legend', () => {
      // set up a  basic chart
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
                    <chart
                        [view]="[400,800]"
                        [legend]="true"
                        [legendData]="legendData"
                        [colors]="colors"
                        >
                        >
                    </chart>
                `
        }
      });

      TestBed.compileComponents().then(() => {
        let fixture = TestBed.createComponent(TestComponent);
        fixture.debugElement.componentInstance.colors = this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
        fixture.debugElement.componentInstance.legendData = {
                    array: [
                        {
                            "vals": [
                                {
                                    "label": [
                                        [
                                            "complete"
                                        ],
                                        "complete"
                                    ],
                                    "value": -1,
                                    "formattedLabel": [
                                        'complete'
                                    ]
                                }
                            ]
                        },
                        {
                            "vals": [
                                {
                                    "label": [
                                        [
                                            "not complete"
                                        ],
                                        "not complete"
                                    ],
                                    "value": 2,
                                    "formattedLabel": [
                                        "not complete"
                                    ]
                                }
                            ]
                        }
                    ]
                };


        fixture.detectChanges();

        let compiled = fixture.debugElement.nativeElement;

        let svg = d3.select(compiled.querySelectorAll('svg')[0]);

        let textNode = svg.select('text');
        expect(textNode.text()).toEqual('a2d3 is cool!');

        done();
      });

    });

  });
  */


});
