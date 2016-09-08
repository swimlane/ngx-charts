import { EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
export declare class Area implements OnInit, OnChanges {
    element: HTMLElement;
    gradientId: string;
    gradientFill: string;
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
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
}
