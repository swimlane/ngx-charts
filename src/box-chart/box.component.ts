import {
  Component,
  Input,
  Output,
  EventEmitter,
  HostListener,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { select } from 'd3-selection';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
import { IBoxModel } from '../models/chart-data.model';

@Component({
  selector: 'g[ngx-charts-box]',
  template: `
    <svg:defs *ngIf="hasGradient">
      <svg:g ngx-charts-svg-linear-gradient [orientation]="orientation" [name]="gradientId" [stops]="gradientStops" />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      role="img"
      tabIndex="-1"
      [class.active]="isActive"
      [class.hidden]="hideBar"
      [attr.d]="boxPath"
      [attr.aria-label]="ariaLabel"
      [attr.fill]="(hasGradient ? gradientFill : fill)"
      (click)="select.emit(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BoxComponent implements OnChanges {
  @Input() fill: string;
  @Input() data: IBoxModel;
  @Input() width: number;
  @Input() height: number;
  @Input() x: number;
  @Input() y: number;
  @Input() orientation: string;
  @Input() roundEdges: boolean = true;
  @Input() gradient: boolean = false;
  @Input() offset: number = 0;
  @Input() isActive: boolean = false;
  @Input() stops: any[];
  @Input() animations: boolean = true;
  @Input() ariaLabel: string;
  @Input() noBarWhenZero: boolean = true;

  @Output() select: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() activate: EventEmitter<IBoxModel> = new EventEmitter();
  @Output() deactivate: EventEmitter<IBoxModel> = new EventEmitter();

  element: any;
  boxPath: any;
  gradientId: any;
  gradientFill: any;
  startOpacity: any;
  initialized: boolean = false;
  gradientStops: any[];
  hasGradient: boolean = false;
  hideBar: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (!this.initialized) {
      this.loadAnimation();
      this.initialized = true;
    } else {
      this.update();
    }
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

    this.updatePathEl();
    this.checkToHideBar();
  }

  loadAnimation(): void {
    this.boxPath = this.getStartingPath();
    setTimeout(this.update.bind(this), 100);
  }

  updatePathEl(): void {
    const node = select(this.element).select('.bar');
    const path = this.getPath();
    if (this.animations) {
      node
        .transition()
        .duration(500)
        .attr('d', path);
    } else {
      node.attr('d', path);
    }
  }

  getGradient() {
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

  getStartingPath() {
    if (!this.animations) {
      return this.getPath();
    }

    let radius = this.getRadius();
    let path = '';

    if (this.roundEdges) {
      if (this.orientation === 'vertical') {
        radius = Math.min(this.height, radius);
        path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
      } else if (this.orientation === 'horizontal') {
        radius = Math.min(this.width, radius);
        path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
      }
    } else {
      if (this.orientation === 'vertical') {
        path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
      } else if (this.orientation === 'horizontal') {
        path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
      }
    }

    return path;
  }

  getPath() {
    let radius = this.getRadius();
    let path = '';

    if (this.roundEdges) {
      if (this.orientation === 'vertical') {
        radius = Math.min(this.height, radius);
        path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
      } else if (this.orientation === 'horizontal') {
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
      if (this.orientation === 'vertical') {
        if (this.data.value > 0) {
          edges = [true, true, false, false];
        } else {
          edges = [false, false, true, true];
        }
      } else if (this.orientation === 'horizontal') {
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
      ((this.orientation === 'vertical' && this.height === 0) ||
        (this.orientation === 'horizontal' && this.width === 0));
  }
}
