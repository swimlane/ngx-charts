import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone
} from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';

@Component({
  selector: 'g[card]',
  template: `
    <svg:g 
      [attr.transform]="transform" 
      class="cell"
      (click)="onClick()">
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Card implements OnChanges {

  @Input() color;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() data;

  @Output() clickHandler = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

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

  constructor(element: ElementRef, private cd: ChangeDetectorRef, private zone: NgZone) {
    this.element = element.nativeElement;
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.zone.run(() => {
      this.transform = `translate(${this.x} , ${this.y})`;

      this.textWidth = Math.max(0, this.width - 15);
      this.cardWidth = Math.max(0, this.width - 5);
      this.cardHeight = Math.max(0, this.height - 5);

      this.label = this.data.name;
      this.trimmedLabel = trimLabel(this.label, 55);

      this.value = this.data.value.toLocaleString();
      setTimeout(() => {
        this.scaleText();
      });
      if (!this.initialized) {
        setTimeout(() => {
          this.scaleText();
          let step = this.data.value / 100;
          this.countUp(0, this.data.value, step);
        });
        this.initialized = true;
      }
    });
  }

  countUp(current, max, step) {
    this.zone.run(() => {
      this.value = Math.round(current).toLocaleString();

      if (current >= max) {
        return;
      }
      let newValue = Math.min(current + step, max);
      this.cd.markForCheck();
      setTimeout(() => {
        this.countUp(newValue, max, step);
      }, 16);
    });
  }

  scaleText() {
    this.zone.run(() => {
      let { width, height } = this.textEl.nativeElement.getBoundingClientRect();
      if (width === 0 || height === 0) {
        return;
      }

      let oldScale = this.resizeScale;
      let availableWidth = this.cardWidth * 0.85;
      let availableHeight = this.cardHeight * 0.65;

      let resizeScaleWidth = Math.floor((availableWidth / (width / this.resizeScale)) * 100) / 100;
      let resizeScaleHeight = Math.floor((availableHeight / (height / this.resizeScale)) * 100) / 100;
      this.resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
      if (this.resizeScale !== oldScale) {
        this.textFontSize = Number.parseInt((35 * this.resizeScale).toString());
        this.cd.markForCheck();
      }
    });
  }

  onClick() {
    this.clickHandler.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
