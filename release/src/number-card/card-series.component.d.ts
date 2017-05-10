import { EventEmitter, OnChanges, SimpleChanges, NgZone } from '@angular/core';
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
    data: any[];
    slots: any[];
    dims: any;
    colors: any;
    innerPadding: number;
    cardColor: any;
    bandColor: any;
    emptyColor: string;
    textColor: any;
    valueFormatting: any;
    labelFormatting: any;
    select: EventEmitter<{}>;
    cards: CardModel[];
    emptySlots: any[];
    medianSize: number;
    constructor(zone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCards(): any[];
    trackBy(index: any, card: any): string;
    onClick(data: any): void;
}
