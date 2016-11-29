import { EventEmitter, OnChanges, NgZone } from '@angular/core';
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
    private zone;
    cards: CardModel[];
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    constructor(zone: NgZone);
    ngOnChanges(): void;
    update(): void;
    getCards(): any;
    trackBy(index: any, card: any): any;
    click(data: any): void;
}
