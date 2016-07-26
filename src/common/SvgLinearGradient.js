import { Component, Input } from '@angular/core';

@Component({
  selector: 'g[svg-linear-gradient]',
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
export class SvgLinearGradient {
  @Input() orientation = 'vertical';
  @Input() color;
  @Input() name;
  @Input() startOpacity;
  @Input() endOpacity = 1;

  ngOnInit() {
    this.x1 = '0%';
    this.x2 = '0%';
    this.y1 = '0%';
    this.y2 = '0%';

    let startOpacity = this.startOpacity;
    let endOpacity = this.endOpacity;

    if (this.orientation === 'horizontal'){
      this.x2 = '100%';
    } else if (this.orientation === 'vertical'){
      this.y1 = '100%';
    }

  }
}
