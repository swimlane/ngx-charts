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
      [attr.data-series]="series"
      [attr.data-label]="label"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CircleComponent implements OnChanges {
  @Input() cx;
  @Input() cy;
  @Input() r;
  @Input() fill;
  @Input() stroke;
  @Input() data;
  @Input() series;
  @Input() label;
  @Input() classNames;
  @Input() circleOpacity;
  @Input() pointerEvents;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() drag = new EventEmitter();

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

  @HostListener('mousedown', ['$event'])
  startDrag(event: MouseEvent) {
    this.drag.emit({
      x:event.clientX,
      y:event.clientY,
      series:this.series,
      label:this.label
    })
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.classNames = Array.isArray(this.classNames) ? this.classNames.join(' ') : '';
    this.classNames += 'circle';
  }
}
