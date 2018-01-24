import {
  Component,
  Input,
  ElementRef,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-axis-label]',
  template: `
    <svg:text
      [attr.stroke-width]="strokeWidth"
      [attr.x]="x"
      [attr.y]="y"
      [attr.text-anchor]="textAnchor"
      [attr.transform]="transform">
      {{label}}
    </svg:text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AxisLabelComponent implements OnChanges {

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
  textHeight = 25;
  margin = 5;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
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
        this.y = - (this.offset + this.textHeight + this.margin);
        this.x = -this.height / 2;
        this.transform = 'rotate(270)';
        break;
      case 'right':
        this.y = this.offset + this.margin;
        this.x = -this.height / 2;
        this.transform = 'rotate(270)';
        break;
      default:
    }
  }

}
