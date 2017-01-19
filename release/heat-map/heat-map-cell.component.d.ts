import { EventEmitter, SimpleChanges, ElementRef, OnChanges } from '@angular/core';
import { Location } from '@angular/common';
export declare class HeatMapCellComponent implements OnChanges {
    private location;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    data: any;
    label: any;
    gradient: boolean;
    select: EventEmitter<{}>;
    element: HTMLElement;
    transform: string;
    activeRange: any[];
    startOpacity: number;
    gradientId: string;
    gradientUrl: string;
    gradientStops: any[];
    constructor(element: ElementRef, location: Location);
    ngOnChanges(changes: SimpleChanges): void;
    getGradientStops(): {
        offset: number;
        color: any;
        opacity: number;
    }[];
    loadAnimation(): void;
    animateToCurrentForm(): void;
    onClick(): void;
}
