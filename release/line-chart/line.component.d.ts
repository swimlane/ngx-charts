import { EventEmitter, OnChanges, ElementRef } from '@angular/core';
export declare class Line implements OnChanges {
    element: ElementRef;
    path: any;
    stroke: any;
    data: any;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnChanges(): void;
}
