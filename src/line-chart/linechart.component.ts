import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import ObjectId from "../utils/object-id";
import moment = require("moment"); // todo remove moment dependency
import d3 from '../d3';

@Component({
  selector: 'line-chart',
  template: `
    <chart
      [legend]="false"
      [view]="view">

      <svg:defs>
        <svg:clipPath id="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            transform="translate(-5, -5)"/>
        </svg:clipPath>
      </svg:defs>

      <svg:g [attr.transform]="transform" class="line chart">
        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="true"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="true"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel">
        </svg:g>

        <svg:g [attr.clip-path]="clipPath">

          <svg:g lineSeries
            [xScale]="xScale"
            [yScale]="yScale"
            [color]="colors('Line')"
            [data]="series"
            [scaleType]="scaleType"
          />

          <svg:rect
            class="tooltip-area"
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            x="-5"
            y="-5"
            style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
          />

          <svg:g circleSeries
            [xScale]="xScale"
            [yScale]="yScale"
            [color]="colors('Line')"
            [data]="series"
            [scaleType]="scaleType"
            (clickHandler)="click($event)"
          />

        </svg:g>
      </svg:g>

      <svg:g timeline
        *ngIf="timeline && scaleType === 'time'"
        [results]="results"
        [view]="view"
        [scheme]="scheme"
        [customColors]="customColors"
        [legend]="legend">
      </svg:g>
    </chart>
  `
})
export class LineChart extends BaseChart implements OnInit {
  dims: ViewDimensions;
  yScale: any;
  xScale: any;
  colors: Function;
  scaleType: string;
  transform: string;
  clipPath: string;
  legend: boolean = false;
  series: any;

  @Input() view;
  @Input() xDomain;
  @Input() results;
  @Input() margin = [10, 20, 70, 70];
  @Input() scheme;
  @Input() customColors;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() autoScale;
  @Input() timeline;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  update() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    if (this.timeline) {
      this.dims.height -= 150;
    }

    this.series = this.results.series[0].array.sort((a, b) => {
      return this.results.d0Domain.indexOf(a.vals[0].label[0][0]) - this.results.d0Domain.indexOf(b.vals[0].label[0][0]);
    });

    this.yScale = d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.results.m0Domain);

    if (!this.autoScale) {
      this.yScale.domain([0, this.results.m0Domain[1]]);
    }

    if (this.results.query && this.results.query.dimensions.length && this.results.query.dimensions[0].field.fieldType === 'date' && this.results.query.dimensions[0].groupByType.value === 'groupBy') {
      let domain;
      if (this.xDomain) {
        domain = this.xDomain;
      } else {
        domain = d3.extent(this.results.d0Domain, function(d) {
          return moment(d).toDate();
        });
      }
      this.scaleType = 'time';
      this.xScale = d3.scaleTime()
        .range([0, this.dims.width])
        .domain(domain);
    } else {
      this.scaleType = 'ordinal';
      this.xScale = d3.scalePoint()
        .range([0, this.dims.width], 0.1)
        .domain(this.results.d0Domain);
    }

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    let pageUrl = window.location.href;
    let clipPathId = 'clip' + ObjectId().toString();
    this.clipPath = `url(${pageUrl}#${clipPathId})`;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', ['Line'], this.customColors);
  }
}
