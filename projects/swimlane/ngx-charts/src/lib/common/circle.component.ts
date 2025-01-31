import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';

@Component({
    selector: 'g[ngx-charts-circle]',
    template: `
    <svg:circle
      [attr.cx]="cx"
      [attr.cy]="cy"
      [attr.r]="r"
      [attr.fill]="fill"
      [attr.stroke]="stroke"
      [attr.opacity]="circleOpacity"
      [attr.class]="classNames"
      [attr.pointer-events]="pointerEvents"
    />
  `,
    changeDetection: ChangeDetectionStrategy.OnPush,
    standalone: false
})
export class CircleComponent implements OnChanges {
  @Input() cx: number;
  @Input() cy: number;
  @Input() r: number;
  @Input() fill: string;
  @Input() stroke: string;
  @Input() data: number | string;
  @Input() classNames: string[] | string;
  @Input() circleOpacity: number;
  @Input() pointerEvents: string;

  @Output() select: EventEmitter<number | string> = new EventEmitter();
  @Output() activate: EventEmitter<number | string> = new EventEmitter();
  @Output() deactivate: EventEmitter<number | string> = new EventEmitter();

  @HostListener('click')
  onClick() {
    this.select.emit(this.data);
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += 'circle';
  }
}
