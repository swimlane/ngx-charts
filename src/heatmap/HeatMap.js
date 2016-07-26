import { Component, Input, Output, EventEmitter } from '@angular/core';
import d3 from 'd3';
import { Chart } from '../common/charts/Chart.js';
import { BaseChart } from '../BaseChart.js';
import { XAxis } from '../common/axes/XAxis.js';
import { YAxis } from '../common/axes/YAxis.js';
import { HeatCellSeries } from './HeatCellSeries.js';
import { calculateViewDimensions } from '../common/viewDimensions.js';
import { generateColorScale, colorHelper } from 'common/services/stats/colorSets.js';

@Component({
  selector: 'heat-map',
  directives: [Chart, HeatCellSeries, XAxis, YAxis],
  template: `
    <chart
      [legend]="false"
      [legendData]="colorScale"
      [data]="results.m0Domain"
      [view]="view">
      <svg:g [attr.transform]="transform" class="viz numbercard">

        <svg:g x-axis
          *ngIf="xaxis"
          [xScale]="xScale"
          [dims]="dims"
          [showLabel]="showXAxisLabel"
          [labelText]="xaxisLabel">
        </svg:g>

        <svg:g y-axis
          *ngIf="yaxis"
          [yScale]="yScale"
          [dims]="dims"
          [showLabel]="showYAxisLabel"
          [labelText]="yaxisLabel">
        </svg:g>

        <svg:rect *ngFor="let rect of rects"
          [attr.x]="rect.x"
          [attr.y]="rect.y"
          [attr.rx]="rect.rx"
          [attr.width]="rect.width"
          [attr.height]="rect.height"
          [attr.fill]="rect.fill"
        />

        <svg:g heat-cell-series
          [xScale]="xScale"
          [yScale]="yScale"
          [colors]="colors"
          [data]="results.series"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class HeatMap extends BaseChart {
  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 100];
  @Input() scheme;
  @Input() customColors;
  @Input() legend;
  @Input() xaxis;
  @Input() yaxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xaxisLabel;
  @Input() yaxisLabel;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 11);

    this.xScale = d3.scale.ordinal()
      .rangeRoundBands([0, this.dims.width], 0.1)
      .domain(this.results.d0Domain);

    this.yScale = d3.scale.ordinal()
      .rangeRoundBands([this.dims.height, 0], 0.1)
      .domain(this.results.d1Domain);

    this.color = d3.rgb(this.scheme.domain[0]);

    this.colors = colorHelper(this.scheme, 'linear', this.results.m0Domain);
    this.colorScale = generateColorScale(this.scheme, 'linear', this.results.m0Domain);

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;

    this.rects = this.getRects();
  }

  getRects(){
    let rects = [];

    this.results.d0Domain.map((d0, index0) => {
      this.results.d1Domain.map((d1, index1) => {
        rects.push({
          x: this.xScale(d0),
          y: this.yScale(d1),
          rx: 3,
          width: this.xScale.rangeBand(),
          height: this.yScale.rangeBand(),
          fill: 'rgba(200,200,200,0.03)'
        });
      });
    });

    return rects;
  }

  click(data){
    this.clickHandler.emit(data);
  }

}
