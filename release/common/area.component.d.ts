import { SimpleChanges, EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
export declare class AreaComponent implements OnChanges {
    private location;
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
    select: EventEmitter<{}>;
    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
    areaPath: string;
    initialized: boolean;
    gradientStops: any[];
    hasGradient: boolean;
    constructor(element: ElementRef, location: Location);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    getGradient(): any[];
}
