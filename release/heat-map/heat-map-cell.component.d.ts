import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class HeatMapCellComponent implements OnChanges {
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    data: any;
    label: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    element: HTMLElement;
    transform: string;
    activeRange: any[];
    startOpacity: number;
    gradientId: string;
    gradientUrl: string;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    onClick(): void;
}
