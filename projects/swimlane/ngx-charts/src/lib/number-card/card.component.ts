import {
  Component,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  SimpleChanges,
  OnChanges,
  ViewChild,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  NgZone,
  OnDestroy,
  PLATFORM_ID,
  Inject,
  OnInit
} from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { escapeLabel } from '../common/label.helper';
import { decimalChecker, count } from '../common/count/count.helper';
import { GridData } from '../common/grid-layout.helper';
import { isPlatformBrowser, isPlatformServer } from '@angular/common';
import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';

@Component({
  selector: 'g[ngx-charts-card]',
  template: `
    <svg:g [attr.transform]="transform" class="cell" (click)="onClick()">
      <svg:rect class="card" [style.fill]="color" [attr.width]="cardWidth" [attr.height]="cardHeight" rx="3" ry="3" />
      <svg:path
        *ngIf="bandColor && bandColor !== color"
        class="card-band"
        [attr.fill]="bandColor"
        [attr.transform]="transformBand"
        stroke="none"
        [attr.d]="bandPath"
      />
      <title>{{ label }}</title>
      <svg:foreignObject
        class="trimmed-label"
        x="5"
        [attr.x]="textPadding[3]"
        [attr.y]="cardHeight - textPadding[2]"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging"
      >
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel"
        >
        </xhtml:p>
      </svg:foreignObject>
      <svg:text
        #textEl
        class="value-text"
        [attr.x]="textPadding[3]"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        [style.font-size.pt]="textFontSize"
      >
        {{ value }}
      </svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class CardComponent implements OnChanges, OnDestroy, OnInit {
  @Input() color: string;
  @Input() bandColor: string;
  @Input() textColor: string;
  @Input() x: number;
  @Input() y: number;
  @Input() width: number;
  @Input() height: number;
  @Input() label: string;
  @Input() data: GridData;
  @Input() medianSize: number;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  @ViewChild('textEl', { static: false }) textEl: ElementRef;

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
  animationReq: number;

  bandHeight: number = 10;
  transformBand: string;
  textPadding: number[] = [10, 20, 5, 20];
  labelFontSize: number = 15;

  bandPath: string;

  constructor(
    element: ElementRef,
    private cd: ChangeDetectorRef,
    private zone: NgZone,
    @Inject(PLATFORM_ID) private platformId: any
  ) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngOnInit() {
    if (isPlatformServer(this.platformId)) {
      this.scaleTextSSR();
    }
  }

  ngOnDestroy(): void {
    if (isPlatformBrowser(this.platformId)) {
      cancelAnimationFrame(this.animationReq);
    }
  }

  update(): void {
    this.zone.run(() => {
      const hasValue = this.data && typeof this.data.value !== 'undefined';
      const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
      const labelFormatting = this.labelFormatting || (card => escapeLabel(trimLabel(card.label, 55)));

      this.transform = `translate(${this.x} , ${this.y})`;

      this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
      this.cardWidth = Math.max(0, this.width);
      this.cardHeight = Math.max(0, this.height);

      this.label = this.label ? this.label : (this.data.name as any);

      const cardData = {
        label: this.label,
        data: this.data,
        value: this.data.value
      };

      this.formattedLabel = labelFormatting(cardData);
      this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;

      const value = hasValue ? valueFormatting(cardData) : '';

      this.value = this.paddedValue(value);
      this.setPadding();

      this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, [false, false, true, true]);

      setTimeout(() => {
        if (isPlatformBrowser(this.platformId)) {
          this.scaleText();
        }
        this.value = value;
        if (hasValue && !this.initialized) {
          setTimeout(() => this.startCount(), 20);
        }
      }, 8);
    });
  }

  paddedValue(value: string): string {
    if (this.medianSize && this.medianSize > value.length) {
      value += '\u2007'.repeat(this.medianSize - value.length);
    }
    return value;
  }

  startCount(): void {
    if (!this.initialized && this.animations) {
      cancelAnimationFrame(this.animationReq);

      const val = this.data.value;
      const decs = decimalChecker(val);
      const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());

      const callback = ({ value, finished }) => {
        this.zone.run(() => {
          value = finished ? val : value;
          this.value = valueFormatting({ label: this.label, data: this.data, value });
          if (!finished) {
            this.value = this.paddedValue(this.value);
          }
          this.cd.markForCheck();
        });
      };

      this.animationReq = count(0, val, decs, 1, callback);
      this.initialized = true;
    }
  }

  scaleText(): void {
    this.zone.run(() => {
      const { width, height } = this.textEl.nativeElement.getBoundingClientRect();
      if (width === 0 || height === 0) {
        return;
      }

      const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
      const availableWidth = this.cardWidth - 2 * textPadding;
      const availableHeight = this.cardHeight / 3;

      const resizeScale = Math.min(availableWidth / width, availableHeight / height);
      this.textFontSize = Math.floor(this.textFontSize * resizeScale);
      this.labelFontSize = Math.min(this.textFontSize, 15);

      this.setPadding();
      this.cd.markForCheck();
    });
  }

  scaleTextSSR() {
    const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, this.value, 10);
    const height = 18;
    const textPadding = (this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8);
    const availableWidth = this.cardWidth - 2 * textPadding;
    const availableHeight = this.cardHeight / 3;

    const resizeScale = Math.min(availableWidth / width, availableHeight / height);

    this.textFontSize = Math.floor(this.textFontSize * resizeScale);
    this.labelFontSize = Math.min(this.textFontSize, 15);

    this.setPadding();
  }

  setPadding() {
    this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
    const padding = this.cardHeight / 2;
    this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
    this.textPadding[2] = padding - this.labelFontSize;
  }

  onClick(): void {
    this.select.emit(this.data);
  }
}
