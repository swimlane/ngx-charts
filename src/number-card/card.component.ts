import {
  Component, Input, Output, EventEmitter, ElementRef,
  SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef, NgZone, OnDestroy, ViewEncapsulation
} from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';

@Component({
  selector: 'g[ngx-charts-card]',
  template: `
    <svg:g
      [attr.transform]="transform"
      class="cell"
      (click)="onClick()">
      <svg:rect
        class="card"
        [style.fill]="color"
        [attr.width]="cardWidth"
        [attr.height]="cardHeight"
        rx="3"
        ry="3"
      />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{label}}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0] + textFontSize + labelFontSize"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging">
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize">
          {{trimmedLabel}}
        </xhtml:p>
      </svg:foreignObject>
      <svg:text #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize">
        {{value}}
      </svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, OnDestroy {

  @Input() color;
  @Input() bandColor;
  @Input() textColor;

  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() data;
  @Input() medianSize: number;
  @Input() valueFormatting: any;

  @Output() select = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

  element: HTMLElement;
  value: string = '';
  transform: string;
  trimmedLabel: string;
  cardWidth: number;
  cardHeight: number;
  textWidth: number;
  textFontSize: number = 35;
  textTransform: string = '';
  originalWidth: number;
  originalHeight: number;
  originalWidthRatio: number;
  originalHeightRatio: number;
  initialized: boolean = false;
  animationReq: any;

  bandHeight: number = 10;
  transformBand: string;
  textPadding = [10, 20, 10, 20];
  labelFontSize = 12;

  bandPath: string;

  constructor(element: ElementRef, private cd: ChangeDetectorRef, private zone: NgZone) {
    this.element = element.nativeElement;
  }
  
  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationReq);
  }

  update(): void {
    const hasValue = this.data && typeof this.data.value !== 'undefined';
    this.valueFormatting = this.valueFormatting || (card => card.data.value.toLocaleString());

    this.transform = `translate(${this.x} , ${this.y})`;

    this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
    this.cardWidth = Math.max(0, this.width);
    this.cardHeight = Math.max(0, this.height);

    this.label = this.data ? this.data.name : '';
    this.trimmedLabel = trimLabel(this.label, 55);
    this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;

    const value = hasValue ?
      this.valueFormatting({
        label: this.label,
        data: this.data,
        value: this.data.value
      }) :
      '';

    this.value = this.paddedValue(value);

    const textHeight = this.textFontSize + 2 * this.labelFontSize;
    this.textPadding[0] = this.textPadding[2] = (this.cardHeight - textHeight - this.bandHeight) / 2 ;

    this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, false, false, true, true);

    setTimeout(() => {
      this.scaleText();
      this.value = value;
      
      if (hasValue) {
        setTimeout(() => this.startCount(), 20);
      }
    }, 0);
  }

  paddedValue(value: string) {
    if (this.medianSize && this.medianSize > value.length) {
      value += '\u2007'.repeat(this.medianSize - value.length);
    }
    return value;
  }

  startCount(): void {
    if (!this.initialized) {
      cancelAnimationFrame(this.animationReq);

      const val = this.data.value;
      const decs = decimalChecker(val);

      const callback = ({value}) => {
        const v = this.valueFormatting({label: this.label, data: this.data, value});
        this.value = this.paddedValue(v);
        this.cd.markForCheck();
      };

      this.animationReq = count(0, val, decs, 1, callback);
      this.initialized = true;
    }
  }

  scaleText(): void {
    const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
    if (width === 0 || height === 0) {
      return;
    }

    this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;

    const availableWidth = this.cardWidth - this.textPadding[1] - this.textPadding[3];
    const availableHeight = this.cardHeight / 3;

    if (!this.originalWidthRatio) {
      this.originalWidthRatio = availableWidth / width;
      this.originalWidth = availableWidth;
    }

    if (!this.originalHeightRatio) {
      this.originalHeightRatio = availableHeight / height;
      this.originalHeight = availableHeight;
    }

    const newWidthRatio = (availableWidth / this.originalWidth) * this.originalWidthRatio;
    const newHeightRatio = (availableHeight / this.originalHeight) * this.originalHeightRatio;

    const resizeScale = Math.min(newWidthRatio, newHeightRatio);

    this.textFontSize = Number.parseInt((35 * resizeScale).toString());
    this.labelFontSize = Math.min(this.textFontSize, 12);

    const textHeight = this.textFontSize + 2 * this.labelFontSize;
    this.textPadding[0] = this.textPadding[2] = (this.cardHeight - textHeight - this.bandHeight) / 2 ;

    this.cd.markForCheck();
  }

  onClick(): void {
    this.select.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
