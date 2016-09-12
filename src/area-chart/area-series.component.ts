import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import d3 from '../d3';
import moment = require("moment");

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

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }
  
  update() {
    let area;
    let startingArea;

    let xProperty = (d) => {
      let label = d.name;
      if (this.scaleType === 'time') {
        return this.xScale(moment(label).toDate());
      } else {
        return this.xScale(label);
      }
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

    this.opacity = 1;
    this.path = area(this.data.series);

    this.startingPath = startingArea(this.data.series);
  }
}
