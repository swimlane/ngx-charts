import {
  Component,
  ChangeDetectionStrategy
} from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../utils/color-sets';
import { gridLayout } from '../common/grid-layout.helper';

@Component({
  selector: 'number-card',
  template: `
    <chart
      [legend]="false"
      [view]="[width, height]">
      <svg:g [attr.transform]="transform" class="number-card chart">
        <svg:g cardSeries
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (select)="onClick($event)"
        />
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCardComponent extends BaseChartComponent {

  dims: ViewDimensions;
  data: any[];
  colors: ColorHelper;
  transform: string;
  domain: any[];
  margin = [10, 10, 10, 10];

  update(): void {
    super.update();

    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();

      this.data = gridLayout(this.dims, this.results, 150);

      this.setColors();
      this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    });
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
