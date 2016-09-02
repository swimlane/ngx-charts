import { Component, Input, OnInit, OnChanges } from '@angular/core';
import d3 from '../d3';
import moment = require("moment");

@Component({
  selector: 'g[lineSeries]',
  template: `
    <svg:g line
      [data]="data"
      [path]="path"
      [stroke]="color"
    />

    <text class="color">{{color}}</text>
  `
})
export class LineSeries implements OnInit, OnChanges {
  path: string;

  @Input() data;
  @Input() xScale;
  @Input() yScale;
  @Input() color;
  @Input() scaleType;

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    let line = d3.line()
      .x(d => {
        let label = d.name;
        if (this.scaleType === 'time') {
          return this.xScale(moment(label).toDate());
        } else {
          return this.xScale(label);
        }
      })
      .y(d => this.yScale(d.value));

    let data = this.data.series;

    this.path = line(data) || '';
  }
}
