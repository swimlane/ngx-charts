import { EventEmitter, ElementRef, OnChanges } from '@angular/core';
export declare class Timeline implements OnChanges {
    element: HTMLElement;
    dims: any;
    xDomain: any[];
    yDomain: any[];
    xScale: any;
    brush: any;
    transform: string;
    margin: number[];
    initialized: boolean;
    view: any;
    state: any;
    results: any;
    scheme: any;
    customColors: any;
    legend: any;
    miniChart: any;
    autoScale: any;
    scaleType: any;
    clickHandler: EventEmitter<{}>;
    onDomainChange: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
    update(): void;
    getXDomain(): any[];
    getYDomain(): void;
    getXScale(): any;
    getYScale(): void;
    addBrush(): void;
    getDims(): {
        width: number;
        height: number;
    };
}
