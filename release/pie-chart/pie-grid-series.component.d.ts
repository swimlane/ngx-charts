import { EventEmitter, ElementRef, OnInit, OnChanges } from '@angular/core';
export declare class PieGridSeries implements OnInit, OnChanges {
    element: HTMLElement;
    layout: any;
    arcs: any;
    colors: any;
    data: any;
    innerRadius: number;
    outerRadius: number;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getArcs(): any;
    loadAnimation(): void;
    calculateArc(innerRadius: any, outerRadius: any): any;
    click(data: any): void;
}
