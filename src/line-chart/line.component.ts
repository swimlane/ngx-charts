import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ChangeDetectionStrategy
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

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
  @Input() fill: string = 'none';

  @Output() select = new EventEmitter();

  constructor(private element: ElementRef) {
  }
}
