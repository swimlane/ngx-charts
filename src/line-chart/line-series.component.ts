import { Component, Input, OnInit, OnChanges } from '@angular/core';
import d3 from '../d3';
import moment from 'moment';

@Component({
  selector: 'g[lineSeries]',
  template: `
    <svg:g line
      [data]="data"
      [path]="path"
      [stroke]="color"
    />
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
      .y(d => this.yScale(d.value));

    let data = this.data.series;

    this.path = line(data) || '';
  }
}
