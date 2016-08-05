import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'g[svg-radial-gradient]',
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
  `
})
export class SvgRadialGradient implements OnInit {
  cx: number;
  cy: number;
  r: string;

  @Input() color;
  @Input() name;
  @Input() startOpacity;
  @Input() endOpacity = 1;

  ngOnInit() {
    this.cx = 0;
    this.cy = 0;
    this.r = "30%";
  }
}
