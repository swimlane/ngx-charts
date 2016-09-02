import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
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
export class AreaSeries implements OnInit, OnChanges {
  opacity: number;
  path: string;
  startingPath: string;

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() scaleType;
  @Input() stacked = false;
  @Input() gradient;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    let area;
    let startingArea;

    let xProperty = (d) => {
      let label = d.name
      if (this.scaleType === 'time') {
        return this.xScale(moment(label).toDate());
      } else {
        return this.xScale(label);
      }
    };

    if (this.stacked === true) {
      area = d3.area()
        .x(xProperty)
        .y0(d => this.yScale(d.d0))
        .y1(d => this.yScale(d.d1));

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

    // TODO: filter data before coming here
    // if (this.scaleType === 'time') {
    //   this.data = this.data.filter(d => {
    //     return d.vals[0].label[0][0] !== 'No Value' && d.vals[0].label[0][0] !== 'Other';
    //   });
    // }

    this.opacity = 1;
    this.path = area(this.data.series);
    this.startingPath = startingArea(this.data.series);
  }
}
