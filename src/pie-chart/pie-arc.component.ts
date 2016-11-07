import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges
} from '@angular/core';
import d3 from '../d3';
import { id } from "../utils/id";

@Component({
  selector: 'g[pieArc]',
  template: `
    <svg:g class="arc-group">
      <svg:defs *ngIf="gradient">
        <svg:g svgLinearGradient
          [color]="fill"
          orientation="vertical"
          [name]="linearGradientId"
          [startOpacity]="startOpacity"
        />
        <svg:g svgRadialGradient
          [color]="fill"
          orientation="vertical"
          [name]="radialGradientId"
          [startOpacity]="startOpacity"
        />
      </svg:defs>
      <svg:path
        [attr.d]="path"
        class="arc"
        [style.cursor]="'pointer'"
        [attr.fill]="gradient ? gradientFill : fill"
        (click)="click()"
      />
    </svg:g>
  `
})
export class PieArc implements OnChanges {
  element: HTMLElement;
  path: any;
  startOpacity: number;
  radialGradientId: string;
  linearGradientId: string;
  gradientFill: string;
  initialized: boolean = false;

  @Input() fill;
  @Input() startAngle;
  @Input() endAngle;
  @Input() innerRadius;
  @Input() outerRadius;
  @Input() value;
  @Input() total;
  @Input() max;
  @Input() data;
  @Input() explodeSlices;
  @Input() gradient: boolean = false;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    let arc = this.calculateArc();
    this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
    this.startOpacity = 0.3;

    let pageUrl = window.location.href;
    this.radialGradientId = 'linearGrad' + id().toString();
    this.linearGradientId = 'radialGrad' + id().toString();

    if (this.innerRadius !== 0) {
      this.gradientFill = `url(${pageUrl}#${this.radialGradientId})`;
    } else {
      this.gradientFill = `url(${pageUrl}#${this.linearGradientId})`;
    }

    if (this.initialized) {
      this.updateAnimation();
    } else {
      this.loadAnimation();
      this.initialized = true;
    }

  }

  calculateArc() {
    let outerRadius = this.outerRadius;
    if (this.explodeSlices && this.innerRadius === 0) {
      outerRadius = this.outerRadius * this.value / this.max;
    }

    return d3.arc()
      .innerRadius(this.innerRadius).outerRadius(outerRadius);
  }

  loadAnimation() {
    let node = d3.select(this.element).selectAll('.arc').data([{startAngle: this.startAngle, endAngle: this.endAngle}]);
    let arc = this.calculateArc();

    node
      .transition()
      .attrTween("d", function(d) {
        this._current = this._current || d;
        let copyOfD = Object.assign({}, d);
        copyOfD.endAngle = copyOfD.startAngle;
        let interpolate = d3.interpolate(copyOfD, copyOfD);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      })
      .transition().duration(750)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        let interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  }

  updateAnimation() {
    let node = d3.select(this.element).selectAll('.arc').data([{startAngle: this.startAngle, endAngle: this.endAngle}]);
    let arc = this.calculateArc();

    node
      .transition().duration(750)
      .attrTween("d", function(d) {
        this._current = this._current || d;
        let interpolate = d3.interpolate(this._current, d);
        this._current = interpolate(0);
        return function(t) {
          return arc(interpolate(t));
        };
      });
  }

  click() {
    this.clickHandler.emit(this.data);
  }

}
