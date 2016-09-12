import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class Timeline implements OnChanges {
    element: HTMLElement;
    dims: any;
    xScale: any;
    brush: any;
    transform: string;
    view: any;
    state: any;
    results: any;
    scheme: any;
    margin: number[];
    customColors: any;
    legend: any;
    miniChart: any;
    autoScale: any;
    clickHandler: EventEmitter<{}>;
    updateXDomain: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    addBrush(): void;
    calculateXScale(): any;
    calculateDims(): {
        width: number;
        height: number;
    };
}
