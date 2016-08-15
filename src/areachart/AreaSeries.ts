import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Area } from './Area';
import d3 from '../d3';
import moment = require("moment");

@Component({
  selector: 'g[areaSeries]',
  directives: [Area],
  template: `
    <svg:g area
      [data]="data"
      [path]="path"
      [fill]="color"
      [startingPath]="startingPath"
      [opacity]="opacity"
    />
  `
})
export class AreaSeries implements OnInit {
  opacity: number;
  path: string;
  startingPath: string;

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() scaleType;
  @Input() stacked = false;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    let area;
    let startingArea;

    let xProperty = (d) => {
      let label = d.vals[0].label[0][0];
      if (this.scaleType === 'time') {
        return this.xScale(moment(label).toDate());
      } else {
        return this.xScale(label) + this.xScale.bandwidth() / 2;
      }
    };

    if (this.stacked === true) {
      area = d3.area()
        .x(xProperty)
        .y0(d => this.yScale(d.vals[0].d0))
        .y1(d => this.yScale(d.vals[0].d1));

      startingArea = d3.area()
        .x(xProperty)
        .y0(d => this.yScale.range()[0])
        .y1(d => this.yScale.range()[0]);
    } else {
      area = d3.area()
        .x(xProperty)
        .y0(() => this.yScale.range()[0])
        .y1(d => this.yScale(d.vals[0].value));

      startingArea = d3.area()
        .x(xProperty)
        .y0(d => this.yScale.range()[0])
        .y1(d => this.yScale.range()[0]);
    }


    if (this.scaleType === 'time') {
      this.data = this.data.filter(d => {
        return d.vals[0].label[0][0] !== 'No Value' && d.vals[0].label[0][0] !== 'Other';
      });
    }
    this.opacity = 1;
    this.path = area(this.data);
    this.startingPath = startingArea(this.data);
  }
}
