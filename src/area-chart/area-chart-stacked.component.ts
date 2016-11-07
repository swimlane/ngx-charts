import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  OnDestroy,
  HostListener,
  NgZone,
  AfterViewInit
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import * as moment from 'moment';
import { id } from "../utils/id";
import d3 from '../d3';

@Component({
  selector: 'area-chart-stacked',
  template: `
    <chart
      [legend]="legend"
      [view]="[width, height]"
      [colors]="colors"
      [legendData]="seriesDomain">

      <svg:defs>
        <svg:clipPath [attr.id]="clipPathId">
          <svg:rect
            [attr.width]="dims.width + 10"
            [attr.height]="dims.height + 10"
            [attr.transform]="'translate(-5, -5)'"/>
        </svg:clipPath>
      </svg:defs>

      <svg:g [attr.transform]="transform" class="area-chart chart">
        <svg:g xAxis
          *ngIf="xAxis"
          [xScale]="xScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>

        <svg:g yAxis
          *ngIf="yAxis"
          [yScale]="yScale"
          [dims]="dims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>

        <svg:g [attr.clip-path]="clipPath">

          <svg:g *ngFor="let series of results; trackBy:trackBy">
            <svg:g areaSeries
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
              [gradient]="gradient"
              stacked="true"
              [curve]="curve"
            />
          </svg:g>

          <svg:g areaTooltip
            [xSet]="xSet"
            [xScale]="xScale"
            [yScale]="yScale"
            [results]="results"
            [height]="dims.height"
            [colors]="colors"
            (hover)="updateHoveredVertical($event)"
          />

          <svg:g *ngFor="let series of results; trackBy:trackBy">
            <svg:g circleSeries
              type="stacked"
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [strokeColor]="colors(series.name)"
              [data]="series"
              [scaleType]="scaleType"
              [visibleValue]="hoveredVertical"
              (clickHandler)="click($event, series)"
            />
          </svg:g>

        </svg:g>
      </svg:g>

      <svg:g timeline
        *ngIf="timeline && scaleType === 'time'"
        [results]="results"
        [view]="[width, height]"
        [scheme]="scheme"
        [customColors]="customColors"
        [legend]="legend"
        [scaleType]="scaleType"
        (onDomainChange)="updateDomain($event)">
      </svg:g>
    </chart>
  `
})
export class AreaChartStacked extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  element: HTMLElement;
  dims: ViewDimensions;
  scaleType: string;
  xDomain: any[];
  xSet: any[]; // the set of all values on the X Axis
  yDomain: any[];
  seriesDomain: any;
  xScale: any;
  yScale: any;
  transform: string;
  clipPathId: string;
  clipPath: string;
  colors: Function;
  margin = [10, 20, 10, 20];
  hoveredVertical: any; // the value of the x axis that is hovered over
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;

  @Input() view;
  @Input() results;
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
  @Input() showGridLines: boolean = true;
  @Input() curve = d3.shape.curveLinear;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef, zone: NgZone) {
    super(element, zone);
    this.element = element.nativeElement;
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnDestroy() {
    this.unbindEvents();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: this.xAxis,
      showYAxis: this.yAxis,
      xAxisHeight: this.xAxisHeight,
      yAxisWidth: this.yAxisWidth,
      showXLabel: this.showXAxisLabel,
      showYLabel: this.showYAxisLabel,
      showLegend: this.legend,
      columns: 10
    });

    if (this.timeline) {
      this.dims.height -= 150;
    }

    this.xDomain = this.getXDomain();
    this.yDomain = this.getYDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale();
    this.yScale = this.getYScale();

    for (let i = 0; i < this.xSet.length; i++) {
      let val = this.xSet[i];
      let d0 = 0;
      for (let group of this.results) {

        let d = group.series.find(item => {
          let a = item.name;
          let b = val;
          if (this.scaleType === 'time') {
            a = a.valueOf();
            b = b.valueOf();
          }
          return a === b;
        });

        if (d) {
          d.d0 = d0;
          d.d1 = d0 + d.value;
          d0 += d.value;
        } else {
          d = {
            name: val,
            value: 0,
            d0: d0,
            d1: d0
          };
          group.series.push(d);
        }
      }
    }

    this.setColors();
    this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    let pageUrl = window.location.href;
    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(${pageUrl}#${this.clipPathId})`;
  }

  getXDomain() {
    let values = [];
    for (let results of this.results) {
      for (let d of results.series) {
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
      domain = [new Date(min), new Date(max)];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      let min = Math.min(...values);
      let max = Math.max(...values);
      domain = [min, max];
    } else {
      domain = values;
    }
    this.xSet = values;
    return domain;
  }

  getYDomain() {
    let domain = [];

    for (let i = 0; i < this.xSet.length; i++) {
      let val = this.xSet[i];
      let sum = 0;
      for (let group of this.results) {
        let d = group.series.find(item => {
          let a = item.name;
          let b = val;
          if (this.scaleType === 'time') {
            a = a.valueOf();
            b = b.valueOf();
          }
          return a === b;
        });

        if (d) {
          sum += d.value;
        }
      }

      domain.push(sum);
    }

    let min = Math.min(0, ...domain);
    let max = Math.max(...domain);
    return [min, max];
  }

  getSeriesDomain() {
    return this.results.map(d => d.name);
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

  updateDomain(domain) {
    this.xDomain = domain;
    this.xScale = this.getXScale();
  }

  updateHoveredVertical(item) {
    this.hoveredVertical = item.value;
  }

  @HostListener('mouseleave')
  hideCircles() {
    this.hoveredVertical = null;
  }

  click(data, series) {
    data.series = series.name;
    this.clickHandler.emit(data);
  }

  trackBy(index, item) {
    return item.name;
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
  }

  updateYAxisWidth({width}) {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({height}) {
    this.xAxisHeight = height;
    this.update();
  }
}
