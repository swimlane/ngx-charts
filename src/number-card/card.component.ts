import {
  Component, Input, Output, EventEmitter, ElementRef,
  SimpleChanges, OnChanges, OnInit, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef, NgZone, OnDestroy
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
        [attr.rx]="rx"
        [attr.ry]="ry"
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
        [attr.y]="textPadding[0] + textHeight"
        [attr.width]="textWidth"
        [attr.height]="labelFontSize + textPadding[2]"
        alignment-baseline="hanging">
        <xhtml:p
          [style.color]="textColor"
          [style.fontSize.px]="labelFontSize"
          [style.lineHeight.px]="labelFontSize"
          [innerHTML]="formattedLabel">
        </xhtml:p>
      </svg:foreignObject>
      <svg:text #textEl
        class="value-text"
        [attr.x]="this.cardWidth / 2"
        [attr.y]="textPadding[0]"
        [style.fill]="textColor"
        text-anchor="start"
        alignment-baseline="hanging"
        text-anchor="middle"
        [style.font-size.px]="textFontSize">
        {{value}}
      </svg:text>
      <svg:text #paddedTextEl
        class="padded-value-text"
        text-anchor="start"
        alignment-baseline="hanging"
        text-anchor="middle"
        [style.font-size.px]="textFontSize">
        {{paddedValue}}
      </svg:text>
      <svg:g *ngIf="dotX"
        [style.fill]="bandColor">
        <svg:circle class="dot"
          style="filter: url(#shadow);"
          [attr.cx]="dotX"
          [attr.cy]="textPadding[0] + textFontSize / 2"
          [attr.r]="dotRadius"/>
        <svg:circle class="dot"
          [attr.cx]="dotX"
          [attr.cy]="textPadding[0] + textFontSize / 2"
          [attr.r]="dotRadius"/>
      </svg:g>
      <svg:line 
        *ngIf="divider"
        [attr.x1]="dividerX"
        [attr.y1]="15"
        [attr.x2]="dividerX"
        [attr.y2]="cardHeight - bandHeight - 15"
        [attr.stroke]="dividerColor"
        [attr.stroke-width]="dividerWidth" />
      <defs>
        <filter id="shadow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="1.5" result="shadow"/>
        </filter>
      </defs>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnInit, OnChanges, OnDestroy {

  @Input() color: string;
  @Input() bandColor: string;
  @Input() textColor: string;
  @Input() dividerColor: string;

  @Input() x: number;
  @Input() y: number;
  @Input() rx: number;
  @Input() ry: number;
  @Input() width: number;
  @Input() height: number;
  @Input() label: string;
  @Input() data: any;
  @Input() medianSize: number;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() animations: boolean = true;
  @Input() divider = false;
  @Input() dividerWidth = 1;
  @Input() xPadding = 15;
  
  @Output() select = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;
  @ViewChild('paddedTextEl') paddedTextEl: ElementRef;

  element: HTMLElement;
  value: string = '';
  paddedValue: string = '';
  transform: string;
  formattedLabel: string;
  cardWidth: number;
  cardHeight: number;
  textWidth: number;
  textHeight: number;
  textFontSize: number = 12;
  textTransform: string = '';
  initialized: boolean = false;
  animationReq: any;

  bandHeight: number = 10;
  transformBand: string;
  textPadding = [10, 20, 5, 20];
  labelFontSize = 15;
  dotRadius: number = 2;
  dotX: number;
  dividerX = -this.xPadding / 2;
  dividerHeight = this.textPadding[0] + this.height - this.textPadding[2];

  bandPath: string;

  constructor(element: ElementRef, private cd: ChangeDetectorRef, private zone: NgZone) {
    this.element = element.nativeElement;
  }

  ngOnInit() {
    this.update();
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngOnDestroy(): void {
    cancelAnimationFrame(this.animationReq);
  }

  onClick(): void {
    this.select.emit({
      name: this.data.name,
      value: this.data.value
    });
  }

  private update(): void {
    this.zone.run(() => {
      const hasValue = this.data && typeof this.data.value !== 'undefined';
      const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());
      const labelFormatting = this.labelFormatting || (card => trimLabel(card.label, 55));

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

      this.formattedLabel = labelFormatting(cardData);
      this.transformBand = `translate(0 , ${this.cardHeight - this.bandHeight})`;

      this.value = hasValue ? valueFormatting(cardData) : '';
      this.paddedValue = this.getPaddedValue(this.value);

      const r = Math.min((this.rx + this.ry) / 2, this.bandHeight);
      this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, r, [false, false, true, true]);
      this.scaleText();
      this.setPadding();

      setTimeout(() => {
        this.scaleText();
        this.setPadding();
        if (hasValue && !this.initialized) {
          setTimeout(() => this.startCount(), 20);
        }
      }, 8);
    });
  }

  private getPaddedValue(value: string) {
    if (this.medianSize && this.medianSize > value.length) {
      value += '\u2007'.repeat(this.medianSize - value.length);
    }
    return value;
  }

  private startCount(): void {
    if (!this.initialized && this.animations) {
      cancelAnimationFrame(this.animationReq);

      const val = this.data.value;
      const decs = decimalChecker(val);
      const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());

      const callback = ({value, finished}) => {
        this.zone.run(() => {
          value = finished ? val : value;
          this.value = valueFormatting({label: this.label, data: this.data, value});
          this.setPadding();
        });
      };

      this.animationReq = count(0, val, decs, 1, callback);
      this.initialized = true;
    }
  }

  /* Uses the final value to scale the font size */
  private scaleText(): void {
    const { width, height } = this.paddedTextEl.nativeElement.getBoundingClientRect();

    this.textHeight = height;

    if (width === 0 || height === 0) return;

    const textPadding = this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
    const availableWidth = this.cardWidth - 2 * textPadding;
    const availableHeight = this.cardHeight / 3;

    const resizeScale = Math.min(availableWidth / width, availableHeight / height);
    this.textFontSize = Math.floor(this.textFontSize * resizeScale);
    this.labelFontSize = Math.min(this.textFontSize, 15);

    this.cd.markForCheck();
  }

  /* Uses the intermediate value to set padding and accessaary elements */
  private setPadding(): void {
    const { width, height } = this.textEl.nativeElement.getBoundingClientRect();

    const availableWidth = this.cardWidth - this.textPadding[1] - this.textPadding[3];
    const valueSpaceLeft = Math.max(0, (availableWidth - width) / 2);

    this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
    const padding = this.cardHeight / 2;
    this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
    this.textPadding[2] = padding - this.labelFontSize;

    this.dotRadius = this.textFontSize / 6;
    this.dotX = Math.max(
      this.textPadding[3] / 2,
      this.textPadding[3] + valueSpaceLeft - this.dotRadius - this.textFontSize / 4
    );
    this.dotRadius = Math.min(this.textFontSize / 4, this.dotX, 4);

    this.dividerX = -this.xPadding / 2;
    this.dividerHeight = this.cardHeight - this.textPadding[0];
    
    this.cd.markForCheck();
  }
}
