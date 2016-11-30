import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[svgRadialGradient]',
  template: `
    <svg:radialGradient
      [id]="name"
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      gradient-units="userSpaceOnUse">
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

  ngOnChanges() {
    this.cx = 0;
    this.cy = 0;
    this.r = "30%";
  }

  cx: number;
  cy: number;
  r: string;
  
}
