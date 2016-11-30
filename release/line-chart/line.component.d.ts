import { EventEmitter, OnChanges, ElementRef } from '@angular/core';
export declare class LineComponent implements OnChanges {
    path: any;
    stroke: any;
    data: any;
    clickHandler: EventEmitter<{}>;
    element: ElementRef;
    constructor(element: ElementRef);
    ngOnChanges(): void;
}
