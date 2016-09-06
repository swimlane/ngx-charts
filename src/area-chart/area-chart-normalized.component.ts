import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import d3 from '../d3';
import moment = require("moment");
import ObjectId from "../utils/object-id";

@Component({
  selector: 'area-chart-normalized',
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results">

      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"/>
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

          <svg:g *ngFor="let series of results">
            <svg:g areaSeries
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
              [gradient]="gradient"
              normalized="true"
            />
          </svg:g>

          <svg:rect
            class="tooltip-area"
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            x="-5"
            y="-5"
            style="fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';"
          />

          <svg:g *ngFor="let series of results">
            <svg:g circleSeries
              type="stacked"
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [strokeColor]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
              chartType="area"
              (clickHandler)="click($event)"
            />
          </svg:g>

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
export class AreaChartNormalized extends BaseChart implements OnInit, OnChanges {
  dims: ViewDimensions;
  scaleType: string;
  xDomain: any[];
  yDomain: any[];
  xScale: any;
  yScale: any;
  transform: string;
  clipPathId: string;
  clipPath: string;
  colors: Function;

  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 70];
  @Input() scheme;
  @Input() customColors;
  @Input() legend = false;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() timeline;
  @Input() gradient;

  @Output() clickHandler = new EventEmitter();


  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);

    if (this.timeline) {
      this.dims.height -= 150;
    }

    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();



    // modifies results in place
    for (let i = 0; i < this.xDomain.length; i++) {
      let val = this.xDomain[i];
      let d0 = 0;

      let total = 0;
      for (let group of this.results){
        let d = group.series.find(item => item.name === val);
        total += d.value;
      }

      for (let group of this.results){
        let d = group.series.find(item => item.name === val);

        d.d0 = d0;
        d.d1 = d0 + d.value;
        d0 += d.value;

        if (total > 0){
          d.d0 = (d.d0 * 100) / total;
          d.d1 = (d.d1 * 100) / total;
        } else {
          d.d0 = 0;
          d.d1 = 0;
        }
      }
    }

    this.setColors();
    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    let pageUrl = window.location.href;
    this.clipPathId = 'clip' + ObjectId().toString();
    this.clipPath = `url(${pageUrl}#${this.clipPathId})`;

  }

  getXDomain() {
    let values = [];
    for (let results of this.results) {
      for (let d of results.series){
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }

    this.scaleType = this.getScaleType(values);
    let domain = [];
    if (this.scaleType === 'time') {
      values = values.map(v => moment(v).toDate());
      let min = Math.min(...values);
      let max = Math.max(...values);
      domain = [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      let min = Math.min(...values);
      let max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }
    return domain;
  }

  getYDomain() {
    return [0, 100];
  }

  getXScale() {
    let scale;
    if (this.scaleType === 'time') {
      scale = d3.scaleTime()
        .range([0, this.dims.width])
        .domain(this.xDomain);
    } else if (this.scaleType === 'linear') {
      scale = d3.scaleLinear()
        .range([0, this.dims.width])
        .domain(this.xDomain);
    } else if (this.scaleType === 'ordinal') {
      scale = d3.scalePoint()
        .range([0, this.dims.width])
        .padding(0.1)
        .domain(this.xDomain);
    }

    return scale;
  }

  getYScale() {
    return d3.scaleLinear()
      .range([this.dims.height, 0])
      .domain(this.yDomain);
  }

  getScaleType(values) {
    let date = true;
    let number = true;
    for (let value of values) {
      if (!this.isDate(value)) {
        date = false;
      }
      if (typeof value !== 'number') {
        number = false;
      }
    }

    if (date) {
      return 'time';
    }
    if (number) {
      return 'linear';
    }
    return 'ordinal';
  }

  isDate(value) {
    if (value instanceof Date) {
      return true;
    }

    return false;
  }


  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
  }

}
