import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'g[seriesHorizontal]',
  template: `
    <svg:g bar *ngFor="let bar of bars"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [data]="bar.data"
      [orientation]="'horizontal'"
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
export class SeriesHorizontal implements OnInit, OnChanges {
  bars: any;
  x: any;
  y: any;

  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes) {
    this.update();
  }

  update() {
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
        tooltipText: `${label}: ${value}`
      };

      if (this.type === 'standard') {
        bar.width = this.xScale(value);
        bar.height = this.yScale.bandwidth();
        bar.x = 0;
        bar.y = this.yScale(label);
      } else if (this.type === 'stacked') {
        bar.width = this.xScale(value.d1) - this.xScale(value.d0);
        bar.height = this.yScale.bandwidth();
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
