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
      <svg:stop
        offset="0%"
        [style.stop-color]="color"
        [style.stop-opacity]="startOpacity"
      />
      <svg:stop
        offset="100%"
        [style.stop-color]="color"
        [style.stop-opacity]="endOpacity"
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

  r: string;

  ngOnChanges(changes: SimpleChanges): void {
    this.r = '30%';
  }

}
