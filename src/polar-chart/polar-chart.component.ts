import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  HostListener,
  ChangeDetectionStrategy
} from '@angular/core';
import { PathLocationStrategy } from '@angular/common';
import { scaleLinear, scaleTime, scalePoint } from 'd3-scale';
import { curveLinear, curveLinearClosed, curveCardinalClosed } from 'd3-shape';

import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { PieLabelComponent } from '../pie-chart/pie-label.component';

import { id } from '../utils/id';
import { isDate, isNumber } from '../utils/types';
import { reduceTicks } from '../common/axes/ticks.helper';

@Component({
  selector: 'ngx-charts-polar-chart',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      [activeEntries]="activeEntries"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g class="polar-chart chart">
        <svg:g [attr.transform]="transform">
          <svg:circle
            class="polar-chart-background"
            cx="0" cy="0"
            [attr.r]="this.outerRadius" />
          <svg:g *ngIf="showGridLines">
            <svg:circle
              *ngFor="let r of radiusTicks"
              class="gridline-path radial-gridline-path"
              cx="0" cy="0"
              [attr.r]="r" />
          </svg:g>
          <svg:g *ngIf="xAxis">
            <svg:g ngx-charts-pie-label
              *ngFor="let tick of thetaTicks"
              [data]="tick"
              [radius]="outerRadius"
              [label]="tick.label"
              [max]="outerRadius"
              [value]="showGridLines ? 1 : outerRadius"
              [explodeSlices]="true">
            </svg:g>
          </svg:g>
        </svg:g>
        <svg:g ngx-charts-y-axis
          *ngIf="yAxis"
          [attr.transform]="yAxisTransform"
          [yScale]="yAxisScale"
          [dims]="yAxisDims"
          [showGridLines]="showGridLines"
          [showLabel]="showYAxisLabel"
          [labelText]="yAxisLabel"
          [tickFormatting]="yAxisTickFormatting"
          (dimensionsChanged)="updateYAxisWidth($event)">
        </svg:g>
        <svg:g ngx-charts-x-axis
          *ngIf="xAxis"
          [attr.transform]="xAxisTransform"
          [dims]="dims"
          [showGridLines]="false"
          [showLabel]="showXAxisLabel"
          [labelText]="xAxisLabel"
          [tickFormatting]="xAxisTickFormatting"
          (dimensionsChanged)="updateXAxisHeight($event)">
        </svg:g>
        <svg:g [attr.transform]="transform">
          <svg:g *ngFor="let series of results; trackBy: series?.name">
            <svg:g ngx-charts-polar-series
              [xScale]="xScale"
              [yScale]="yScale"
              [colors]="colors"
              [data]="series"
              [activeEntries]="activeEntries"
              [scaleType]="scaleType"
              [curve]="curve"
              [rangeFillOpacity]="rangeFillOpacity"
              [tooltipDisabled]="tooltipDisabled"
            />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: [
    '../common/base-chart.component.scss',
    '../pie-chart/pie-chart.component.scss',
    './polar-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PolarChartComponent extends BaseChartComponent {

  @Input() legend: boolean;
  @Input() legendTitle: string = 'Legend';
  @Input() xAxis: boolean;
  @Input() yAxis: boolean;
  @Input() showXAxisLabel: boolean;
  @Input() showYAxisLabel: boolean;
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() autoScale: boolean;
  // @Input() timeline;
  @Input() gradient: boolean; // ???
  @Input() showGridLines: boolean = true;
  @Input() curve: any = curveCardinalClosed;
  @Input() activeEntries: any[] = [];
  @Input() schemeType: string;
  @Input() rangeFillOpacity: number; // ???
  @Input() xAxisTickFormatting: (o: any) => any;
  @Input() yAxisTickFormatting: (o: any) => any;
  @Input() roundDomains: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() showSeriesOnHover: boolean = true;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  dims: ViewDimensions;
  yAxisDims: ViewDimensions;
  // xSet: any;
  xDomain: any;
  yDomain: any;
  seriesDomain: any;
  yScale: any;  // -> rScale
  xScale: any;  // -> tScale
  yAxisScale; any; // -> yScale
  colors: ColorHelper;
  scaleType: string;
  transform: string;
  yAxisTransform: string;
  xAxisTransform: string;
  // clipPath: string;
  // clipPathId: string;
  series: any; // ???
  // areaPath: any;
  margin = [10, 20, 10, 20];
  // hoveredVertical: any; // the value of the x axis that is hovered over
  xAxisHeight: number = 0;
  yAxisWidth: number = 0;
  filteredDomain: any;
  legendOptions: any;
  thetaTicks: any[];
  radiusTicks: number[];
  outerRadius: number;

  update(): void {
    super.update();

    this.setDims();
    this.setScales();
    this.legendOptions = this.getLegendOptions();

    /* const pageUrl = this.location instanceof PathLocationStrategy
      ? this.location.path()
      : '';

    this.clipPathId = 'clip' + id().toString();
    this.clipPath = `url(${pageUrl}#${this.clipPathId})`; */

    this.setTicks();
  }

  setDims() {
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
      legendType: this.schemeType
    });

    const halfWidth = ~~(this.dims.width / 2);
    const halfHeight = ~~(this.dims.height / 2);

    const outerRadius = this.outerRadius = Math.min(halfHeight, halfWidth);

    const yOffset = Math.max(0, halfHeight - this.outerRadius);
    const xOffset = Math.max(0, halfWidth - this.outerRadius);

    this.yAxisDims = {
      ...this.dims,
      width: halfWidth
    };

    this.transform = `translate(${ halfWidth + xOffset } , ${ halfHeight })`;
    this.xAxisTransform = `translate(${ xOffset }, 0)`;
    this.yAxisTransform = `translate(${ xOffset }, ${ yOffset })`;
  }

  setScales() {
    const xValues = this.getXValues();
    this.scaleType = this.getScaleType(xValues);
    this.xDomain = this.filteredDomain || this.getXDomain(xValues);

    this.yDomain = this.getYDomain();
    this.seriesDomain = this.getSeriesDomain();

    this.xScale = this.getXScale(this.xDomain, 2 * Math.PI);
    this.yScale = this.getYScale(this.yDomain, this.outerRadius);
    this.yAxisScale = this.getYScale(this.yDomain.reverse(), this.outerRadius);

    // this.updateTimeline();

    this.setColors();
  }

  setTicks() {
    const outerRadius = this.outerRadius;
    const s = 1.1;

    this.thetaTicks = this.xDomain.map(d => {
      const startAngle = this.xScale(d);
      const dd = s * outerRadius * (startAngle > Math.PI ? -1 : 1);

      const startPos = [outerRadius * Math.sin(startAngle), -outerRadius * Math.cos(startAngle)];
      const pos = [dd, s * startPos[1]];
      return {
        innerRadius: 0,
        outerRadius,
        startAngle,
        endAngle: startAngle,
        value: outerRadius,
        label: d,
        startPos,
        pos
      };
    });

    const minDistance = 10;

    /* from pie chart, abstract out -*/
    for (let i = 0; i < this.thetaTicks.length - 1; i++) {
      const a = this.thetaTicks[i];

      for (let j = i + 1; j < this.thetaTicks.length; j++) {
        const b = this.thetaTicks[j];
        // if they're on the same side
        if (b.pos[0] * a.pos[0] > 0) {
          // if they're overlapping
          const o = minDistance - Math.abs(b.pos[1] - a.pos[1]);
          if (o > 0) {
            // push the second up or down
            b.pos[1] += Math.sign(b.pos[0]) * o;
          }
        }
      }
    }

    this.radiusTicks = this.yAxisScale
      .ticks(~~(this.dims.height / 50))
      .map(d => this.yScale(d));
  }

  getXValues(): any[] {
    const values = [];
    for (const results of this.results) {
      for (const d of results.series){
        if (!values.includes(d.name)) {
          values.push(d.name);
        }
      }
    }
    return values;
  }

  getXDomain(values = this.getXValues()): any[] {
    if (this.scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      return [min, max];
    } else if (this.scaleType === 'linear') {
      values = values.map(v => Number(v));
      const min = Math.min(...values);
      const max = Math.max(...values);
      return [min, max];
    }
    return values;
  }

  getYValues(): any[] {
    const domain = [];

    for (const results of this.results) {
      for (const d of results.series){
        if (domain.indexOf(d.value) < 0) {
          domain.push(d.value);
        }
        if (d.min !== undefined) {
          if (domain.indexOf(d.min) < 0) {
            domain.push(d.min);
          }
        }
        if (d.max !== undefined) {
          if (domain.indexOf(d.max) < 0) {
            domain.push(d.max);
          }
        }
      }
    }
    return domain;
  }

  getYDomain(domain = this.getYValues()): any[] {
    let min = Math.min(...domain);
    const max = Math.max(...domain);
    if (!this.autoScale) {
      min = Math.min(0, min);
    }

    return [min, max];
  }

  getSeriesDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getXScale(domain, width): any {
    let scale;

    if (this.scaleType === 'time') {
      scale = scaleTime()
        .range([0, width])
        .domain(domain);
    } else if (this.scaleType === 'linear') {
      scale = scaleLinear()
        .range([0, width])
        .domain(domain);

      if (this.roundDomains) {
        scale = scale.nice();
      }
    } else if (this.scaleType === 'ordinal') {
      const d = 2 * Math.PI / domain.length;
      scale = scalePoint()
        .range([0, width - d])
        .padding(0)
        .domain(domain);
    }

    return scale;
  }

  getYScale(domain, height): any {
    const scale = scaleLinear()
      .range([0, height])
      .domain(domain);

    return this.roundDomains ? scale.nice() : scale;
  }

  getScaleType(values): string {
    let date = true;
    let num = true;

    for (const value of values) {
      if (!isDate(value)) {
        date = false;
      }

      if (!isNumber(value)) {
        num = false;
      }
    }

    if (date) return 'time';
    if (num) return 'linear';
    return 'ordinal';
  }

  /* updateDomain(domain): void {
    this.filteredDomain = domain;
    this.xDomain = this.filteredDomain;
    this.xScale = this.getXScale(this.xDomain, this.dims.width);
  }

  updateHoveredVertical(item): void {
    this.hoveredVertical = item.value;
    this.deactivateAll();
  }

  @HostListener('mouseleave')
  hideCircles(): void {
    this.hoveredVertical = null;
    this.deactivateAll();
  } */

  onClick(data, series?): void {
    if (series) {
      data.series = series.name;
    }

    this.select.emit(data);
  }

  setColors(): void {
    const domain = (this.schemeType === 'ordinal') ?
      this.seriesDomain :
      this.yDomain;
    this.colors = new ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
  }

  getLegendOptions() {
    if (this.schemeType === 'ordinal') {
      return {
        scaleType: this.schemeType,
        colors: this.colors,
        domain: this.seriesDomain,
        title: this.legendTitle
      };
    }
    return {
      scaleType: this.schemeType,
      colors: this.colors.scale,
      domain: this.yDomain,
      title: undefined
    };
  }

  updateYAxisWidth({ width }): void {
    this.yAxisWidth = width;
    this.update();
  }

  updateXAxisHeight({ height }): void {
    this.xAxisHeight = height;
    this.update();
  }

  onActivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });
    if (idx > -1) {
      return;
    }
    this.activeEntries = this.showSeriesOnHover ? [ item, ...this.activeEntries ] : this.activeEntries;
    this.activate.emit({ value: item, entries: this.activeEntries });
  }

  onDeactivate(item) {
    const idx = this.activeEntries.findIndex(d => {
      return d.name === item.name && d.value === item.value;
    });

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: item, entries: this.activeEntries });
  }

  deactivateAll() {
    this.activeEntries = [...this.activeEntries];
    for (const entry of this.activeEntries) {
      this.deactivate.emit({ value: entry, entries: [] });
    }
    this.activeEntries = [];
  }
}
