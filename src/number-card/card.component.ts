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
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging">
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [innerHTML]="formattedLabel">
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
  @Input() labelFormatting: any;

  @Output() select = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

  element: HTMLElement;
  value: string = '';
  transform: string;
  formattedLabel: string;
  cardWidth: number;
  cardHeight: number;
  textWidth: number;
  textFontSize: number = 12;
  textTransform: string = '';
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
    this.labelFormatting = this.labelFormatting || (card => trimLabel(card.label, 55));

    this.transform = `translate(${this.x} , ${this.y})`;

    this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
    this.cardWidth = Math.max(0, this.width);
    this.cardHeight = Math.max(0, this.height);

    this.label = this.data ? this.data.name : '';

    const cardData = {
      label: this.label,
      data: this.data,
      value: this.data.value
    };

    this.formattedLabel = this.labelFormatting(cardData);
    this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;

    const value = hasValue ? this.valueFormatting(cardData) : '';

    this.value = this.paddedValue(value);

    this.setPadding();
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

      const callback = ({value, finished}) => {
        value = finished ? val : value;
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

    const textPadding = this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
    const availableWidth = this.cardWidth - 2 * textPadding;
    const availableHeight = this.cardHeight / 3;

    const resizeScale = Math.min(availableWidth / width, availableHeight / height);
    this.textFontSize = Math.round(this.textFontSize * resizeScale);
    this.labelFontSize = Math.min(this.textFontSize, 12);

    this.setPadding();
    this.cd.markForCheck();
  }

  setPadding() {
    const padding = this.cardHeight / 2;
    this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
    this.textPadding[2] = padding - this.labelFontSize;
  }

  onClick(): void {
    this.select.emit({
      name: this.data.name,
      value: this.data.value
    });
  }
}
