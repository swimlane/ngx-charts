import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class TreeMapCellComponent implements OnChanges {
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    value: any;
    valueType: any;
    clickHandler: EventEmitter<{}>;
    element: HTMLElement;
    transform: string;
    formattedValue: string;
    initialized: boolean;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    onClick(): void;
}
