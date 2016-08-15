import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'g[svgLinearGradient]',
  template: `
    <svg:linearGradient
      [id]="name"
      [attr.x1]="x1"
      [attr.y1]="y1"
      [attr.x2]="x2"
      [attr.y2]="y2">
      <svg:stop
        [attr.offset]="'0%'"
        [style.stop-color]="color"
        [style.stop-opacity]="startOpacity"
      />
      <svg:stop
        [attr.offset]="'100%'"
        [style.stop-color]="color"
        [style.stop-opacity]="endOpacity"
      />
    </svg:linearGradient>
  `
})
export class SvgLinearGradient implements OnInit {
  @Input() orientation = 'vertical';
  @Input() color;
  @Input() name;
  @Input() startOpacity;
  @Input() endOpacity = 1;

  x1: any;
  x2: any;
  y1: any;
  y2: any;

  ngOnInit() {
    this.x1 = '0%';
    this.x2 = '0%';
    this.y1 = '0%';
    this.y2 = '0%';

    // unused variables
    // let startOpacity = this.startOpacity;
    // let endOpacity = this.endOpacity;

    if (this.orientation === 'horizontal') {
      this.x2 = '100%';
    } else if (this.orientation === 'vertical') {
      this.y1 = '100%';
    }

  }
}
