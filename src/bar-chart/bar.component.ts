import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import ObjectId from '../utils/object-id';
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
      [attr.d]="path"
      [attr.fill]="gradient ? gradientFill : fill"
      [style.cursor]="'pointer'"
      (click)="click()"
    />
  `
})
export class Bar implements OnInit, OnChanges {
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

  @Output() clickHandler = new EventEmitter();

  element: any;
  path: any;
  gradientId: any;
  gradientFill: any;
  startOpacity: any;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let pageUrl = window.location.href;
    this.gradientId = 'grad' + ObjectId().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;
    this.startOpacity = this.getStartOpacity();

    this.loadAnimation();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.animateToCurrentForm();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.bar');
    let startingPath = this.getStartingPath();
    node.attr('d', startingPath);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.bar');
    this.path = this.getPath(); // todo check if defining this.path or local variable path to use below

    node.transition().duration(750)
      .attr('d', this.path); // todo check if use this.path or use path defined above
  }

  getStartingPath() {
    let radius = this.getRadius();
    let path;

    if (this.roundEdges) {
      if (this.orientation === 'vertical') {
        path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
      } else if (this.orientation === 'horizontal') {
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
        path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
      } else if (this.orientation === 'horizontal') {
        path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
      }
    } else {
      path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
    }

    return path;
  }

  getRadius() {
    let radius = 0;
    if (this.roundEdges && this.height > radius && this.width > radius) {
      radius = 5;
    }
    return radius;
  }

  getStartOpacity() {
    if (this.roundEdges) {
      return 0;
    } else {
      return 0.5;
    }
  }

  roundedRect(x, y, w, h, r, tl, tr, bl, br) {
    var retval;
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

  click() {
    this.clickHandler.emit(this.data);
  }

}
