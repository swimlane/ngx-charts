import {
  Component,
  ViewEncapsulation,
  ChangeDetectionStrategy
} from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout } from '../common/grid-layout.helper';

@Component({
  selector: 'ngx-charts-number-card',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="false">
      <svg:g [attr.transform]="transform" class="number-card chart">
        <svg:g ngx-charts-card-series
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
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
