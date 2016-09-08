import { EventEmitter, OnInit, OnChanges } from '@angular/core';
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
export declare class CardSeries implements OnInit, OnChanges {
    cards: CardModel[];
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getCards(): any;
    click(data: any): void;
}
