import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import ObjectId from '../utils/object-id';
import d3 from '../d3';

@Component({
  selector: 'g[bar]',
  template: `
    <svg:defs>
      <svg:g svgLinearGradient
        [color]="fill"
        [orientation]="orientation"
        [name]="gradientId"
        [startOpacity]="startOpacity"
      />
    </svg:defs>
    <svg:path
      [attr.d]="path"
      class="bar"
      [attr.fill]="gradientFill"
      stroke="none"
      [style.cursor]="'pointer'"
      (click)="click()"
    />
  `
})
export class Bar implements OnInit {
  @Input() fill;
  @Input() data;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
  @Input() orientation;
  @Input() roundEdges = true;
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
    this.path = this.calculatePath();

    let pageUrl = window.location.href;
    this.gradientId = 'grad' + ObjectId().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;
    this.startOpacity = this.calculateStartOpacity();

    this.loadAnimation();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.bar');
    let startingPath = this.calculateStartingPath();
    node.attr('d', startingPath);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.bar');
    this.path = this.calculatePath(); // todo check if defining this.path or local variable path to use below

    node.transition().duration(750)
      .attr('d', this.path); // todo check if use this.path or use path defined above
  }

  calculateStartingPath() {
    let radius = this.calculateRadius();
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

  calculatePath() {
    let radius = this.calculateRadius();
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

  calculateRadius() {
    let radius = 0;
    if (this.roundEdges) {
      radius = 5;
      if (this.height <= radius || this.width <= radius) {
        radius = 0;
      }
    }
    return radius;
  }

  calculateStartOpacity() {
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
