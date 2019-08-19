import { Component, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';

import { BaseChartComponent } from '../common/base-chart.component';
import { ILegendOptions } from '../models/legend.model';
import { ViewDimensions, ColorHelper, calculateViewDimensions } from '../common';
import { MultiSeries } from '../models/chart-data.model';
import { id } from '../utils';

@Component({
  selector: 'ngx-charts-box-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [animations]="animations"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
    >
      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"
          />
        </svg:clipPath>
      </svg:defs>
      <svg:g [attr.transform]="transform" class="box-chart chart">
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['../common/base-chart.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  encapsulation: ViewEncapsulation.None
})
export class BoxChartComponent extends BaseChartComponent {
  /** Show or hide the legend. */
  @Input() legend: boolean = false;
  @Input() legendPosition: string = 'right';
  @Input() legendTitle: string = 'Legend';
  /** I think it is better to handle legend options as single Input object of type ILegendOptions */
  @Input() legendOptionsConfig: ILegendOptions; // TODO: Change previous legend options for this one.
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  /** Input Data, this came from Base Chart Component. */
  results: MultiSeries;
  /** Chart Dimensions, this came from Base Chart Component. */
  dims: ViewDimensions;
  /** Color data. */
  colors: ColorHelper;
  /** Transform string css attribute for the chart container */
  transform: string;

  /** Chart Margins (For each side, counterclock wise). */
  margin: number[] = [10, 20, 10, 20];

  /** Array of series names from the input data. */
  seriesDomain: Array<string | number | Date>;
  /** Legend Options object to handle positioning, title, colors and domain. */
  legendOptions: ILegendOptions;

  /** Clip Path ID for the chart. */
  clipPath: string;
  clipPathId: string;

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: true,
      showYAxis: true,
      showLegend: this.legend,
      legendPosition: this.legendPosition
    });

    this.seriesDomain = this.results.map(d => d.name);

    const colorDomain = this.seriesDomain;
    this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);

    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  onClick(data: any): void {
    this.select.emit(data);
  }

  onActivate(data: any): void {
    this.activate.emit(data);
  }

  onDeactivate(data: any): void {
    this.deactivate.emit(data);
  }

  private getLegendOptions(): ILegendOptions {
    const legendOpts: ILegendOptions = {
      scaleType: 'ordinal',
      colors: this.colors,
      domain: [],
      position: this.legendPosition,
      title: this.legendTitle
    };
    return legendOpts;
  }
}
