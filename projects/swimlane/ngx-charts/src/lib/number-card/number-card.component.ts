import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';
import { CardModel } from './card-series.component';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';

@Component({
  selector: 'ngx-charts-number-card',
  template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="number-card chart" [class.clickable]="clickable">
        <svg:g
          ngx-charts-card-series
          [colors]="colors"
          [cardColor]="cardColor"
          [bandColor]="bandColor"
          [textColor]="textColor"
          [emptyColor]="emptyColor"
          [data]="data"
          [dims]="dims"
          [innerPadding]="innerPadding"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss', './card.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class NumberCardComponent extends BaseChartComponent {
  @Input() cardColor: string;
  @Input() bandColor: string;
  @Input() emptyColor: string = 'rgba(0, 0, 0, 0)';
  @Input() innerPadding: number = 15;
  @Input() textColor: string;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() designatedTotal: number;

  dims: ViewDimensions;
  data: CardModel[];
  colors: ColorHelper;
  transform: string;
  domain: any[];
  margin: number[] = [10, 10, 10, 10];

  get clickable(): boolean {
    return !!this.select.observers.length;
  }

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.formatDates();

    this.domain = this.getDomain();

    this.setColors();
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    const size = gridSize(this.dims, this.results.length, 150);
    const N = size[0] * size[1];

    const data = this.results.slice();

    while (data.length < N) {
      data.push({ value: null });
    }

    this.data = gridLayout(this.dims, data, 150, this.designatedTotal) as any;
  }

  getDomain(): string[] {
    return this.results.map(d => d.label);
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, this.domain, this.customColors);
  }
}
