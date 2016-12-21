import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import d3 from '../d3';
import * as moment from 'moment';
import { id } from "../utils/id";
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

  path: string;
  areaPath: string;
  gradientId: string;
  gradientUrl: string;
  hasGradient: boolean;
  gradientStops: any[];
  areaGradientStops: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {    
    this.updateGradients();

    let line = this.getLineGenerator();
    let area = this.getAreaGenerator();

    let data = this.sortData(this.data.series);

    this.path = line(data) || '';
    this.areaPath = area(data) || '';
  }

  getLineGenerator() {
    return d3.line()
      .x(d => {
        let label = d.name;
        let value;
        if (this.scaleType === 'time') {
          value = this.xScale(moment(label).toDate());
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

  getAreaGenerator() {
    let xProperty = (d) => {
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
      let pageUrl = window.location.href;      
      this.gradientId = 'grad' + id().toString();
      this.gradientUrl = `url(${pageUrl}#${this.gradientId})`;
      let values = this.data.series.map(d => d.value);
      let max = Math.max(...values);
      let min = Math.min(...values);
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
    let item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item !== undefined;
  }

  isInactive(entry): boolean {
    if(!this.activeEntries || this.activeEntries.length === 0) return false;
    let item = this.activeEntries.find(d => {
      return entry.name === d.name;
    });
    return item === undefined;
  }

}
