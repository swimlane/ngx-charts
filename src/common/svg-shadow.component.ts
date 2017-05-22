import {
  Component,
  Input,
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-svg-shadow]',
  template: `
    <svg:filter
      [id]="name"
       [attr.height]="shadowDepth[0]">
      <svg:feGaussianBlur in="SourceAlpha" [attr.stdDeviation]="shadowDepth[1]" result="blur"></svg:feGaussianBlur>
      <svg:feOffset in="blur" [attr.dx]="shadowDepth[2]" [attr.dy]="shadowDepth[3]" result="offsetBlur"></svg:feOffset>
      <svg:feFlood [attr.flood-color]="shadowColor"></svg:feFlood>
      <svg:feComposite in2="offsetBlur" operator="in"></svg:feComposite>
      <svg:feMerge>
        <svg:feMergeNode></svg:feMergeNode>
        <svg:feMergeNode in="SourceGraphic"></svg:feMergeNode>
      </svg:feMerge>
      <svg:feComponentTransfer>
        <feFuncA type="linear" slope="1"></svg:feFuncA>
      </svg:feComponentTransfer>
    </svg:filter>
  `,
})
export class SvgShadowComponent {
  
  @Input() name;
  @Input() shadowDepth: any[];
  @Input() shadowColor: string;
}
