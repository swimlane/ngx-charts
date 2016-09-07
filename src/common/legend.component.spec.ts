import {
  TestBed,
  async
} from '@angular/core/testing';
import { Component  } from '@angular/core';
import d3 from '../d3';
import '../../config/testing-utils';

import { CommonModule } from './common.module';
import {colorHelper} from '../utils/color-sets';

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
      imports: [CommonModule]
    });

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
                <legend
                  class="col-sm-3 col-md-3 col-lg-3 legend"
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

  it('should trim long labels', async(() => {
    TestBed.compileComponents().then(() => {
      let fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.seriesData = ['a very long label that is trimmed'];
      fixture.detectChanges();

      let labelsElement = fixture.debugElement.nativeElement.querySelector('.legend-labels');

      // not checking for the exact size to avoid breaking this test when the
      // default length of the trim fn is changed. Let's test for the presence of the dots
      // instead :)
      expect(labelsElement.children[0]).toContainText('...');
    });
  }));


});
