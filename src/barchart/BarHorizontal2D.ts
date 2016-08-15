import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { SeriesHorizontal } from './SeriesHorizontal';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import { tickFormat } from '../common/tickFormat';
import { GridPanelSeries } from '../common/GridPanelSeries';
import d3 from '../d3';

@Component({
  selector: 'bar-horizontal-2-d',
  directives: [Chart, SeriesHorizontal, XAxis, YAxis, GridPanelSeries],
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results.legend">
      <svg:g [attr.transform]="transform" class="viz bar chart">
        <svg:g grid-panel-series
          [xScale]="x0Scale"
          [yScale]="y0Scale"
          [data]="results.series"
          [dims]="dims"
          orient="horizontal">
        </svg:g>

        <svg:g x-axis
          *ngIf="xAxis"
          [xScale]="x0Scale"
          [dims]="dims"
          showGridLines="true"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g y-axis
          *ngIf="yAxis"
          [yScale]="y0Scale"
          [dims]="dims"
          [tickFormatting]="tickFormatting"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let series of results.series"
          [attr.transform]="seriesTransform(series)">
          <svg:g series-horizontal
            [xScale]="x0Scale"
            [yScale]="y1Scale"
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
export class BarHorizontal2D extends BaseChart implements OnInit {
  dims: ViewDimensions;
  x0Scale: any;
  y0Scale: any;
  y1Scale: any;
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

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    // let groupSpacing = 0.2; // unusued variable
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    this.x0Scale = d3.scaleLinear()
      .range([0, this.dims.width])
      .domain([0, this.results.m0Domain[1]]);

    this.y0Scale = d3.scaleBand()
      .rangeRound([0, this.dims.height], 0.1)
      .domain(this.results.d0Domain);

    this.y1Scale = d3.scaleBand()
      .rangeRound([0, this.y0Scale.bandwidth()], 0.1)
      .domain(this.results.d1Domain);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    this.tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
  }

  seriesTransform(series) {
    return `translate(0, ${this.y0Scale(series.name)})`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d1Domain, this.customColors);
  }
}
