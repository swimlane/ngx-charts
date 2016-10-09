import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class PieArc implements OnChanges {
    element: HTMLElement;
    path: any;
    startOpacity: number;
    radialGradientId: string;
    linearGradientId: string;
    gradientFill: string;
    initialized: boolean;
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
    ngOnChanges(): void;
    update(): void;
    calculateArc(): any;
    loadAnimation(): void;
    updateAnimation(): void;
    click(): void;
}
