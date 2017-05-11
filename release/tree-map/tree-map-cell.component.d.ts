import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
import { LocationStrategy } from '@angular/common';
export declare class TreeMapCellComponent implements OnChanges {
    private location;
    data: any;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    value: any;
    valueType: any;
    valueFormatting: any;
    labelFormatting: any;
    gradient: boolean;
    select: EventEmitter<{}>;
    gradientStops: any[];
    gradientId: string;
    gradientUrl: string;
    element: HTMLElement;
    transform: string;
    formattedLabel: string;
    initialized: boolean;
    constructor(element: ElementRef, location: LocationStrategy);
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    getTextColor(): string;
    animateToCurrentForm(): void;
    onClick(): void;
    getGradientStops(): {
        offset: number;
        color: any;
        opacity: number;
    }[];
}
