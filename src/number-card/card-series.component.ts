import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';

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
    <svg:g>
      <svg:g card *ngFor="let c of cards"
        [x]="c.x"
        [y]="c.y"
        [width]="c.width"
        [height]="c.height"
        [color]="c.color"
        [data]="c.data"
        (clickHandler)="click($event)"
        swPopover
        [popoverSpacing]="15"
        [popoverText]="c.tooltipText"
        [popoverGroup]="'charts'"
      />
    </svg:g>
  `
})
export class CardSeries implements OnInit {
  cards: CardModel[];

  @Input() data;
  @Input() dims;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.cards = this.getCards();
  }

  getCards() {
    return this.data
      .map((d, index) => {
        let label = d.data.label[1];
        let value = d.data.value;
        return {
          x: d.x,
          y: d.y,
          width: d.width,
          height: d.height,
          color: this.colors(label),
          label: d.data.label,
          data: d.data,
          tooltipText: `${label}: ${value}`
        };
      });
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
