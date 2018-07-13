import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy
} from '@angular/core';
import { invertColor } from '../utils/color-utils';

export interface CardModel {
  x;
  y;
  width: number;
  height: number;
  color: string;
  label: string;
  data;
  tooltipText: string;

  bandColor: string;
  textColor: string;
}

@Component({
  selector: 'g[ngx-charts-card-series]',
  template: `
    <svg:rect
      *ngFor="let c of emptySlots; trackBy:trackBy"
      class="card-empty"
      [attr.x]="c.x"
      [attr.y]="c.y"
      [style.fill]="emptyColor"
      [attr.width]="c.width"
      [attr.height]="c.height"
      [attr.rx]="rx"
      [attr.ry]="ry"
    />
    <svg:g ngx-charts-card *ngFor="let c of cards; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [rx]="rx"
      [ry]="ry"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [textColor]="c.textColor"
      [dividerColor]="dividerColor"
      [data]="c.data"
      [divider]="c.divider"
      [xPadding]="xPadding"
      [medianSize]="medianSize"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [animations]="animations"
      (select)="onClick($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSeriesComponent implements OnChanges {

  @Input() data: any[];
  @Input() slots: any[];
  @Input() dims;
  @Input() size;
  @Input() colors;
  @Input() innerPadding = 15;
  @Input() borderRadius = 3;

  @Input() cardColor;
  @Input() bandColor;
  @Input() emptyColor = 'rgba(0, 0, 0, 0)';
  @Input() textColor;
  @Input() dividerColor;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  cards: CardModel[];
  emptySlots: any[];
  medianSize: number;
  rx = 3;
  ry = 3;
  xPadding = 0;
  yPadding = 0;
  strokeArray = '';
  lines: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    if (this.data.length > 2) {
      const valueFormatting = this.valueFormatting || (card => card.value.toLocaleString());

      const sortedLengths = this.data
        .map(d => {
          const hasValue = d && d.data && typeof d.data.value !== 'undefined' && d.data.value !== null;
          return hasValue ? valueFormatting({
            data: d.data,
            label: d ? d.data.name : '',
            value: (d && d.data) ? d.data.value : ''
          }).length : 0;
        })
        .sort((a, b) => b - a);
      const idx = Math.ceil(this.data.length / 2);
      this.medianSize = sortedLengths[idx];
    }

    const cards = this.getCards();
    this.cards = cards.filter(d => d.data.value !== null);
    this.emptySlots = cards.filter(d => d.data.value === null);
  }

  getCards(): CardModel[] {
    this.xPadding = (this.getDimension(this.innerPadding, 1, this.size[0], this.dims.width) +
      this.getDimension(this.innerPadding, 3, this.size[0], this.dims.width)) / 2;
    this.yPadding = (this.getDimension(this.innerPadding, 0, this.size[1], this.dims.height) +
      this.getDimension(this.innerPadding, 2, this.size[1], this.dims.height)) / 2;

    this.rx = this.getDimension(this.borderRadius, 0, this.size[0], this.dims.width);
    this.ry = this.getDimension(this.borderRadius, 1, this.size[1], this.dims.height);

    const height = this.data[0] ? this.data[0].height : 0;
    this.strokeArray = [0, this.yPadding, height - 3 * this.yPadding, 2 * this.yPadding].join(' ');

    this.lines = [];

    return this.data
      .map((d, index) => {
        let label = d.data.name;
        if (label && label.constructor.name === 'Date') {
          label = label.toLocaleDateString();
        } else {
          label = label ? label.toLocaleString() : label;
        }
        d.data.name = label;

        const value = d.data.value;
        const valueColor = label ? this.colors.getColor(label) : this.emptyColor;
        const color = this.cardColor || valueColor || '#000';
        return {
          x: d.x,
          y: d.y,
          width: d.width - this.xPadding,
          height: d.height - this.yPadding,
          color,
          bandColor: this.bandColor || valueColor,
          textColor: this.textColor || invertColor(color),
          label,
          data: d.data,
          tooltipText: `${label}: ${value}`,
          divider: index % this.size[0] !== 0
        };
      });
  }

  trackBy(index, card): string {
    return card.label;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  /**
   * Converts the input to gap paddingInner in fraction
   * Supports the following inputs:
   *    Numbers: 8
   *    Strings: "8", "8px", "8%"
   *    Arrays: [8,2], "8,2", "[8,2]"
   *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
   *
   * @param {(string | number | Array<string | number>)} value
   * @param {number} [index=0]
   * @param {number} N
   * @param {number} L
   * @returns {number}
   */
  getDimension(value: string | number | Array<string | number>, index = 0, N: number, L: number): number {
    if (typeof value === 'string') {
      value = value
        .replace('[', '')
        .replace(']', '')
        .replace('px', '')
        .replace('\'', '');

      if (value.includes(',')) {
        value = value.split(',');
      }
    }
    if (Array.isArray(value) && typeof index === 'number') {
      return this.getDimension(value[index], null, N, L);
    }
    if (typeof value === 'string' && value.includes('%')) {
      const p = +value.replace('%', '') / 100;
      return  L / (N / p + N - 1);
    }
    return +value || 0;
  }
}
