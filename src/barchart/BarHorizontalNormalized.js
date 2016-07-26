import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions.js';
import { colorHelper } from 'common/services/stats/colorSets.js';
import { Chart } from '../common/charts/Chart.js';
import { BaseChart } from '../BaseChart.js';
import { SeriesHorizontal } from './SeriesHorizontal.js';
import { XAxis } from '../common/axes/XAxis.js';
import { YAxis } from '../common/axes/YAxis.js';
import { tickFormat } from '../common/tickFormat.js';
import d3 from 'd3';

@Component({
  selector: 'bar-horizontal-normalized',
  directives: [Chart, SeriesHorizontal, XAxis, YAxis],
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results.legend">
      <svg:g [attr.transform]="transform" class="viz bar chart">

        <svg:g x-axis
          *ngIf="xaxis"
          [xScale]="xScale"
          [dims]="dims"
          [tickFormatting]="xAxisTickFormatting"
          showGridLines="true"
          [showLabel]="showXAxisLabel"
          [labelText]="xaxisLabel">
        </svg:g>

        <svg:g y-axis
          *ngIf="yaxis"
          [yScale]="yScale"
          [dims]="dims"
          [tickFormatting]="tickFormatting"
          [showLabel]="showYAxisLabel"
          [labelText]="yaxisLabel">
        </svg:g>

        <svg:g
          *ngFor="let series of results.series"
          [attr.transform]="seriesTransform(series)">
          <svg:g series-horizontal
            type="stacked"
            [xScale]="xScale"
            [yScale]="yScale"
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
export class BarHorizontalNormalized extends BaseChart {
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

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    this.xScale = d3.scale.linear()
      .range([0, this.dims.width], 0.1)
      .domain([0, 1]);

    this.yScale = d3.scale.ordinal()
      .rangeRoundBands([0, this.dims.height], 0.1)
      .domain(this.results.d0Domain);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;

    this.xAxisTickFormatting = d3.format('.0%');
  }

  seriesTransform(series){
    return `translate(0, ${this.yScale(series.name)})`;
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d1Domain, this.customColors);
  }

}
