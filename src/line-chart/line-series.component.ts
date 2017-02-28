import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import d3 from '../d3';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[ngx-charts-line-series]',
  template: `
    <svg:g>
      <defs>
        <svg:g ngx-charts-svg-linear-gradient ng-if="hasGradient"
          [color]="colors.getColor(data.name)"
          orientation="vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:g ngx-charts-area
        class="line-highlight"
        [data]="data"
        [path]="areaPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [opacity]="0.25"
        [startOpacity]="0"
        [gradient]="true"
        [stops]="areaGradientStops"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
      />
      <svg:g ngx-charts-line
        class="line-series"
        [data]="data"
        [path]="path"
        [stroke]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
      />
     <svg:g ngx-charts-area
        class="line-series-range"
        [data]="data"
        [path]="outerPath"
        [fill]="hasGradient ? gradientUrl : colors.getColor(data.name)"
        [class.active]="isActive(data)"
        [class.inactive]="isInactive(data)"
        [opacity]="rangeFillOpacity"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent implements OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType;
  @Input() curve: string;
  @Input() activeEntries: any[];
  @Input() rangeFillOpacity: number;

  path: string;
  outerPath: string;
  areaPath: string;
  gradientId: string;
  gradientUrl: string;
  hasGradient: boolean;
  gradientStops: any[];
  areaGradientStops: any[];

  constructor(private location: LocationStrategy) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateGradients();

    const line = this.getLineGenerator();
    const area = this.getAreaGenerator();
    const range = this.getRangeGenerator();

    const data = this.sortData(this.data.series);

    this.path = line(data) || '';
    this.outerPath = range(data) || '';
    this.areaPath = area(data) || '';
  }

  getLineGenerator() {
    return d3.line()
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
      .y(d => this.yScale(d.value))
      .curve(this.curve);
  }

  getRangeGenerator() {
    return d3.area()
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

  getAreaGenerator() {
    const xProperty = (d) => {
      const label = d.name;
      return this.xScale(label);
    };

    return d3.area()
      .x(xProperty)
      .y0(() => this.yScale.range()[0])
      .y1(d => this.yScale(d.value))
      .curve(this.curve);
  }

  sortData(data) {
    if (this.scaleType === 'linear') {
      data = sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      data = sortByTime(data, 'name');
    } else {
      data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
    }

    return data;
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

}
