import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges
} from '@angular/core';
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
export class Card implements OnChanges {
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

  ngOnChanges() {
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
  }

  click() {
    this.clickHandler.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
