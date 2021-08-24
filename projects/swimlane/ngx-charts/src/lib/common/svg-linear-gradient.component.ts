import { Component, Input, OnChanges, SimpleChanges, ChangeDetectionStrategy } from '@angular/core';
import { BarOrientation } from './types/bar-orientation.enum';
import { Gradient } from './types/gradient.interface';

@Component({
  selector: 'g[ngx-charts-svg-linear-gradient]',
  template: `
    <svg:linearGradient [id]="name" [attr.x1]="x1" [attr.y1]="y1" [attr.x2]="x2" [attr.y2]="y2">
      <svg:stop
        *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:linearGradient>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgLinearGradientComponent implements OnChanges {
  @Input() orientation = BarOrientation.Vertical;
  @Input() name: string;
  @Input() stops: Gradient[];

  x1: string;
  x2: string;
  y1: string;
  y2: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.x1 = '0%';
    this.x2 = '0%';
    this.y1 = '0%';
    this.y2 = '0%';

    if (this.orientation === BarOrientation.Horizontal) {
      this.x2 = '100%';
    } else if (this.orientation === BarOrientation.Vertical) {
      this.y1 = '100%';
    }
  }
}
