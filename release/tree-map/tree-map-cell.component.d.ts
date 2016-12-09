import { EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class TreeMapCellComponent implements OnChanges {
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    value: any;
    valueType: any;
    select: EventEmitter<{}>;
    element: HTMLElement;
    transform: string;
    formattedValue: string;
    initialized: boolean;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    loadAnimation(): void;
    getTextColor(): string;
    animateToCurrentForm(): void;
    onClick(): void;
}
