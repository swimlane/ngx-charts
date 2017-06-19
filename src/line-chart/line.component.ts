import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';
import { select } from 'd3-selection';

@Component({
  selector: 'g[ngx-charts-line]',
  template: `
    <svg:path
      [@animationState]="'active'"
      class="line"
      [attr.d]="initialPath"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      stroke-width="1.5px"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('animationState', [
      transition(':enter', [
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
  @Input() fill: string = 'none';

  @Output() select = new EventEmitter();

  initialized: boolean = false;
  initialPath: string;

  constructor(private element: ElementRef) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.initialized = true;
      this.initialPath = this.path;
    } else {
      this.animateToCurrentForm();
    }
  }

  animateToCurrentForm(): void {
    const node = select(this.element.nativeElement).select('.line');

    node
      .transition().duration(750)
      .attr('d', this.path);
  }
}
