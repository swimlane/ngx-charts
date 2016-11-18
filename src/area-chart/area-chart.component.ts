import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  HostListener,
  NgZone,
  ElementRef,
  AfterViewInit
} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import * as moment from 'moment';
import { id } from "../utils/id";
import d3 from '../d3';

@Component({
  selector: 'area-chart',
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

          <svg:g *ngFor="let series of results">
            <svg:g circleSeries
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
        [attr.transform]="timelineTransform"
        [results]="results"
        [view]="[timelineWidth, height]"
        [height]="timelineHeight"
        [scheme]="scheme"
        [customColors]="customColors"
        [legend]="legend"
        [scaleType]="scaleType"
        (onDomainChange)="updateDomain($event)">

        <svg:g *ngFor="let series of results; trackBy:trackBy">
          <svg:g areaSeries
            [xScale]="timelineXScale"
            [yScale]="timelineYScale"
            [color]="colors(series.name)"
            [data]="series"
            [scaleType]="scaleType"
            [gradient]="gradient"
            [curve]="curve"
          />
        </svg:g>

      </svg:g>
    </chart>
  `
})
export class AreaChart extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  dims: ViewDimensions;
  xSet: any;
  xDomain: any;
  yDomain: any;
  seriesDomain: any;
  xScale: any;
  yScale: any;
  transform: string;
  colors: Function;
  clipPathId: string;
  clipPath: string;
  scaleType: string;
  series: any;
  margin = [10, 20, 10, 20];
  hoveredVertical: any; // the value of the x axis that is hovered over
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  filteredDomain: any;

  timelineWidth: any;
  timelineHeight: number = 50;
  timelineXScale: any;
  timelineYScale: any;
  timelineXDomain: any;
  timelineTransform: any;
  timelinePadding: number = 10;

  @Input() view;
  @Input() results;
  @Input() scheme;
  @Input() legend;
  @Input() state;
  @Input() customColors;
  @Input() xAxis;
  @Input() yAxis;
  @Input() autoScale;
  @Input() showXAxisLabel;
  @Input() showYAxisLabel;
  @Input() xAxisLabel;
  @Input() yAxisLabel;
  @Input() timeline;
  @Input() gradient: boolean;
  @Input() showGridLines: boolean = true;
  @Input() curve = d3.shape.curveLinear;

  @Output() clickHandler = new EventEmitter();

  constructor(private element: ElementRef, zone: NgZone) {
    super(element, zone);
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
      this.dims.height -= (this.timelineHeight + this.margin[2] + this.timelinePadding);
    }

    this.xDomain = this.getXDomain();
    if (this.filteredDomain) {
      this.xDomain = this.filteredDomain;
    }

    this.yDomain = this.getYDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, this.dims.width);
    this.yScale = this.getYScale(this.yDomain, this.dims.height);

    this.updateTimeline();

    this.setColors();

    this.transform = `translate(${ this.dims.xOffset }, ${ this.margin[0] })`;
    let pageUrl = window.location.href;
    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(${pageUrl}#${this.clipPathId})`;
  }

  updateTimeline() {
    if (this.timeline) {
      this.timelineWidth = this.width;
      if (this.legend) {
        this.timelineWidth = this.width * 10.0 / 12.0;
      }
      this.timelineWidth -= (this.margin[3] + this.margin[1]);
      this.timelineXDomain = this.getXDomain();
      this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
      this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
      this.timelineTransform = `translate(${ this.margin[3] }, ${ -this.margin[2] })`;
    }
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

    this.xSet = values;

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

  getSeriesDomain() {
    return this.results.map(d => d.name);
  }

  getXScale(domain, width) {
    let scale;
    if (this.scaleType === 'time') {
      scale = d3.scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = d3.scaleLinear()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'ordinal') {
      scale = d3.scalePoint()
        .range([0, width])
        .padding(0.1)
        .domain(domain);
    }

    return scale;
  }

  getYScale(domain, height) {
    return d3.scaleLinear()
      .range([height, 0])
      .domain(domain);
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
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
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
