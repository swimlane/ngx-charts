import {
  Component, Input, Output, EventEmitter, ElementRef,
  SimpleChanges, OnChanges, ViewChild, ChangeDetectionStrategy,
  ChangeDetectorRef, NgZone, OnDestroy
} from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { invertColor } from '../utils/color-utils';
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
          [style.color]="getTextColor(color)"
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
        dy=".35em"
        class="value-text"
        [style.fill]="getTextColor(color)"
        text-anchor="middle"
        [style.font-size.pt]="textFontSize"
        style="pointer-events: none;">
        {{value}}
      </svg:text>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardComponent implements OnChanges, OnDestroy {

  @Input() color;
  @Input() x;
  @Input() y;
  @Input() width;
  @Input() height;
  @Input() label;
  @Input() data;

  @Output() select = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

  element: HTMLElement;
  value: string = '';
  transform: string;
  trimmedLabel: string;
  cardWidth: number;
  cardHeight: number;
  textWidth: number;
  resizeScale: number = 1;
  textFontSize: number = 35;
  textTransform: string = '';
  originalWidth: number;
  originalHeight: number;
  originalWidthRatio: number;
  originalHeightRatio: number;
  initialized: boolean = false;
  animationReq: any;

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
    this.zone.run(() => {
      this.transform = `translate(${this.x} , ${this.y})`;

      this.textWidth = Math.max(0, this.width - 15);
      this.cardWidth = Math.max(0, this.width - 5);
      this.cardHeight = Math.max(0, this.height - 5);

      this.label = this.data.name;
      this.trimmedLabel = trimLabel(this.label, 55);
      this.value = this.data.value.toLocaleString();

      setTimeout(() => this.scaleText());
      setTimeout(() => this.startCount(), 20);
    });
  }

  getTextColor(color): string {
    return invertColor(color);
  }

  startCount(): void {
    if (!this.initialized) {
      cancelAnimationFrame(this.animationReq);

      const val = this.data.value;
      const decs = decimalChecker(val);

      const callback = ({ value }) => {
        this.zone.run(() => {
          this.value = value.toLocaleString();
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

      const availableWidth = this.cardWidth * 0.85;
      const availableHeight = this.cardHeight * 0.60;

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

      this.resizeScale = Math.min(newWidthRatio, newHeightRatio);

      this.textFontSize = Number.parseInt((35 * this.resizeScale).toString());
      this.cd.markForCheck();
    });
  }

  onClick(): void {
    this.select.emit({
      name: this.data.name,
      value: this.data.value
    });
  }

}
