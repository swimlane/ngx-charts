import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../../d3';
import '../../../config/testing-utils';

import { ChartCommonModule } from '../chart-common.module';
import { colorHelper } from '../../utils/color-sets';

// some test data (includes just enought data to run the tests)
let seriesData = ['complete', 'not complete'];

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  seriesData: any = seriesData;
  legendTitle: string = 'Test legend title';
  colors: any;
  legendHeight: number;

  constructor() {
    let scheme = { domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] };
    this.colors = colorHelper(scheme, 'ordinal', [], null);
  }
}

describe('<legend>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ChartCommonModule]
    });

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
                <legend
                  [data]="seriesData"
                  [title]="legendTitle"
                  [colors]="colors"
                  [height]="legendHeight">
                </legend>
            `
      }
    });
  });

  it('should set the legend title', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      let legendTitle = fixture.debugElement.nativeElement.querySelector('.legend-title-text');

      expect(legendTitle).toHaveText('Test legend title');
    });
  }));

  it('should set the legend labels', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      let labelsElement = fixture.debugElement.nativeElement.querySelector('.legend-labels');

      expect(labelsElement).toBeDefined();
      expect(labelsElement.childElementCount).toEqual(2); // 2 legend labels


      expect(labelsElement.children[0]).toContainText('complete');
      expect(labelsElement.children[1]).toContainText('not complete');

    });
  }));
});
