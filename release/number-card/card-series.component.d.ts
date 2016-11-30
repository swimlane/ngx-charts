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
export declare class CardSeriesComponent implements OnChanges {
    private zone;
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    cards: CardModel[];
    constructor(zone: NgZone);
    ngOnChanges(): void;
    update(): void;
    getCards(): any[];
    trackBy(index: any, card: any): string;
    onClick(data: any): void;
}
