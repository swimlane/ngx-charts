import {
  Component, Input, OnChanges, ChangeDetectionStrategy, SimpleChanges
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-svg-radial-gradient]',
  template: `
    <svg:radialGradient
      [id]="name"
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      gradientUnits="userSpaceOnUse">
      <svg:stop *ngFor="let stop of stops"
        [attr.offset]="stop.offset + '%'"
        [style.stop-color]="stop.color"
        [style.stop-opacity]="stop.opacity"
      />
    </svg:radialGradient>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SvgRadialGradientComponent implements OnChanges {

  @Input() color;
  @Input() name;
  @Input() startOpacity;
  @Input() endOpacity = 1;
  @Input() cx: number = 0;
  @Input() cy: number = 0;
  @Input() stops: any[];

  r: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.r = '30%';
    this.stops = this.stops || [{
      offset: 0,
      color: this.color,
      opacity: this.startOpacity
    }, {
      offset: 100,
      color: this.color,
      opacity: this.endOpacity
    }];
  }

}
