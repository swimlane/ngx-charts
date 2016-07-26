import { Component, Input, Output, EventEmitter, ElementRef } from '@angular/core';
import { SvgLinearGradient } from '../common/SvgLinearGradient.js';

@Component({
  selector: 'g[area]',
  directives: [SvgLinearGradient],
  template: `
    <svg:g>
      <svg:defs>
        <svg:g svg-linear-gradient
          [color]="fill"
          orientation="vertical"
          [name]="gradientId"
          [startOpacity]="startOpacity"
          [endOpacity]="endOpacity"
        />
      </svg:defs>
      <svg:path
        class="viz area"
        [attr.d]="path"
        [attr.fill]="gradientFill"
        [attr.opacity]="opacity"
      />
    </svg:g>
  `
})
export class Area {
  @Input() data;
  @Input() path;
  @Input() startingPath;
  @Input() fill;
  @Input() opacity = 1;
  @Input() startOpacity = 0.5;
  @Input() endOpacity = 1;
  @Input() activeLabel;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef){
    this.element = element.nativeElement;
  }

  ngOnInit() {
    let label = this.data.name;

    let active = label === this.activeLabel;

    let pageUrl = window.location.href;
    this.gradientId = 'grad' + ObjectId().toString();
    this.gradientFill = `url(${pageUrl}#${this.gradientId})`;

    this.loadAnimation();
  }

  loadAnimation() {
    let node = d3.select(this.element).select('.area');

    node
      .attr('d', this.startingPath)

    this.animateToCurrentForm();
  }

  animateToCurrentForm(){
    let node = d3.select(this.element).select('.area');

    node.transition().duration(750)
      .attr('d', this.path);
  }
}
