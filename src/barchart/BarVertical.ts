import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { SeriesVertical } from './SeriesVertical';
import { XAxis } from '../common/axes/XAxis';
import { YAxis } from '../common/axes/YAxis';
import { tickFormat } from '../common/tickFormat';
import * as d3 from 'd3';


@Component({
  selector: 'bar-vertical',
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
          [tickFormatting]="xAxisTickFormatting()"
          [showLabel]="showXAxisLabel"
          [labelText]="xaxisLabel">
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
          [colors]="colors"
          [series]="results.series[0]"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class BarVertical extends BaseChart{
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

  dims: any;
  yScale: any;
  xScale: any;
  transform: any;
  colors: any;

  ngOnInit() {
    this.update();
  }

  update(){
    let groupSpacing = 0.2;
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    this.yScale = d3.scale.linear()
      .range([this.dims.height, 0])
      .domain([0, this.results.m0Domain[1]]);

    this.xScale = d3.scale.ordinal()
      .rangeRoundBands([0, this.dims.width], groupSpacing)
      .domain(this.results.d0Domain);

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
  }

  xAxisTickFormatting(){
    let tickFormatting;
    if (this.results.query && this.results.query.dimensions.length){
      tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
    }
    return tickFormatting;
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
  }

}
