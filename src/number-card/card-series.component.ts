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
  selector: 'g[cardSeries]',
  template: `
    <svg:g card *ngFor="let c of cards; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [color]="c.color"
      [data]="c.data"
      (clickHandler)="onClick($event)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CardSeriesComponent implements OnChanges {

  @Input() data;
  @Input() dims;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  cards: CardModel[];

  constructor(private zone: NgZone) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.zone.run(() => {
      this.cards = this.getCards();
    });
  }

  getCards(): any[] {
    return this.data
      .map((d, index) => {
        let label = d.data.name;
        if (label.constructor.name === 'Date') {
          label = label.toLocaleDateString();
        } else {
          label = label.toLocaleString();
        }
        d.data.name = label;

        let value = d.data.value;
        return {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          color: this.colors(label),
          label: label,
          data: d.data,
          tooltipText: `${label}: ${value}`
        };
      });
  }

  trackBy(index, card): string {
    return card.label;
  }

  onClick(data): void {
    this.clickHandler.emit(data);
  }

}
