import {
  Component,
  Input,
  Output,
  EventEmitter,
  ChangeDetectionStrategy,
  ViewEncapsulation
} from '@angular/core';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';

@Component({
  selector: 'ngx-charts-advanced-pie-chart',
  template: `
    <div
      [style.width.px]="width"
      [style.height.px]="height">
      <div class="advanced-pie chart"
        [style.width.px]="dims.width"
        [style.height.px]="dims.height">
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
              [tooltipDisabled]="tooltipDisabled"
              (select)="onClick($event)">
            </svg:g>
          </svg:g>
        </ngx-charts-chart>
      </div>
      <div
        class="advanced-pie-legend-wrapper"
        [style.width.px]="width - dims.width"
        [style.height.px]="height">
        <ngx-charts-advanced-legend
          [data]="results"
          [colors]="colors"
          [width]="width - dims.width - margin[1]"
          (select)="onClick($event)"
          (activate)="onActivate($event)"
          (deactivate)="onDeactivate($event)">
        </ngx-charts-advanced-legend>
      </div>
    </div>
  `,
  styleUrls: [
    '../common/base-chart.component.scss',
    './advanced-pie-chart.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedPieChartComponent extends BaseChartComponent {

  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled: boolean = false;

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
  margin = [20, 20, 20, 20];

  update(): void {
    super.update();

    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width * 4 / 12.0,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();
      this.setColors();

      const xOffset = this.dims.width / 2;
      const yOffset = this.margin[0] + this.dims.height / 2;
      this.legendWidth = this.width - this.dims.width - this.margin[1];

      this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
      this.innerRadius = this.outerRadius * 0.75;

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
