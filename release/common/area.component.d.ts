import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class Area implements OnChanges {
    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
    areaPath: string;
    initialized: boolean;
    data: any;
    path: any;
    startingPath: any;
    fill: any;
    opacity: number;
    startOpacity: number;
    endOpacity: number;
    activeLabel: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
}
