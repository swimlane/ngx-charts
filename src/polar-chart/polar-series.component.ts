import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { lineRadial } from 'd3-shape';

import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[ngx-charts-polar-series]',
  template: `
    <svg:g class="polar-charts-series">
      <defs>
        <svg:g ngx-charts-svg-radial-gradient *ngIf="hasGradient"
          orientation="vertical"
          [color]="seriesColor"
          [name]="gradientId"
          [startOpacity]="0.25"
          [endOpacity]="1"
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
        [animations]="animations"
      />
      <svg:g ngx-charts-circle
        *ngFor="let circle of circles"
        class="circle"
        [cx]="circle.cx"
        [cy]="circle.cy"
        [r]="circleRadius"
        [fill]="circle.color"
        [style.opacity]="inactive ? 0.2 : 1"
        ngx-tooltip
        [tooltipDisabled]="tooltipDisabled"
        [tooltipPlacement]="'top'"
        tooltipType="tooltip"
        [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(circle)"
        [tooltipTemplate]="tooltipTemplate"
        [tooltipContext]="circle.data">
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PolarSeriesComponent implements OnChanges {
  @Input() name;
  @Input() data;
  @Input() xScale; // Theta
  @Input() yScale; // R
  @Input() colors;
  @Input() scaleType;
  @Input() curve: any;
  @Input() activeEntries: any[];
  @Input() rangeFillOpacity: number;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: (o: any) => string;
  @Input() gradient: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

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

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateGradients();

    const line = this.getLineGenerator();

    const data = this.sortData(this.data.series);

    const seriesName = this.data.name;
    const linearScaleType = this.colors.scaleType === 'linear';
    const min = this.yScale.domain()[0];
    this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);

    this.path = line(data) || '';

    this.circles = data.map(d => {
      const a = this.getAngle(d);
      const r = this.getRadius(d);
      const value = d.value;

      const color = this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);

      const cData = {
        series: seriesName,
        value,
        name: d.name
      };

      return {
        data: cData,
        cx: r * Math.sin(a),
        cy: -r * Math.cos(a),
        value,
        color,
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
    return lineRadial<any>()
      .angle(d => this.getAngle(d))
      .radius(d => this.getRadius(d))
      .curve(this.curve);
  }

  sortData(data) {
    if (this.scaleType === 'linear') {
      return sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      return sortByTime(data, 'name');
    }
    return sortByDomain(data, 'name', 'asc', this.xScale.domain());
  }

  isActive(entry): boolean {
    if (!this.activeEntries) return false;
    const item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  isInactive(entry): boolean {
    if (!this.activeEntries || this.activeEntries.length === 0) return false;
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

  updateGradients() {
    this.hasGradient = this.gradient || this.colors.scaleType === 'linear';

    if (!this.hasGradient) {
      return;
    }

    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(#${this.gradientId})`;

    if (this.colors.scaleType === 'linear') {
      const values = this.data.series.map(d => d.value);
      const max = Math.max(...values);
      const min = Math.min(...values);
      this.gradientStops = this.colors.getLinearGradientStops(max, min);
    } else {
      this.gradientStops = undefined;
    }
  }
}
