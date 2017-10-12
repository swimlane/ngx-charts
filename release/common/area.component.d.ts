import { SimpleChanges, EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class AreaComponent implements OnChanges {
    data: any;
    path: any;
    startingPath: any;
    fill: any;
    opacity: number;
    startOpacity: number;
    endOpacity: number;
    activeLabel: any;
    gradient: boolean;
    stops: any[];
    animations: boolean;
    select: EventEmitter<{}>;
    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
    areaPath: string;
    initialized: boolean;
    gradientStops: any[];
    hasGradient: boolean;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    loadAnimation(): void;
    updatePathEl(): void;
    getGradient(): any[];
}
