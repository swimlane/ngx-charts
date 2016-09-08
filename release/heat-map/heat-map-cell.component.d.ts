import { EventEmitter, ElementRef, OnInit } from '@angular/core';
export declare class HeatMapCell implements OnInit {
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
    ngOnInit(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    click(): void;
}
