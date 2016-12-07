import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges,
  OnInit,
  OnChanges,
  ChangeDetectionStrategy
 } from '@angular/core';
import { id } from '../utils/id';
import d3 from '../d3';

@Component({
  selector: 'g[bar]',
  template: `
    <svg:defs *ngIf="gradient">
      <svg:g svgLinearGradient
        [color]="fill"
        [orientation]="orientation"
        [name]="gradientId"
        [startOpacity]="startOpacity"
      />
    </svg:defs>
    <svg:path
      class="bar"
      stroke="none"
      [class.active]="isActive"
      [attr.d]="path"
      [attr.fill]="gradient ? gradientFill : fill"
      (click)="clickHandler.emit(data)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class BarComponent implements OnInit, OnChanges {

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

  @Output() clickHandler = new EventEmitter();

  element: any;
  path: any;
  gradientId: any;
  gradientFill: any;
  startOpacity: any;
  initialized: boolean = false;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let pageUrl = window.location.href;
    this.gradientId = 'grad' + id().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;
    this.startOpacity = this.getStartOpacity();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // ngOnInit gets called after ngOnChanges, so we need to do this here
    if (!this.initialized) {
      this.loadAnimation();
      this.initialized = true;
    } else {
      this.update();
    }
  }

  update(): void {
    this.animateToCurrentForm();
  }

  loadAnimation(): void {
    this.path = this.getStartingPath();
    setTimeout(this.update.bind(this), 100);
  }

  animateToCurrentForm(): void {
    let node = d3.select(this.element).select('.bar');
    let path = this.getPath();

    node.transition().duration(750)
      .attr('d', path);
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

  getRadius() {
    let radius = 0;
    if (this.roundEdges && this.height > 5 && this.width > 5) {
      radius = 5;
    }
    return radius;
  }

  getStartOpacity() {
    if (this.roundEdges) {
      return 0.2;
    } else {
      return 0.5;
    }
  }

  roundedRect(x, y, w, h, r, tl, tr, bl, br) {
    let retval;
    retval = "M" + (x + r) + "," + y;
    retval += "h" + (w - 2 * r);
    if (tr) {
      retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
    } else {
      retval += "h" + r;
      retval += "v" + r;
    }
    retval += "v" + (h - 2 * r);
    if (br) {
      retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
    } else {
      retval += "v" + r;
      retval += "h" + -r;
    }
    retval += "h" + (2 * r - w);
    if (bl) {
      retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
    } else {
      retval += "h" + -r;
      retval += "v" + -r;
    }
    retval += "v" + (2 * r - h);
    if (tl) {
      retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
    } else {
      retval += "v" + -r;
      retval += "h" + r;
    }
    retval += "z";
    return retval;
  }

}
