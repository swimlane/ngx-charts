import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  HostListener,
  ElementRef,
  NgZone,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import d3 from '../d3';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChartComponent } from '../common/base-chart.component';
import * as moment from 'moment';
import { id } from "../utils/id";

@Component({
  selector: 'area-chart-normalized',
  template: `
    <chart
      [legend]="legend"
      [view]="[width, height]"
      (legendLabelClick)="onClick({series: $event.name})"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)"
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
              [activeEntries]="activeEntries"
              [gradient]="gradient"
              normalized="true"
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
            [showPercentage]="true"
            (hover)="updateHoveredVertical($event)"
          />
          <svg:g *ngFor="let series of results">
            <svg:g circleSeries
              type="stacked"
              [xScale]="xScale"
              [yScale]="yScale"
              [color]="colors(series.name)"
              [strokeColor]="colors(series.name)"
              [activeEntries]="activeEntries"
              [data]="series"
              [scaleType]="scaleType"
              [visibleValue]="hoveredVertical"
              (select)="onClick($event, series)"
              (activate)="onActivate($event)"
              (deactivate)="onDeactivate($event)"
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
            normalized="true"
            [curve]="curve"
          />
        </svg:g>
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaChartNormalizedComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {

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
  @Input() activeEntries: any[] = [];

  @Output() select = new EventEmitter();
  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

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
  tooltipAreas: any[];
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

  constructor(private element: ElementRef, private cd: ChangeDetectorRef, zone: NgZone) {
    super(element, zone, cd);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnDestroy(): void {
    this.unbindEvents();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    super.update();

    this.zone.run(() => {
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

      for (let i = 0; i < this.xSet.length; i++) {
        let val = this.xSet[i];
        let d0 = 0;

        let total = 0;
        for (let group of this.results){
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
            total += d.value;
          }
        }

        for (let group of this.results){
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

          if (total > 0) {
            d.d0 = (d.d0 * 100) / total;
            d.d1 = (d.d1 * 100) / total;
          } else {
            d.d0 = 0;
            d.d1 = 0;
          }
        }
      }

      this.updateTimeline();

      this.setColors();
      this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
      let pageUrl = window.location.href;
      this.clipPathId = 'clip' + id().toString();
      this.clipPath = `url(${pageUrl}#${this.clipPathId})`;
    });
  }

  updateTimeline(): void {
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

  getXDomain(): any[] {
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

  getYDomain(): any[] {
    return [ 0, 100 ];
  }

  getSeriesDomain(): any[] {
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

  getScaleType(values): string {
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

  isDate(value): boolean {
    if (value instanceof Date) {
      return true;
    }

    return false;
  }

  updateDomain(domain): void {
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
  }

  updateHoveredVertical(item): void {
    this.hoveredVertical = item.value;
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
  }

  onClick(data, series): void {
    if (series) {
      data.series = series.name;
    }

    this.select.emit(data);
  }

  trackBy(index, item): string {
    return item.name;
  }

  setColors(): void {
    this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(event): void {
    if(this.activeEntries.indexOf(event) > -1) return;
    this.activeEntries = [ event, ...this.activeEntries ];
    this.activate.emit({ value: event, entries: this.activeEntries });
  }

  onDeactivate(event): void {
    const idx = this.activeEntries.indexOf(event);

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: event, entries: this.activeEntries });
  }

}
