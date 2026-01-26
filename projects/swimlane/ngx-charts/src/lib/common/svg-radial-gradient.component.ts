import { Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { Gradient } from './types/gradient.interface';

@Component({
  selector: 'g[ngx-charts-svg-radial-gradient]',
  template: `
    <svg:radialGradient [id]="name" [attr.cx]="cx" [attr.cy]="cy" [attr.r]="r" gradientUnits="userSpaceOnUse">
      @for (stop of stops; track stop) {
        <svg:stop
          [attr.offset]="stop.offset + '%'"
          [style.stop-color]="stop.color"
          [style.stop-opacity]="stop.opacity"
        />
      }
    </svg:radialGradient>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class SvgRadialGradientComponent implements OnChanges {
  @Input() color: string;
  @Input() name: string;
  @Input() startOpacity: number;
  @Input() endOpacity = 1;
  @Input() cx: number = 0;
  @Input() cy: number = 0;

  @Input()
  get stops(): Gradient[] {
    return this.stopsInput || this.stopsDefault;
  }

  set stops(value: Gradient[]) {
    this.stopsInput = value;
  }

  r: string;

  private stopsInput: Gradient[];
  private stopsDefault: Gradient[];

  ngOnChanges(changes: SimpleChanges): void {
    this.r = '30%';
    if ('color' in changes || 'startOpacity' in changes || 'endOpacity' in changes) {
      this.stopsDefault = [
        {
          offset: 0,
          color: this.color,
          opacity: this.startOpacity
        },
        {
          offset: 100,
          color: this.color,
          opacity: this.endOpacity
        }
      ];
    }
  }
}
