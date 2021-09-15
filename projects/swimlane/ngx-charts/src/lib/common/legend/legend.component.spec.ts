import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import { ChartCommonModule } from '../chart-common.module';
import { ColorHelper } from '../color.helper';
import { Color } from '../../utils/color-sets';
import { ScaleType } from '../types/scale-type.enum';

// some test data (includes just enough data to run the tests)
const seriesData = ['complete', 'not complete'];

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
    const scheme: Color = {
      selectable: false,
      name: 'test',
      domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'],
      group: ScaleType.Ordinal
    };
    this.colors = new ColorHelper(scheme, scheme.group, [], null);
  }
}

describe('<ngx-charts-legend>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [ChartCommonModule]
    });

    TestBed.overrideComponent(TestComponent, {
      set: {
        template: `
                <ngx-charts-legend
                  [title]="legendTitle"
                  [colors]="colors"
                  [data]="seriesData"
                  [height]="legendHeight">
                </ngx-charts-legend>
            `
      }
    }).compileComponents();
  });

  it('should set the legend labels', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const labelsElement = fixture.debugElement.nativeElement.querySelector('.legend-labels');

    expect(labelsElement).toBeDefined();
    expect(labelsElement.childElementCount).toEqual(2); // 2 legend labels

    expect(labelsElement.children[0].textContent).toContain('complete');
    expect(labelsElement.children[1].textContent).toContain('not complete');
  });
});
