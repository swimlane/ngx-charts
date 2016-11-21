import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ViewChild
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
        style="cursor: pointer;"
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
        style="font-size: 12px;
               pointer-events: none;
               text-transform: uppercase;
               overflow: hidden;
               text-align: center;
               line-height: 1em;">
        <xhtml:p
          style="overflow: hidden;
                 white-space: nowrap;
                 text-overflow: ellipsis;
                 width: 100%;">
          {{trimmedLabel}}
        </xhtml:p>
      </svg:foreignObject>

      <svg:text #textEl
        [attr.x]="cardWidth / 2"
        [attr.y]="height * 0.30"
        dy='.35em'
        class="value-text"
        [style.fill]="color"
        text-anchor="middle"
        [style.font-size.pt]="textFontSize"
        style="pointer-events: none;">
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
  resizeScale: number = 1;
  textFontSize: number = 35;
  textTransform: string = '';
  initialized: boolean = false;

  @Input() color;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() data;

  @Output() clickHandler = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.transform = `translate(${this.x} , ${this.y})`;

    this.textWidth = Math.max(0, this.width - 15);
    this.cardWidth = Math.max(0, this.width - 5);
    this.cardHeight = Math.max(0, this.height - 5);

    this.label = this.data.name;
    this.trimmedLabel = trimLabel(this.label, 55);

    this.value = this.data.value.toLocaleString();
    this.scaleText();
    if (!this.initialized) {
      setTimeout(() => {
        this.scaleText();
        let step = this.data.value / 100;
        this.countUp(0, this.data.value, step);
      });
      this.initialized = true;
    }
  }

  countUp(current, max, step) {
    this.value = Math.round(current).toLocaleString();

    if (current >= max) {
      return;
    }
    let newValue = Math.min(current + step, max);

    setTimeout(() => {
      this.countUp(newValue, max, step);
    }, 16);
  }

  scaleText() {
    let width = this.textEl.nativeElement.getBoundingClientRect().width;

    if (width === 0) {
      return;
    }

    let oldScale = this.resizeScale;
    let availableSpace = this.cardWidth * 0.85;
    this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
    if (this.resizeScale !== oldScale) {
      this.textFontSize = Number.parseInt((35 * this.resizeScale).toString());
    }
  }

  click() {
    this.clickHandler.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
