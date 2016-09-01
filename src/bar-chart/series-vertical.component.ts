import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'g[seriesVertical]',
  template: `
    <svg:g bar *ngFor="let bar of bars"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      (clickHandler)="click($event)"
      [gradient]="gradient"

      swPopover
      [popoverSpacing]="15"
      [popoverText]="bar.tooltipText"
      [popoverGroup]="'charts'">
    </svg:g>
  `
})
export class SeriesVertical implements OnInit, OnChanges {
  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType = 'ordinal';
  @Input() gradient: boolean;

  bars: any;
  x: any;
  y: any;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes) {
    this.update();
  }

  update() {
    let width;
    if (this.series.length) {
      if (this.scaleType === 'time') {
        let count = this.series.array[0].vals[0].label[0].length;
        let firstDate = this.series.array[0].vals[0].label[0][count - 1];
        let secondDate = moment(firstDate).add(1, 'hours');
        width = Math.abs(this.xScale(secondDate) - this.xScale(firstDate)) * 0.8;
      } else {
        width = this.xScale.bandwidth();
      }
    }

    this.bars = this.series.map((d, index) => {
      let value = d.value;
      let label = d.name;
      let roundEdges = this.type === 'standard';

      let bar: any = {
        value: value,
        label: label,
        color: this.colors(label),
        roundEdges: roundEdges,
        data: d,
        width: width,
        tooltipText: `${label}: ${value}`,
        height: 0,
        x: 0,
        y: 0
      };

      if (this.type === 'standard') {
        bar.height = this.dims.height - this.yScale(value);
        bar.x = this.xScale(label);
        bar.y = this.yScale(value);
      } else if (this.type === 'stacked') {
        bar.height = this.yScale(value.d0) - this.yScale(value.d1);
        bar.x = 0;
        bar.y = this.yScale(value.d1);
      }

      return bar;
    });
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
