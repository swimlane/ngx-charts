import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Bar } from './Bar.js';
import { Popover } from 'common/components/popover/PopoverComponent.js';

@Component({
  selector: 'g[series-vertical]',
  directives: [Bar, Popover],
  template: `
    <svg:g bar *ngFor="let bar of bars"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="colors(bar.label)"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      (clickHandler)="click($event)"
      sw-popover
      [popoverSpacing]="15"
      [popoverText]="bar.tooltipText"
      [popoverGroup]="'charts'">
    </svg:g>
  `
})
export class SeriesVertical {
  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType = 'ordinal';

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  update(){
    let width;
    if (this.series.length){
      if (this.scaleType === 'time'){
        let count = this.series.array[0].vals[0].label[0].length;
        let firstDate = this.series.array[0].vals[0].label[0][count - 1];
        let secondDate = moment(firstDate).add(1, 'hours');
        width = Math.abs(this.xScale(secondDate) - this.xScale(firstDate))*0.8;
      } else  {
        width = this.xScale.rangeBand();
      }
    }

    this.bars = this.series.array.map((d, index) => {
      let value = d.vals[0];
      let count = value.label[0].length;
      let label = value.label[0][count - 1];
      let formattedLabel = value.formattedLabel[count-1];
      let roundEdges = this.type === 'standard';

      let bar = {
        value: value,
        label: formattedLabel,
        color: this.colors(formattedLabel),
        roundEdges: roundEdges,
        data: d.vals[0],
        width: width,
        tooltipText: `${label}: ${value.value}`
      };

      if (this.type === 'standard') {
        bar.height = this.dims.height - this.yScale(value.value);
        bar.x = this.xScale(label);
        bar.y = this.yScale(value.value);
      } else if (this.type === 'stacked') {
        bar.height = this.yScale(value.d0) - this.yScale(value.d1),
        bar.x = 0;
        bar.y = this.yScale(value.d1);
      }

      return bar;
    });
  }

  click(data){
    this.clickHandler.emit(data);
  }

}
