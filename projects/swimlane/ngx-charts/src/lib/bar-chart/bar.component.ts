import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  HostListener,
  Input,
  OnChanges,
  Output,
  SimpleChanges
} from '@angular/core';
import { select } from 'd3-selection';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { Gradient } from '../common/types/gradient.interface';
import { animate, style, transition, trigger } from '@angular/animations';

@Component({
  selector: 'g[ngx-charts-bar]',
  template: `
    <svg:defs *ngIf="hasGradient" @toggleAniamtion>
      <svg:g ngx-charts-svg-linear-gradient [orientation]="orientation" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      role="img"
      tabIndex="-1"
      @toggleAniamtion
      (@toggleAniamtion.start)="onLeaveAnimation($event)"
      [class.active]="isActive"
      [class.hidden]="hideBar"
      [attr.d]="path"
      [attr.aria-label]="ariaLabel"
      [attr.fill]="hasGradient ? gradientFill : fill"
      (click)="select.emit(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: [
    trigger('toggleAniamtion', [
      transition(':enter', [
        style({
          opacity: 0
        }),
        animate('500ms 600ms ease-in', style({ opacity: 1 }))
      ]),
      transition(':leave', [
        style({
          opacity: 1
        }),
        animate('500ms', style({ opacity: 0 }))
      ])
    ])
  ]
})
export class BarComponent implements OnChanges {
  @Input() fill: string;
  @Input() data: DataItem;
  @Input() width: number;
  @Input() height: number;
  @Input() x: number;
  @Input() y: number;
  @Input() orientation: BarOrientation;
  @Input() roundEdges: boolean = true;
  @Input() gradient: boolean = false;
  @Input() offset: number = 0;
  @Input() isActive: boolean = false;
  @Input() stops: Gradient[];
  @Input() animations: boolean = true;
  @Input() ariaLabel: string;
  @Input() noBarWhenZero: boolean = true;

  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate: EventEmitter<DataItem> = new EventEmitter();
  @Output() deactivate: EventEmitter<DataItem> = new EventEmitter();

  element: HTMLElement;
  path: string;
  gradientId: string;
  gradientFill: string;
  gradientStops: Gradient[];
  hasGradient: boolean = false;
  hideBar: boolean = false;
  pathAnimationDebounceTimer = null;

  constructor(private cdf: ChangeDetectorRef, element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (
      changes.roundEdges ||
      /* fix: appears to render animation misaligned */
      changes.x ||
      changes.y ||
      changes.height ||
      changes.width
    ) {
      this.loadAnimation();
    } else this.update();
  }

  update(): void {
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(#${this.gradientId})`;

    if (this.gradient || this.stops) {
      this.gradientStops = this.getGradient();
      this.hasGradient = true;
    } else {
      this.hasGradient = false;
    }

    this.checkToHideBar();
    if (this.pathAnimationDebounceTimer) {
      clearTimeout(this.pathAnimationDebounceTimer);
    }
    this.pathAnimationDebounceTimer = setTimeout(() => {
      this.updatePathEl();
      this.pathAnimationDebounceTimer = null;
    }, 100);
  }

  loadAnimation(): void {
    this.path = this.getStartingPath();
    this.cdf.markForCheck();
    this.update();
  }

  onLeaveAnimation(event) {
    if (event.fromState && event.toState !== 'void') return;
    this.loadBackOffAnimation();
  }

  loadBackOffAnimation(): void {
    const node = select(this.element).select('.bar');
    node.transition().duration(500).attr('d', this.getStartingPath());
  }

  updatePathEl(): void {
    const node = select(this.element).select('.bar');
    const path = this.getPath();
    if (this.animations) {
      setTimeout(() => {
        node.transition().duration(500).attr('d', path);
      }, 500);
    } else {
      node.attr('d', path);
    }
  }

  getGradient(): Gradient[] {
    if (this.stops) {
      return this.stops;
    }

    return [
      {
        offset: 0,
        color: this.fill,
        opacity: this.getStartOpacity()
      },
      {
        offset: 100,
        color: this.fill,
        opacity: 1
      }
    ];
  }

  getStartingPath(): string {
    if (!this.animations) {
      return this.getPath();
    }

    let radius = this.getRadius();
    let path;

    if (this.roundEdges) {
      if (this.orientation === BarOrientation.Vertical) {
        radius = Math.min(this.height, radius);
        path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
      } else if (this.orientation === BarOrientation.Horizontal) {
        radius = Math.min(this.width, radius);
        path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
      }
    } else {
      if (this.orientation === BarOrientation.Vertical) {
        path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
      } else if (this.orientation === BarOrientation.Horizontal) {
        path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
      }
    }

    return path;
  }

  getPath(): string {
    let radius = this.getRadius();
    let path;

    if (this.roundEdges) {
      if (this.orientation === BarOrientation.Vertical) {
        radius = Math.min(this.height, radius);
        path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
      } else if (this.orientation === BarOrientation.Horizontal) {
        radius = Math.min(this.width, radius);
        path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
      }
    } else {
      path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
    }

    return path;
  }

  getRadius(): number {
    let radius = 0;

    if (this.roundEdges && this.height > 5 && this.width > 5) {
      radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
    }

    return radius;
  }

  getStartOpacity(): number {
    if (this.roundEdges) {
      return 0.2;
    } else {
      return 0.5;
    }
  }

  get edges(): boolean[] {
    let edges = [false, false, false, false];
    if (this.roundEdges) {
      if (this.orientation === BarOrientation.Vertical) {
        if (this.data.value > 0) {
          edges = [true, true, false, false];
        } else {
          edges = [false, false, true, true];
        }
      } else if (this.orientation === BarOrientation.Horizontal) {
        if (this.data.value > 0) {
          edges = [false, true, false, true];
        } else {
          edges = [true, false, true, false];
        }
      }
    }
    return edges;
  }

  @HostListener('mouseenter')
  onMouseEnter(): void {
    this.activate.emit(this.data);
  }

  @HostListener('mouseleave')
  onMouseLeave(): void {
    this.deactivate.emit(this.data);
  }

  private checkToHideBar(): void {
    this.hideBar =
      this.noBarWhenZero &&
      ((this.orientation === BarOrientation.Vertical && this.height === 0) ||
        (this.orientation === BarOrientation.Horizontal && this.width === 0));
  }
}
