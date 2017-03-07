import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  NgZone
} from '@angular/core';
import { gridSize, gridLayout } from '../common/grid-layout.helper';

export interface CardModel {
  x;
  y;
  width: number;
  height: number;
  color: string;
  label: string;
  data;
  tooltipText: string;
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
      rx="3"
      ry="3"
    />
    <svg:g ngx-charts-card *ngFor="let c of cards; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [bandColor]="c.bandColor"
      [data]="c.data"
      [medianSize]="medianSize"
      (select)="onClick($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSeriesComponent implements OnChanges {

  @Input() data: any[];
  @Input() slots: any[];
  @Input() dims;
  @Input() colors;
  @Input() innerPadding = 2.5;

  @Input() cardColor;
  @Input() bandColor;
  @Input() emptyColor = 'rgba(0, 0, 0, 0)';

  @Output() select = new EventEmitter();

  cards: CardModel[];
  emptySlots: any[];
  medianSize: number;

  constructor(private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.zone.run(() => {

      if (this.data.length > 2) {
        const sortedLengths = this.data.map(d => ('' + d.data.value).length).sort((a, b) => b - a);
        const idx = Math.ceil(this.data.length / 2);
        this.medianSize = sortedLengths[idx];
      }

      const cards = this.getCards();
      this.cards = cards.filter(d => d.data.value !== null);
      this.emptySlots = cards.filter(d => d.data.value === null);
    });
  }

  getCards(): any[] {
    const yPadding = typeof this.innerPadding === 'number' ?
      this.innerPadding :
      this.innerPadding[0] + this.innerPadding[2];
    const xPadding = typeof this.innerPadding === 'number' ?
      this.innerPadding :
      this.innerPadding[1] + this.innerPadding[3];

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
        const labelColor = label ? this.colors.getColor(label) : this.emptyColor;
        return {
          x: d.x,
          y: d.y,
          width: d.width - xPadding,
          height: d.height - yPadding,
          color: this.cardColor || labelColor,
          bandColor: this.bandColor || labelColor,
          label,
          data: d.data,
          tooltipText: `${label}: ${value}`
        };
      });
  }

  trackBy(index, card): string {
    return card.label;
  }

  onClick(data): void {
    this.select.emit(data);
  }

}
