import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class HeatMapCell implements OnChanges {
    element: HTMLElement;
    transform: string;
    activeRange: any[];
    startOpacity: number;
    gradientId: string;
    gradientUrl: string;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    data: any;
    label: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    click(): void;
}
