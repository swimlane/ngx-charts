import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class PieGridSeriesComponent implements OnChanges {
    colors: any;
    data: any;
    innerRadius: number;
    outerRadius: number;
    clickHandler: EventEmitter<{}>;
    element: HTMLElement;
    layout: any;
    arcs: any;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    getArcs(): any[];
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
    label(arc: any): string;
    color(arc: any): any;
}
