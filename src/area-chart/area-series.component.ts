import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnInit,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { area, line } from 'd3-shape';

import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[ngx-charts-area-series]',
  template: `
    <svg:g ngx-charts-area
      class="area-series"
      [data]="data"
      [path]="path"
      [fill]="colors.getColor(data.name)"
      [stops]="gradientStops"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient || hasGradient"
      [animations]="animations"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
    <svg:path ngx-charts-bounding-curve *ngIf="enableStroke"
      [attr.class]="'ngx-charts-area-boundary area-boundary-' + index"
      [attr.d]="boundingPath"
      [attr.stroke]="strokeColor"
      fill="none"
      stroke-width="1"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaSeriesComponent implements OnInit, OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() baseValue: any = 'auto';
  @Input() colors;
  @Input() scaleType;
  @Input() stacked: boolean = false;
  @Input() normalized: boolean = false;
  @Input() gradient;
  @Input() curve;
  @Input() activeEntries: any[];
  @Input() animations: boolean = true;
  @Input() enableStroke: boolean = false;
  @Input() index: number;

  @Output() select = new EventEmitter();

  opacity: number;
  path: string;
  startingPath: string;
  boundingPath: string;

  hasGradient: boolean;
  gradientStops: any[];
  strokeColor: string;

  ngOnInit() {
    this.strokeColor = this.colors.getBoundaryColor(this.colors.getColor(this.data.name), -0.4);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateGradient();

    let currentArea;
    let startingArea;
    let upperBound;

    const xProperty = (d) => {
      const label = d.name;
      return this.xScale(label);
    };

    if (this.stacked || this.normalized) {
      currentArea = area<any>()
        .x(xProperty)
        .y0((d, i) => this.yScale(d.d0))
        .y1((d, i) => this.yScale(d.d1));

      startingArea = area<any>()
        .x(xProperty)
        .y0(d => this.yScale.range()[0])
        .y1(d => this.yScale.range()[0]);

      upperBound = line<any>()
        .x(xProperty)
        .y((d, i) => this.yScale(d.d1));
    } else {
      currentArea = area<any>()
        .x(xProperty)
        .y0(() => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue))
        .y1(d => this.yScale(d.value));

      startingArea = area<any>()
        .x(xProperty)
        .y0(d => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue))
        .y1(d => this.baseValue === 'auto' ? this.yScale.range()[0] : this.yScale(this.baseValue));

      upperBound = line<any>()
        .x(xProperty)
        .y(d => this.yScale(d.value));
    }

    currentArea.curve(this.curve);
    startingArea.curve(this.curve);
    upperBound.curve(this.curve);

    this.opacity = .8;

    let data = this.data.series;
    if (this.scaleType === 'linear') {
      data = sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      data = sortByTime(data, 'name');
    } else {
      data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
    }

    this.path = currentArea(data);
    this.startingPath = startingArea(data);
    this.boundingPath = upperBound(data);
  }

  updateGradient() {
    if (this.colors.scaleType === 'linear') {
      this.hasGradient = true;
      if (this.stacked || this.normalized) {
        const d0values = this.data.series.map(d => d.d0);
        const d1values = this.data.series.map(d => d.d1);
        const max = Math.max(...d1values);
        const min = Math.min(...d0values);
        this.gradientStops = this.colors.getLinearGradientStops(max, min);
      } else {
        const values = this.data.series.map(d => d.value);
        const max = Math.max(...values);
        this.gradientStops = this.colors.getLinearGradientStops(max);
      }
    } else {
      this.hasGradient = false;
      this.gradientStops = undefined;
    }
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

}
