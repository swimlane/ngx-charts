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
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';

@Component({
  selector: 'g[ngx-charts-calendar-pie-cell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <svg:g [attr.transform]="textTransform">
        <svg:text
          [attr.font-size]="textFontSize + 'px'" 
          class="calendar-date"
        >
          {{ data.name }}
        </svg:text>
      </svg:g>
      <svg:g [attr.transform]="pieTransform">
        <ng-content></ng-content>
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPieCellComponent implements OnChanges {
  @Input() x: number;
  @Input() y: number;
  @Input() cellWidth: number;
  @Input() cellHeight: number;
  @Input() pieWidth: number;
  @Input() pieHeight: number;
  @Input() data: any;

  @Output() select: EventEmitter<number> = new EventEmitter();
  @Output() activate: EventEmitter<number> = new EventEmitter();
  @Output() deactivate: EventEmitter<number> = new EventEmitter();

  element: HTMLElement;
  transform: string;
  startOpacity: number;
  gradientId: string;
  gradientUrl: string;
  gradientStops: Gradient[];
  pieTransform: string;
  textTransform: string;
  textFontSize: number;

  barOrientation = BarOrientation;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(): void {
    console.log(this.pieWidth, this.pieHeight)
    this.transform = `translate(${this.x} , ${this.y})`;
    this.pieTransform = `translate(${this.cellWidth / 2 - this.pieWidth / 2}, ${this.cellHeight / 2 - this.pieHeight / 2})`;
    this.textTransform = `translate(${this.cellWidth / 50}, ${this.cellHeight / 50})`;
    this.textFontSize = Math.min(this.cellWidth, this.cellHeight) * 0.2;
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
