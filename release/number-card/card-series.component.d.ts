import { EventEmitter, OnChanges } from '@angular/core';
export interface CardModel {
    x: any;
    y: any;
    width: number;
    height: number;
    color: string;
    label: string;
    data: any;
    tooltipText: string;
}
export declare class CardSeries implements OnChanges {
    cards: CardModel[];
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getCards(): any;
    click(data: any): void;
}
