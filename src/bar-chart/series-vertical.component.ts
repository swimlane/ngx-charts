import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  trigger,
  style,
  transition,
  animate,
  ChangeDetectionStrategy
 } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'g[seriesVertical]',
  template: `
    <svg:g bar *ngFor="let bar of bars; trackBy:trackBy"
      [@animationState]="'active'"
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
      swui-tooltip
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="bar.tooltipText">
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('* => void', [
        style({
          opacity: 1,
          transform: '*',
        }),
        animate(500, style({opacity: 0, transform: 'scale(0)'}))
      ])
    ])
  ]
})
export class SeriesVertical implements OnChanges {
  bars: any;
  x: any;
  y: any;

  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType = 'ordinal';
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

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

    let d0 = 0;
    let total;
    if (this.type === 'normalized') {
      total = this.series.map(d => d.value).reduce((sum, d) => { return sum + d; }, 0);
    }

    this.bars = this.series.map((d, index) => {
      let value = d.value;
      let label = d.name;
      let tooltipLabel = label;
      if (tooltipLabel.constructor.name === 'Date') {
        tooltipLabel = tooltipLabel.toLocaleDateString();
      }
      let roundEdges = this.type === 'standard';

      let bar: any = {
        value: value,
        label: label,
        color: this.colors(label),
        roundEdges: roundEdges,
        data: d,
        width: width,
        height: 0,
        x: 0,
        y: 0
      };

      if (this.type === 'standard') {
        bar.height = Math.abs(this.yScale(value) - this.yScale(0));
        bar.x = this.xScale(label);
        if (value < 0) {
          bar.y = this.yScale(0);
        } else {
          bar.y = this.yScale(value);
        }
        bar.tooltipText = `${tooltipLabel}: ${value.toLocaleString()}`;
      } else if (this.type === 'stacked') {
        let offset0 = d0;
        let offset1 = offset0 + value;
        d0 += value;

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = 0;
        bar.y = this.yScale(offset1);
        bar.tooltipText = `${tooltipLabel}: ${value.toLocaleString()}`;
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

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = 0;
        bar.y = this.yScale(offset1);
        let percentage = (offset1 - offset0).toFixed(2) + '%';
        bar.tooltipText = `${tooltipLabel}: ${percentage.toLocaleString()}`;
      }

      return bar;
    });
  }

  trackBy(index, bar) {
    return bar.label;
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
