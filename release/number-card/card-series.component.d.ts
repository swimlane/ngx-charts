import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
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
    animations: boolean;
    select: EventEmitter<{}>;
    cards: CardModel[];
    emptySlots: any[];
    medianSize: number;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCards(): any[];
    trackBy(index: any, card: any): string;
    onClick(data: any): void;
}
