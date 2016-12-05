import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import d3 from '../d3';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';

@Component({
  selector: 'g[areaSeries]',
  template: `
    <svg:g area
      [data]="data"
      [path]="path"
      [fill]="color"
      [startingPath]="startingPath"
      [opacity]="opacity"
      [gradient]="gradient"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AreaSeriesComponent implements OnChanges {

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() scaleType;
  @Input() stacked = false;
  @Input() normalized = false;
  @Input() gradient;
  @Input() curve;

  @Output() clickHandler = new EventEmitter();

  opacity: number;
  path: string;
  startingPath: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    let area;
    let startingArea;

    let xProperty = (d) => {
      const label = d.name;
      return this.xScale(label);
    };

    if (this.stacked || this.normalized) {
      area = d3.area()
        .x(xProperty)
        .y0((d, i) => this.yScale(d.d0))
        .y1((d, i) => this.yScale(d.d1));

      startingArea = d3.area()
        .x(xProperty)
        .y0(d => this.yScale.range()[0])
        .y1(d => this.yScale.range()[0]);
    } else {
      area = d3.area()
        .x(xProperty)
        .y0(() => this.yScale.range()[0])
        .y1(d => this.yScale(d.value));

      startingArea = d3.area()
        .x(xProperty)
        .y0(d => this.yScale.range()[0])
        .y1(d => this.yScale.range()[0]);
    }

    area.curve(this.curve);
    startingArea.curve(this.curve);

    this.opacity = 1;

    let data = this.data.series;
    if (this.scaleType === 'linear') {
      data = sortLinear(data, 'name');
    } else if (this.scaleType === 'time') {
      data = sortByTime(data, 'name');
    } else {
      data = sortByDomain(data, 'name', 'asc', this.xScale.domain());
    }

    this.path = area(data);
    this.startingPath = startingArea(data);
  }
}
