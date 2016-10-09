import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class TreeMapCell implements OnChanges {
    element: HTMLElement;
    transform: string;
    formattedValue: string;
    initialized: boolean;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    value: any;
    valueType: any;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    click(): void;
}
