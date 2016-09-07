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

      sw-popover
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
    let d0 = 0;
    let total;
    if (this.type === 'normalized') {
      total = this.series.map(d => d.value).reduce((sum, d) => sum + d);
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
        tooltipText: `${label}: ${value}`
      };

      bar.height = this.yScale.bandwidth();

      if (this.type === 'standard') {
        bar.width = this.xScale(value);
        bar.x = 0;
        bar.y = this.yScale(label);
      } else if (this.type === 'stacked') {
        let offset0 = d0;
        let offset1 = offset0 + value;
        d0 += value;

        bar.width = this.xScale(offset1) - this.xScale(offset0);
        bar.x = this.xScale(offset0);
        bar.y = 0;
      } else if (this.type === 'normalized') {
        let offset0 = d0;
        let offset1 = offset0 + value;
        d0 += value;

        if (total > 0) {
          offset0 = (offset0 * 100) / total;
          offset1 = (offset1 * 100) /total;
        } else {
          offset0 = 0;
          offset1 = 0;
        }

        bar.width = this.xScale(offset1) - this.xScale(offset0);
        bar.x = this.xScale(offset0);
        bar.y = 0;
      }

      return bar;
    });
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
