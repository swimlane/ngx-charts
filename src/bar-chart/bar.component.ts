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
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { id } from '../utils/id';
import d3 from '../d3';

@Component({
  selector: 'g[ngx-charts-bar]',
  template: `
    <svg:defs *ngIf="hasGradient">
      <svg:g ngx-charts-svg-linear-gradient
        [color]="fill"
        [orientation]="orientation"
        [name]="gradientId"
        [stops]="gradientStops"
      />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      [class.active]="isActive"
      [attr.d]="path"
      [attr.fill]="hasGradient ? gradientFill : fill"
      (click)="select.emit(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnChanges {

  @Input() fill;
  @Input() data;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
  @Input() orientation;
  @Input() roundEdges: boolean = true;
  @Input() gradient: boolean = false;
  @Input() offset = 0;
  @Input() isActive: boolean = false;
  @Input() stops: any[];

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  element: any;
  path: any;
  gradientId: any;
  gradientFill: any;
  startOpacity: any;
  initialized: boolean = false;
  gradientStops: any[];
  hasGradient: boolean = false;

  constructor(element: ElementRef, private location: LocationStrategy) {
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
    const pageUrl = this.location instanceof PathLocationStrategy
      ? this.location.path()
      : '';

    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;

    if (this.gradient || this.stops) {
      this.gradientStops = this.getGradient();
      this.hasGradient = true;
    } else {
      this.hasGradient = false;
    }

    this.animateToCurrentForm();
  }

  loadAnimation(): void {
    this.path = this.getStartingPath();
    setTimeout(this.update.bind(this), 100);
  }

  animateToCurrentForm(): void {
    const node = d3.select(this.element).select('.bar');
    const path = this.getPath();

    node.transition().duration(750)
      .attr('d', path);
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
    }];
  }

  getStartingPath() {
    let radius = this.getRadius();
    let path;

    if (this.roundEdges) {
      if (this.orientation === 'vertical') {
        radius = Math.min(this.height, radius);
        path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
      } else if (this.orientation === 'horizontal') {
        radius = Math.min(this.width, radius);
        path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, true, false, true);
      }
    } else {
      if (this.orientation === 'vertical') {
        path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, false, false, false, false);
      } else if (this.orientation === 'horizontal') {
        path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, false, false, false);
      }
    }

    return path;
  }

  getPath() {
    let radius = this.getRadius();
    let path;

    if (this.roundEdges) {
      if (this.orientation === 'vertical') {
        radius = Math.min(this.height, radius);
        path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
      } else if (this.orientation === 'horizontal') {
        radius = Math.min(this.width, radius);
        path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
      }
    } else {
      path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
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

  roundedRect(x, y, w, h, r, tl, tr, bl, br) {
    let retval;

    retval = 'M' + (x + r) + ',' + y;
    retval += 'h' + (w - 2 * r);

    if (tr) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
    } else {
      retval += 'h' + r;
      retval += 'v' + r;
    }

    retval += 'v' + (h - 2 * r);

    if (br) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
    } else {
      retval += 'v' + r;
      retval += 'h' + -r;
    }

    retval += 'h' + (2 * r - w);

    if (bl) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
    } else {
      retval += 'h' + -r;
      retval += 'v' + -r;
    }

    retval += 'v' + (2 * r - h);

    if (tl) {
      retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
    } else {
      retval += 'v' + -r;
      retval += 'h' + r;
    }

    retval += 'z';

    return retval;
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
