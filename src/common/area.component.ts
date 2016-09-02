import { Component, Input, Output, EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
import ObjectId from "../utils/object-id";
import d3 from '../d3';

@Component({
  selector: 'g[area]',
  template: `
    <svg:defs *ngIf="gradient">
      <svg:g svgLinearGradient
        [color]="fill"
        orientation="vertical"
        [name]="gradientId"
        [startOpacity]="startOpacity"
        [endOpacity]="endOpacity"
      />
    </svg:defs>
    <svg:path
      class="area"
      [attr.d]="path"
      [attr.fill]="gradient ? gradientFill : fill"
      [attr.opacity]="opacity"
    />
  `
})
export class Area implements OnInit, OnChanges {
  element: HTMLElement;
  gradientId: string;
  gradientFill: string;

  @Input() data;
  @Input() path;
  @Input() startingPath;
  @Input() fill;
  @Input() opacity = 1;
  @Input() startOpacity = 0.5;
  @Input() endOpacity = 1;
  @Input() activeLabel;
  @Input() gradient: boolean = false;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {

        let pageUrl = window.location.href;
        this.gradientId = 'grad' + ObjectId().toString();
        this.gradientFill = `url(${pageUrl}#${this.gradientId})`;

        this.loadAnimation();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.area');

    node
      .attr('d', this.startingPath);

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    let node = d3.select(this.element).select('.area');

    node.transition().duration(750)
      .attr('d', this.path);
  }
}
