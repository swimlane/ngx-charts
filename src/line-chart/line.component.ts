import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  trigger,
  style,
  transition,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:path
      [@animationState]="'active'"
      class="line"
      [attr.d]="path"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      stroke-width="1.5px"
      [attr.fill-opacity]="fillOpacity"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition('void => *', [
        style({
          strokeDasharray: 2000,
          strokeDashoffset: 2000,
        }),
        animate(1000, style({
          strokeDashoffset: 0
        }))
      ])
    ])
  ]
})
export class LineComponent {

  @Input() path;
  @Input() stroke;
  @Input() data;
  @Input() fill;
  @Input() fillOpacity = 0.0;

  @Output() select = new EventEmitter();

  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

}
