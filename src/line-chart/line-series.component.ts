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

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let line = d3.line()
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

    let data = this.data.series;
    if (this.scaleType === 'linear') {
      data = sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      data = sortByTime(data, 'name');
    } else {
      data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
    }

    this.path = line(data) || '';
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    return this.activeEntries.indexOf(entry.name) > -1;
  }

  isInactive(entry): boolean {
    return this.activeEntries && 
      this.activeEntries.length &&
      this.activeEntries.indexOf(entry.name) === -1;
  }
  
}
