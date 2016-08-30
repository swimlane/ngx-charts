import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import ObjectId from "../utils/object-id";
import d3 from '../d3';

@Component({
  selector: 'g[heatMapCell]',
  template: `
    <svg:g [attr.transform]="transform" class="cell">
      <defs>
        <svg:g svgLinearGradient
          [color]="fill"
          orientation="vertical"
          [name]="gradientId"
          [startOpacity]="startOpacity"
        />
      </defs>

      <svg:rect
        [attr.fill]="gradientUrl"
        rx="3"
        [attr.width]="width"
        [attr.height]="height"
        class="cell"
        style="cursor: pointer"
        (click)="click()"
      />

    </svg:g>
  `
})
export class HeatMapCell implements OnInit {
  element: HTMLElement;
  transform: string;
  activeRange: any[];
  startOpacity: number;
  gradientId: string;
  gradientUrl: string;

  @Input() fill;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() data;
  @Input() label;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.transform = `translate(${this.x} , ${this.y})`;

    // let value = this.data.value; // unused variable
    // let range = this.activeRange; // unused variable

    let pageUrl = window.location.href;
    this.startOpacity = 0.3;
    this.gradientId = 'grad' + ObjectId().toString();
    this.gradientUrl = `url(${pageUrl}#${this.gradientId})`;

    this.loadAnimation();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.cell');

    node
      .attr('opacity', 0);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.cell');

    node.transition().duration(750)
      .attr('opacity', 1);
  }

  click() {
    this.clickHandler.emit(this.data);
  }

}
