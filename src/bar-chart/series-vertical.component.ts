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
 import { formatLabel } from '../common/label.helper';

@Component({
  selector: 'g[seriesVertical]',
  template: `
    <svg:g bar *ngFor="let bar of bars; trackBy: trackBy"
      [@animationState]="'active'"
      [width]="bar.width"
      [height]="bar.height"
      [x]="bar.x"
      [y]="bar.y"
      [fill]="bar.color"
      [data]="bar.data"
      [orientation]="'vertical'"
      [roundEdges]="bar.roundEdges"
      [gradient]="gradient"
      [isActive]="isActive(bar.formattedLabel)"
      (clickHandler)="onClick($event)"
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
export class SeriesVerticalComponent implements OnChanges {

  @Input() dims;
  @Input() type = 'standard';
  @Input() series;
  @Input() xScale;
  @Input() yScale;
  @Input() colors;
  @Input() scaleType = 'ordinal';
  @Input() gradient: boolean;
  @Input() activeEntries: any[];

  @Output() clickHandler = new EventEmitter();

  bars: any;
  x: any;
  y: any;

  ngOnChanges(changes): void {
    this.update();
  }

  update(): void {
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
      const formattedLabel = formatLabel(label);
      const roundEdges = this.type === 'standard';

      let bar: any = {
        value,
        label,
        color: this.colors(label),
        roundEdges: roundEdges,
        data: d,
        width,
        formattedLabel,
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
      } else if (this.type === 'stacked') {
        let offset0 = d0;
        let offset1 = offset0 + value;
        d0 += value;

        bar.height = this.yScale(offset0) - this.yScale(offset1);
        bar.x = 0;
        bar.y = this.yScale(offset1);
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
        value = (offset1 - offset0).toFixed(2) + '%';
      }

      bar.tooltipText = `
        <span class="tooltip-label">${formattedLabel}</span>
        <span class="tooltip-val">${value.toLocaleString()}</span>
      `;

      return bar;
    });
  }

  isActive(entry): boolean {
    if(!this.activeEntries) return false;
    return this.activeEntries.indexOf(entry) > -1;
  }

  onClick(data): void {
    this.clickHandler.emit(data);
  }

  trackBy(index, bar): string {
    return bar.label;
  }

}
