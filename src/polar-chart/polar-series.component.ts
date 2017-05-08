import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { area, radialLine } from 'd3-shape';

import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[ngx-charts-polar-series]',
  template: `
    <svg:g class="polar-charts-series">
      <defs>
        <svg:g ngx-charts-svg-linear-gradient *ngIf="hasGradient"
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g ngx-charts-line
        class="polar-series-path"
        [path]="path"
        [stroke]="hasGradient ? gradientUrl : seriesColor"
        [class.active]="active"
        [class.inactive]="inactive"
        [attr.fill-opacity]="rangeFillOpacity"
        [fill]="hasGradient ? gradientUrl : seriesColor"
      />
      <svg:g ngx-charts-circle
        *ngFor="let circle of circles"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circleRadius"
        [fill]="seriesColor"
        [style.opacity]="inactive ? 0.2 : 1"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        tooltipType="tooltip"
        [tooltipTitle]="tooltipText(circle)"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolarSeriesComponent implements OnChanges {

  @Input() name;
  @Input() data;
  @Input() xScale;  // Theta
  @Input() yScale;  // R
  @Input() colors;
  @Input() scaleType;
  @Input() curve: any;
  @Input() activeEntries: any[];
  @Input() rangeFillOpacity: number;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: (o: any) => string;

  path: string;
  circles: any[];
  circleRadius: number = 3;

  outerPath: string;
  areaPath: string;
  gradientId: string;
  gradientUrl: string;
  hasGradient: boolean;
  gradientStops: any[];
  areaGradientStops: any[];
  seriesColor: string;

  active: boolean;
  inactive: boolean;

  constructor(private location: LocationStrategy) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateGradients();

    const line = this.getLineGenerator();
    // const area = this.getAreaGenerator();
    // const range = this.getRangeGenerator();

    const data = this.sortData(this.data.series);

    this.seriesColor = this.colors.getColor(this.data.name);

    this.path = line(data) || '';
    // this.outerPath = range(data) || '';
    // this.areaPath = area(data) || '';

    this.circles = data.map(d => {
      const a = this.getAngle(d);
      const r = this.getRadius(d);

      return {
        cx: r * Math.sin(a),
        cy: -r * Math.cos(a),
        value: d.value,
        label: d.name
      };
    });

    this.active = this.isActive(this.data);
    this.inactive = this.isInactive(this.data);
    this.tooltipText = this.tooltipText || (c => this.defaultTooltipText(c));
  }

  getAngle(d) {
    const label = d.name;
    if (this.scaleType === 'time') {
      return this.xScale(label);
    } else if (this.scaleType === 'linear') {
      return this.xScale(Number(label));
    }
    return this.xScale(label);
  }

  getRadius(d) {
    return this.yScale(d.value);
  }

  getLineGenerator(): any {
    return radialLine<any>()
      .angle(d => this.getAngle(d))
      .radius(d => this.getRadius(d))
      .curve(this.curve);
  }

  /* getRangeGenerator(): any {
    return area<any>()
        .x(d => {
          const label = d.name;
          let value;
          if (this.scaleType === 'time') {
            value = this.xScale(label);
          } else if (this.scaleType === 'linear') {
            value = this.xScale(Number(label));
          } else {
            value = this.xScale(label);
          }
          return value;
        })
        .y0(d => this.yScale(d.min ? d.min : d.value))
        .y1(d => this.yScale(d.max ? d.max : d.value))
        .curve(this.curve);
  }

  getAreaGenerator(): any {
    const xProperty = (d) => {
      const label = d.name;
      return this.xScale(label);
    };

    return area<any>()
      .x(xProperty)
      .y0(() => this.yScale.range()[0])
      .y1(d => this.yScale(d.value))
      .curve(this.curve);
  } */

  sortData(data) {
    if (this.scaleType === 'linear') {
      return sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      return sortByTime(data, 'name');
    }
    return sortByDomain(data, 'name', 'asc', this.xScale.domain());
  }

  updateGradients() {
    if (this.colors.scaleType === 'linear') {
      this.hasGradient = true;

      const pageUrl = this.location instanceof PathLocationStrategy
        ? this.location.path()
        : '';

      this.gradientId = 'grad' + id().toString();
      this.gradientUrl = `url(${pageUrl}#${this.gradientId})`;
      const values = this.data.series.map(d => d.value);
      const max = Math.max(...values);
      const min = Math.min(...values);
      this.gradientStops = this.colors.getLinearGradientStops(max, min);
      this.areaGradientStops = this.colors.getLinearGradientStops(max);
    } else {
      this.hasGradient = false;
      this.gradientStops = undefined;
      this.areaGradientStops = undefined;
    }
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  isInactive(entry): boolean {
    if(!this.activeEntries || this.activeEntries.length === 0) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item === undefined;
  }

  defaultTooltipText({ label, value }): string {
    return `
      <span class="tooltip-label">${this.data.name} • ${label}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
  }
}
