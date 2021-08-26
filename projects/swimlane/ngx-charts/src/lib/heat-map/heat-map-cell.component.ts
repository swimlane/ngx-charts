import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  ElementRef,
  OnChanges,
  ChangeDetectionStrategy,
  HostListener
} from '@angular/core';
<<<<<<< HEAD
import { select as d3Select } from 'd3-selection';
import { transition as d3Transition } from 'd3-transition';
import { Gradient, BarOrientation } from '../common/types';
=======
import { select } from 'd3-selection';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';
>>>>>>> e4a39b4baad966ceb9aa83851694ffcb730db472
import { id } from '../utils/id';
d3Select.prototype.transition = d3Transition;

@Component({
  selector: 'g[ngx-charts-heat-map-cell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs *ngIf="gradient">
        <svg:g
          ngx-charts-svg-linear-gradient
          [orientation]="barOrientation.Vertical"
          [name]="gradientId"
          [stops]="gradientStops"
        />
      </defs>
      <svg:rect
        [attr.fill]="gradient ? gradientUrl : fill"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        (click)="onClick()"
      />
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class HeatMapCellComponent implements OnChanges {
  @Input() fill: string;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() data: number;
  @Input() gradient: boolean = false;
  @Input() animations: boolean = true;

  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() activate: EventEmitter<number> = new EventEmitter();
  @Output() deactivate: EventEmitter<number> = new EventEmitter();

  element: HTMLElement;
  transform: string;
  startOpacity: number;
  gradientId: string;
  gradientUrl: string;
  gradientStops: Gradient[];

  barOrientation = BarOrientation;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.transform = `translate(${this.x} , ${this.y})`;

    this.startOpacity = 0.3;
    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(#${this.gradientId})`;
    this.gradientStops = this.getGradientStops();

    if (this.animations) {
      this.loadAnimation();
    }
  }

  getGradientStops(): Gradient[] {
    return [
      {
        offset: 0,
        color: this.fill,
        opacity: this.startOpacity
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
      }
    ];
  }

  loadAnimation(): void {
    const node = d3Select(this.element).select('.cell');
    node.attr('opacity', 0);
    this.animateToCurrentForm();
  }

  animateToCurrentForm(): void {
    const node = d3Select(this.element).select('.cell');

    node.transition().duration(750).attr('opacity', 1);
  }

  onClick(): void {
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
}
