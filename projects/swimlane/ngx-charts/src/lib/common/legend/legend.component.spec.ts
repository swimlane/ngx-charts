import { TestBed } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';

import { ChartCommonModule } from '../chart-common.module';
import { ColorHelper } from '../color.helper';
import { Color } from '../../utils/color-sets';
import { ScaleType } from '../types/scale-type.enum';

const seriesData = ['complete', 'not complete'];
const longLabel = 'A very long legend label that should truncate with an ellipsis when the legend width is constrained';

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-legend
      class="chart-legend"
      [title]="legendTitle"
      [colors]="colors"
      [data]="seriesData"
      [height]="legendHeight"
      [width]="legendWidth"
    >
    </ngx-charts-legend>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [ChartCommonModule]
})
class TestComponent {
  seriesData: any = seriesData;
  legendTitle: string = 'Test legend title';
  colors: any;
  legendHeight: number = 200;
  legendWidth: number = 120;

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
      imports: [TestComponent]
    });
  });

  it('should set the legend labels', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const labelsElement = fixture.debugElement.nativeElement.querySelector('.legend-labels');

    expect(labelsElement).toBeDefined();
    expect(labelsElement.childElementCount).toEqual(2);

    expect(labelsElement.children[0].textContent).toContain('complete');
    expect(labelsElement.children[1].textContent).toContain('not complete');
  });

  it('should apply vertical-legend class when horizontal is false', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const labelsElement = fixture.debugElement.nativeElement.querySelector('.legend-labels');

    expect(labelsElement.classList.contains('vertical-legend')).toBe(true);
    expect(labelsElement.classList.contains('horizontal-legend')).toBe(false);
  });

  it('should render legend-entry nodes for CSS ellipsis layout', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.detectChanges();

    const entries = fixture.debugElement.nativeElement.querySelectorAll('.legend-entry');

    expect(entries.length).toEqual(2);
  });

  it('should keep full label in title and use ellipsis styles for long labels', () => {
    const fixture = TestBed.createComponent(TestComponent);
    fixture.componentInstance.seriesData = [longLabel];
    fixture.detectChanges();

    const entry = fixture.debugElement.nativeElement.querySelector('.legend-entry');
    const text = fixture.debugElement.nativeElement.querySelector('.legend-label-text');
    const styles = getComputedStyle(text);

    expect(entry.getAttribute('title')).toBe(longLabel);
    expect(styles.textOverflow).toBe('ellipsis');
    expect(styles.overflow).toBe('hidden');
    expect(styles.whiteSpace).toBe('nowrap');
  });
});
