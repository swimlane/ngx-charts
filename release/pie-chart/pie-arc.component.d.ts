import { EventEmitter, ElementRef, OnInit } from '@angular/core';
export declare class PieArc implements OnInit {
    element: HTMLElement;
    path: any;
    startOpacity: number;
    radialGradientId: string;
    linearGradientId: string;
    gradientFill: string;
    fill: any;
    startAngle: any;
    endAngle: any;
    innerRadius: any;
    outerRadius: any;
    value: any;
    total: any;
    max: any;
    data: any;
    explodeSlices: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    calculateArc(): any;
    loadAnimation(): void;
    click(): void;
}
