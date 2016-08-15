import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { SeriesVertical } from './SeriesVertical';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import { tickFormat } from '../common/tickFormat';
import { GridPanelSeries } from '../common/GridPanelSeries';
import d3 from '../d3';

@Component({
  selector: 'bar-vertical-2-d',
  directives: [Chart, SeriesVertical, XAxis, YAxis, GridPanelSeries],
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results.series[0]">
      <svg:g [attr.transform]="transform" class="viz bar chart">
        <svg:g gridPanelSeries
          [xScale]="x0Scale"
          [yScale]="y0Scale"
          [data]="results.series"
          [dims]="dims"
          orient="vertical">
        </svg:g>

        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="x0Scale"
          [dims]="dims"
          [tickFormatting]="tickFormatting"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="y0Scale"
          [dims]="dims"
          showGridLines="true"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let series of results.series"
          [attr.transform]="seriesTransform(series)">
          <svg:g seriesVertical
            [xScale]="x1Scale"
            [yScale]="y0Scale"
            [colors]="colors"
            [series]="series"
            [dims]="dims"
            (clickHandler)="click($event)"
          />
        </svg:g>
      </svg:g>
    </chart>
  `
})
export class BarVertical2D extends BaseChart implements OnInit {
  dims: ViewDimensions;
  x0Scale: any;
  x1Scale: any;
  y0Scale: any;
  transform: string;
  tickFormatting: Function;
  colors: Function;

  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 100];
  @Input() scheme;
  @Input() customColors;
  @Input() legend = false;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() scaleType = 'ordinal';

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    let groupSpacing = 0.2;
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    if (this.scaleType === 'ordinal') {
      this.x0Scale = d3.scaleBand()
        .rangeRound([0, this.dims.width], groupSpacing)
        .domain(this.results.d0Domain);
    } else if (this.scaleType === 'time') {
      this.x0Scale = d3.scaleTime()
        .range([0, this.dims.width])
        .domain(this.results.d0Domain);
    }

    this.x1Scale = d3.scaleBand()
      .rangeRound([0, this.x0Scale.bandwidth()], groupSpacing)
      .domain(this.results.d1Domain);

    this.y0Scale = d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain([0, this.results.m0Domain[1]]);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    this.tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
  }

  seriesTransform(series) {
    return `translate(${this.x0Scale(series.name)}, 0)`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d1Domain, this.customColors);
  }
}
