import { Component, Input, Output, EventEmitter, ElementRef, OnInit } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import d3 from '../d3';

@Component({
  selector: 'g[card]',
  template: `
    <svg:g [attr.transform]="transform" class="cell"
      (click)="click()">
      <svg:rect
        class="card"
        [style.fill]="color"
        [style.opacity]="0.3"
        style="cursor: pointer; stroke-width: 2px; stroke: #192024;"
        [attr.width]="cardWidth"
        [attr.height]="cardHeight"
        rx="3"
        ry="3"
      />
      <title>{{label}}</title>
      <svg:foreignObject
        x="5"
        [attr.y]="height * 0.7"
        [attr.width]="textWidth"
        [attr.height]="height * 0.3"
        style="fill: #fff; font-size: 12px; pointer-events: none; text-transform: uppercase; overflow: hidden; text-align: center;">
        <xhtml:p>
          {{trimmedLabel}}
        </xhtml:p>
      </svg:foreignObject>

      <svg:text
        [attr.x]="width / 2"
        [attr.y]="height * 0.30"
        dy='.35em'
        class="value-text"
        [style.fill]="color"
        text-anchor="middle"
        style="font-size: 46px; pointer-events: none;">
        {{value}}
      </svg:text>
    </svg:g>
  `
})
export class Card implements OnInit {
  element: HTMLElement;
  transform: string;
  trimmedLabel: string;
  value: string;
  cardWidth: number;
  cardHeight: number;
  textWidth: number;

  @Input() color;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() data;

  @Output() clickHandler = new EventEmitter();

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.update();
  }

  update() {
    this.transform = `translate(${this.x} , ${this.y})`;

    this.label = this.data.name;
    this.trimmedLabel = trimLabel(this.label, 55);
    this.value = d3.format(",.0f")(this.data.value);

    this.cardWidth = Math.max(0, this.width - 5);
    this.cardHeight = Math.max(0, this.height - 5);
    this.textWidth = Math.max(0, this.width - 15);

    this.loadAnimation();
  }

  loadAnimation() {
    // TODO: replace countup animation
    // let node = d3.select(this.element).selectAll('.value-text');
    //
    // node.text('0');

    this.animateToCurrentForm();
  }

  animateToCurrentForm() {
    var options = {
      useEasing: true,
      useGrouping: true,
      separator: ',',
      decimal: '.',
      prefix: '',
      suffix: ''
    };

    var endValue = this.data.value;
    if (this.data.valueType === 'currency') {
      options.prefix = '$';
    } else if (this.data.valueType === 'duration') {
      if (endValue < 60) {
        options.suffix = ' sec';
      } else if (endValue < 3600) {
        endValue = endValue / 60;
        options.suffix = ' min';
      } else {
        endValue = endValue / 3600;
        options.suffix = ' hours';
      }
    }

    // TODO: replace countup animation
    // let node = d3.select(this.element).selectAll('.value-text');
    // var counter = new CountUp(node[0][0], 0, endValue, 0, 2.5, options);
    // counter.start();
  }

  click() {
    this.clickHandler.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
