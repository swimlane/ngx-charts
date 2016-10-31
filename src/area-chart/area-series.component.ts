import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges
} from '@angular/core';
import d3 from '../d3';
import { sortLinear } from '../utils/sort';

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
  `
})
export class AreaSeries implements OnChanges {
  opacity: number;
  path: string;
  startingPath: string;

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

  ngOnChanges() {
    this.update();
  }

  update() {
    let area;
    let startingArea;

    let xProperty = (d) => {
      let label = d.name;

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
    if (this.scaleType === 'time' || this.scaleType === 'linear') {
      data = sortLinear(data, 'name');
    }

    this.path = area(data);
    this.startingPath = startingArea(data);
  }
}
