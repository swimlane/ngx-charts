import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import d3 from '../d3';
import * as moment from 'moment';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[lineSeries]',
  template: `
    <svg:g area
      class="line-highlight"
      [data]="data"
      [path]="areaPath"
      [fill]="color"
      [opacity]="0.25"
      [startOpacity]="0"
      [gradient]="true"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
    <svg:g line
      class="line-series"
      [data]="data"
      [path]="path"
      [stroke]="color"
      [class.active]="isActive(data)"
      [class.inactive]="isInactive(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LineSeriesComponent implements OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() scaleType;
  @Input() curve: string;
  @Input() activeEntries: any[];

  path: string;
  areaPath: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
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

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    return this.activeEntries.indexOf(entry.name) > -1;
  }

  isInactive(entry): boolean {
    return this.activeEntries &&
      this.activeEntries.length !== 0 &&
      this.activeEntries.indexOf(entry.name) === -1;
  }

}
