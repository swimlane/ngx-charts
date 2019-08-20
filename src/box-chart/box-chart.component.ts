import { Component, ChangeDetectionStrategy, ViewEncapsulation, EventEmitter, Output, Input } from '@angular/core';

import { BaseChartComponent } from '../common/base-chart.component';
import { ILegendOptions } from '../models/legend.model';
import { ViewDimensions, ColorHelper, calculateViewDimensions } from '../common';
import { BoxChartMultiSeries, BoxChartSeries } from '../models/chart-data.model';
import { id } from '../utils';
import { scalePoint, scaleLinear, ScaleLinear, ScalePoint } from 'd3-scale';

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
        <svg:g
          ngx-charts-x-axis
          [showGridLines]="showGridLines"
          [dims]="dims"
          [xScale]="xScale"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)"
        />
        <svg:g
          ngx-charts-y-axis
          [showGridLines]="showGridLines"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)"
        />
      </svg:g>
      <svg:g [attr.clip-path]="clipPath">
        <svg:g *ngFor="let result of results; trackBy: trackBy">
          <svg:g
            ngx-charts-box-series
            [xScale]="xScale"
            [yScale]="yScale"
            [colors]="colors"
            [series]="result.series"
            [dims]="dims"
            [animations]="animations"
            (activate)="onActivate($event)"
            (deactivate)="onDeactivate($event)"
            (select)="onClick($event)"
          />
        </svg:g>
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
  @Input() showGridLines: boolean = true;
  @Input() showXAxisLabel: boolean = true;
  @Input() showYAxisLabel: boolean = true;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Output() select: EventEmitter<any> = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  /** Input Data, this came from Base Chart Component. */
  results: BoxChartMultiSeries;
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

  xScale: ScalePoint<string>;
  yScale: ScaleLinear<number, number>;
  xDomain: Array<string | number | Date>;
  yDomain: number[];
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;

  trackBy(index: number, item: BoxChartSeries): string | number | Date {
    return item.name;
  }

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
    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();
    this.setScales();

    const colorDomain = this.seriesDomain;
    this.colors = new ColorHelper(this.scheme, this.schemeType, colorDomain, this.customColors);

    this.legendOptions = this.getLegendOptions();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;

    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(#${this.clipPathId})`;
  }

  setScales() {
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);
  }

  getXScale(domain: Array<string | number | Date>, width: number): ScalePoint<string> {
    const scale = scalePoint()
      .domain(domain.map(d => d.toString()))
      .rangeRound([0, width])
      .padding(0.5);

    return scale;
  }

  getYScale(domain: number[], height: number): ScaleLinear<number, number> {
    const scale = scaleLinear()
      .range([height, 0])
      .domain(domain);

    return scale;
  }

  getUniqueBoxChartXDomainValues(results: BoxChartMultiSeries) {
    const valueSet = new Set<string | number | Date>();
    for (const result of results) {
      for (const d of result.series) {
        valueSet.add(d.name);
      }
    }
    return Array.from(valueSet);
  }

  getXDomain(): Array<string | number | Date> {
    let domain: Array<string | number | Date> = [];
    const values: Array<string | number | Date> = this.getUniqueBoxChartXDomainValues(this.results);
    let min: number;
    let max: number;
    if (typeof values[0] === 'string') {
      domain = values.map(val => val.toString());
    } else if (typeof values[0] === 'number') {
      const mappedValues = values.map(v => Number(v));
      min = Math.min(...mappedValues);
      max = Math.max(...mappedValues);
      domain = [min, max];
    } else {
      const mappedValues = values.map(v => Number(new Date(v)));
      min = Math.min(...mappedValues);
      max = Math.max(...mappedValues);
      domain = [new Date(min), new Date(max)];
    }
    return domain;
  }

  getYDomain(): number[] {
    const domain: Array<number | Date> = [];
    for (const results of this.results) {
      for (const d of results.series) {
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
      }
    }

    const values = [...domain];
    const mappedValues = values.map(v => Number(v));

    const min: number = Math.min(...mappedValues);
    const max: number = Math.max(...mappedValues);

    return [min, max];
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
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
