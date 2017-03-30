import { EventEmitter, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class PieGridSeriesComponent implements OnChanges {
    colors: any;
    data: any;
    innerRadius: number;
    outerRadius: number;
    select: EventEmitter<{}>;
    element: HTMLElement;
    layout: any;
    arcs: any;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getArcs(): any[];
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
    label(arc: any): string;
    color(arc: any): any;
}
