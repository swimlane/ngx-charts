import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { SeriesVertical } from './SeriesVertical';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import d3 from '../d3';

@Component({
  selector: 'date-bar',
  directives: [Chart, SeriesVertical, XAxis, YAxis],
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results.series[0]">
      <svg:g [attr.transform]="transform" class="viz bar chart">
        <svg:g x-axis
          *ngIf="xaxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xaxisLabel"
          [xAxisTickInterval]="{unit: 'hour', interval: 2}">
        </svg:g>

        <svg:g y-axis
          *ngIf="yaxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="true"
          [showLabel]="showYAxisLabel"
          [labelText]="yaxisLabel">
        </svg:g>

        <svg:g series-vertical
          [xScale]="xScale"
          [yScale]="yScale"
          scaleType="time"
          [colors]="colors"
          [series]="results.series[0]"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class DateBar extends BaseChart implements OnInit {
  dims: ViewDimensions;
  xScale: any;
  yScale: any;
  transform: string;
  colors: Function;

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
    let groupSpacing = 0.2;
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
    this.yScale = d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain([0, this.results.m0Domain[1]]);

    this.xScale = d3.scaleBand()
      .rangeRound([0, this.dims.width], groupSpacing)
      .domain(this.results.d0Domain);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
  }
}
