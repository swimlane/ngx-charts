import {
  TestBed
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../d3';
import '../utils/testing';

import { CommonModule } from './CommonModule';
import {colorHelper} from '../utils/colorSets';

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  seriesData: any;
  legendTitle: string;
  colors: any;
  legendHeight: number;

  constructor() {
  }
}

describe('<legend>', () => {
  let seriesData = {
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

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [CommonModule]
    });

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
                <legend
                  class="col-sm-3 col-md-3 col-lg-3 viz legend"
                  [data]="seriesData"
                  [title]="legendTitle"
                  [colors]="colors"
                  [height]="legendHeight">
                </legend>
            `
      }
    });
  });

  it('should set the legend title', (done) => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.seriesData = seriesData;
      fixture.componentInstance.legendTitle = 'Test legend title';
      let scheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
      fixture.componentInstance.colors = colorHelper(scheme, 'ordinal', [], null);

      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let legendTitle = compiled.querySelector('.legend-title-text');

      expect(legendTitle).toHaveText('Test legend title');

      done();
    });
  });

  it('should set the legend labels', (done) => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.seriesData = seriesData;
      fixture.componentInstance.legendTitle = 'Test legend title';
      let scheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
      fixture.componentInstance.colors = colorHelper(scheme, 'ordinal', [], null);

      fixture.detectChanges();

      let compiled = fixture.debugElement.nativeElement;
      let labelsElement = compiled.querySelectorAll('.legend-labels');

      expect(labelsElement).toBeDefined();
      expect(labelsElement[0].childElementCount).toEqual(2); // 2 legend labels
 

      expect(labelsElement[0].children[0]).toContainText('complete');
      expect(labelsElement[0].children[1]).toContainText('not complete');

      done();
    });
  });


});
