import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions.js';
import { colorHelper } from 'common/services/stats/colorSets.js';
import { Chart } from '../common/charts/Chart.js';
import { BaseChart } from '../BaseChart.js';
import { SeriesVertical } from './SeriesVertical.js';
import { XAxis } from '../common/axes/XAxis.js';
import { YAxis } from '../common/axes/YAxis.js';
import { tickFormat } from '../common/tickFormat.js';
import { GridPanelSeries } from '../common/GridPanelSeries.js';

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
        <svg:g grid-panel-series
          [xScale]="x0Scale"
          [yScale]="y0Scale"
          [data]="results.series"
          [dims]="dims"
          orient="vertical">
        </svg:g>

        <svg:g x-axis
          *ngIf="xaxis"
          [xScale]="x0Scale"
          [dims]="dims"
          [tickFormatting]="tickFormatting"
          [showLabel]="showXAxisLabel"
          [labelText]="xaxisLabel">
        </svg:g>

        <svg:g y-axis
          *ngIf="yaxis"
          [yScale]="y0Scale"
          [dims]="dims"
          showGridLines="true"
          [showLabel]="showYAxisLabel"
          [labelText]="yaxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let series of results.series"
          [attr.transform]="seriesTransform(series)">
          <svg:g series-vertical
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
export class BarVertical2D extends BaseChart {
  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 100];
  @Input() scheme;
  @Input() customColors;
  @Input() legend = false;
  @Input() xaxis;
  @Input() yaxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xaxisLabel;
  @Input() yaxisLabel;
  @Input() scaleType = 'ordinal';

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    let groupSpacing = 0.2;
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    this.x0Scale;
    if (this.scaleType === 'ordinal'){
      this.x0Scale = d3.scale.ordinal()
        .rangeRoundBands([0, this.dims.width], groupSpacing)
        .domain(this.results.d0Domain);
    } else if (this.scaleType === 'time'){
      this.x0Scale = d3.time.scale()
        .range([0, this.dims.width])
        .domain(this.results.d0Domain);
    }

    this.x1Scale = d3.scale.ordinal()
      .rangeRoundBands([0, this.x0Scale.rangeBand()], groupSpacing)
      .domain(this.results.d1Domain);

    this.y0Scale = d3.scale.linear()
      .range([this.dims.height, 0], groupSpacing)
      .domain([0, this.results.m0Domain[1]]);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    this.tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
  }

  seriesTransform(series){
    return `translate(${this.x0Scale(series.name)}, 0)`;
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d1Domain, this.customColors);
  }

}
