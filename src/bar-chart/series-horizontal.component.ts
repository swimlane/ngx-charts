import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  trigger,
  style,
  transition,
  animate, NgZone, ElementRef
} from '@angular/core';

@Component({
  selector: 'g[seriesHorizontal]',
  template: `
    <svg:g bar *ngFor="let bar of bars; trackBy:trackBy"
      [@animationState]="'active'"
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

      swui-tooltip
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="bar.tooltipText">
    </svg:g>
  `,
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
export class SeriesHorizontal implements OnChanges {
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

  trackBy(index, bar) {
    return bar.label;
  }

  click(data) {
    this.clickHandler.emit(data);
  }
}
