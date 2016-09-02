import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import ObjectId from "../utils/object-id";
import d3 from '../d3';
import moment from 'moment';

@Component({
  selector: 'line-chart',
  template: `
    <chart
      [legend]="legend"
      [view]="view"
      [colors]="colors"
      [legendData]="results">>

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
        <!--
          <svg:g area
            *ngIf="gradient"
            [fill]="colors('Line')"
            [path]="areaPath"
            [startingPath]="areaPath"
            [data]="series"
            startOpacity="0"
            endOpacity="0.2"
            [gradient]="gradient"
          />
          -->

          <svg:g *ngFor="let series of results">
            <svg:g lineSeries
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
            />

            <svg:g circleSeries
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [strokeColor]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
              (clickHandler)="click($event)"
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
export class LineChart extends BaseChart implements OnInit, OnChanges {
  dims: ViewDimensions;
  xDomain: any;
  yDomain: any;
  yScale: any;
  xScale: any;
  colors: Function;
  scaleType: string;
  transform: string;
  clipPath: string;
  series: any;
  areaPath: any;

  @Input() view;
  @Input() results;
  @Input() margin = [10, 20, 70, 70];
  @Input() scheme;
  @Input() legend;
  @Input() customColors;
  @Input() xAxis;
  @Input() yAxis;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() autoScale;
  @Input() timeline;
  @Input() gradient: boolean;

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

    // TODO: should sorting happen here?
    // this.series = this.results.series[0].array.sort((a, b) => {
    //   return this.results.d0Domain.indexOf(a.vals[0].label[0][0]) - this.results.d0Domain.indexOf(b.vals[0].label[0][0]);
    // });

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    this.setColors();

    // let xProperty = (d) => {
    //   let label = d.vals[0].label[0][0];
    //   if (this.scaleType === 'time') {
    //     return this.xScale(moment(label).toDate());
    //   } else {
    //     return this.xScale(label) + this.xScale.bandwidth() / 2;
    //   }
    // };
    //
    // let area = d3.area()
    //   .x(xProperty)
    //   .y0(() => this.yScale.range()[0])
    //   .y1(d => this.yScale(d.vals[0].value));
    //
    // this.areaPath = area(this.series);

    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    let pageUrl = window.location.href;
    let clipPathId = 'clip' + ObjectId().toString();
    this.clipPath = `url(${pageUrl}#${clipPathId})`;
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
    let domain = [];
    for (let results of this.results) {
      for (let d of results.series){
        if (!domain.includes(d.value)) {
          domain.push(d.value);
        }
      }
    }

    let min = Math.min(...domain);
    let max = Math.max(...domain);
    if (!this.autoScale) {
      min = Math.min(0, min);
    }
    return [min, max];
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
    this.colors = colorHelper(this.scheme, 'ordinal', ['Line'], this.customColors);
  }
}
