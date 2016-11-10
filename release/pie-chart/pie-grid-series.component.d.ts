import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class PieGridSeries implements OnChanges {
    element: HTMLElement;
    layout: any;
    arcs: any;
    colors: any;
    data: any;
    innerRadius: number;
    outerRadius: number;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    getArcs(): any;
    click(data: any): void;
    trackBy(index: any, item: any): any;
    label(arc: any): any;
    color(arc: any): any;
}
