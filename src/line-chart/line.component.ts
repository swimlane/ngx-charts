import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  trigger,
  style,
  transition,
  animate,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[line]',
  template: `
    <svg:path
      [@animationState]="'active'"
      class="line"
      [attr.d]="path"
      fill="none"
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
export class LineComponent implements OnChanges {

  @Input() path;
  @Input() stroke;
  @Input() data;

  @Output() clickHandler = new EventEmitter();

  element: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(): void {
    // add update animation
  }

}
