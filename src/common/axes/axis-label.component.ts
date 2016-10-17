import {
  Component,
  Input,
  ElementRef,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'g[axisLabel]',
  template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.text-anchor]="textAnchor"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform">
      {{label}}
    </svg:text>
  `
})
export class AxisLabel implements OnChanges {
  @Input() orient;
  @Input() label;
  @Input() offset;
  @Input() width;
  @Input() height;

  x: any;
  y: any;
  transform: any;
  strokeWidth: any;
  textAnchor: any;
  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.strokeWidth = '0.01';
    this.textAnchor = 'middle';
    this.transform = '';

    switch (this.orient) {
      case 'top':
        this.y = this.offset;
        this.x = this.width / 2;
        break;
      case 'bottom':
        this.y = this.offset;
        this.x = this.width / 2;
        break;
      case 'left':
        this.y = -this.offset;
        this.x = -this.height / 2;
        this.transform = "rotate(270)";
        break;
      case 'right':
        this.y = this.offset;
        this.x = -this.height / 2;
        this.transform = "rotate(270)";
        break;
    }
  }

}
