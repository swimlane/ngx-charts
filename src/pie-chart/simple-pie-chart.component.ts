import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';

@Component({
  selector: 'ngx-charts-simple-pie-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="false">
      <svg:g
        [attr.transform]="transform"
        class="pie chart">
        <svg:g ngx-charts-pie-series
          [colors]="colors"
          [showLabels]="labels"
          [series]="results"
          [innerRadius]="innerRadius"
          [activeEntries]="activeEntries"
          [outerRadius]="outerRadius"
          [gradient]="gradient"
          (select)="onClick($event)">
        </svg:g>
        <svg:text
          class="label"
          dy="-0.5em"
          x="0"
          y="5"
          text-anchor="middle">
          {{ totalLabel }}
        </svg:text>
        <svg:text
          class="label percent-label"
          dy="0.5em"
          x="0"
          y="5"
          ngx-charts-count-up
          [countTo]="totalValue"
          [countSuffix]="unit"
          text-anchor="middle">
        </svg:text>
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SimplePieChartComponent extends BaseChartComponent {

  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() totalLabel: string;
  @Input() totalValue: number;
  @Input() unit: string = '';

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  data: any;
  dims: ViewDimensions;
  domain: any[];
  outerRadius: number;
  innerRadius: number;
  transform: string;
  colors: ColorHelper;
  legendWidth: number;
  margin = [0, 0, 0, 0];

  update(): void {
    super.update();

    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();
      this.setColors();

      const xOffset = this.dims.width / 2;
      const yOffset = this.margin[0] + this.dims.height / 2;
      this.legendWidth = this.width - this.dims.width - this.margin[1];

      this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
      this.innerRadius = this.outerRadius * 0.65;

      this.transform = `translate(${xOffset} , ${yOffset})`;
    });
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  onClick(data) {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

  onActivate(event): void {
    if(this.activeEntries.indexOf(event) > -1) return;
    this.activeEntries = [ event, ...this.activeEntries ];
    this.activate.emit({ value: event, entries: this.activeEntries });
  }

  onDeactivate(event): void {
    const idx = this.activeEntries.indexOf(event);

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: event, entries: this.activeEntries });
  }
}
