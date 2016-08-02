import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { Bar } from './Bar';
import { Popover } from '../common/popover/PopoverComponent';

@Component({
  selector: 'g[series-horizontal]',
  directives: [Bar, Popover],
  template: `
    <svg:g bar *ngFor="let bar of bars"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="colors(bar.label)"
      [data]="bar.data"
      [orientation]="'horizontal'"
      [roundEdges]="bar.roundEdges"
      (clickHandler)="click($event)"
      sw-popover
      [popoverSpacing]="15"
      [popoverText]="bar.tooltipText"
      [popoverGroup]="'charts'">
    </svg:g>
  `
})
export class SeriesHorizontal implements OnInit {
  bars: any[];

  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  update() {
    this.bars = this.series.array.map((d, index) => {
      let value = d.vals[0];
      let count = value.label[0].length;
      let label = value.label[0][count - 1];
      let formattedLabel = value.formattedLabel[count - 1];
      let roundEdges = this.type === 'standard';

      let bar: any = {
        value: value,
        label: formattedLabel,
        color: this.colors(formattedLabel),
        roundEdges: roundEdges,
        data: d.vals[0],
        tooltipText: `${label}: ${value.value}`
      };

      if (this.type === 'standard') {
        bar.width = this.xScale(value.value);
        bar.height = this.yScale.rangeBand();
        bar.x = 0;
        bar.y = this.yScale(label);
      } else if (this.type === 'stacked') {
        bar.width = this.xScale(value.d1) - this.xScale(value.d0);
        bar.height = this.yScale.rangeBand();
        bar.x = this.xScale(value.d0);
        bar.y = 0;
      }

      return bar;
    });
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
