import { EventEmitter, ElementRef } from '@angular/core';
export declare class LineComponent {
    path: any;
    stroke: any;
    data: any;
    select: EventEmitter<{}>;
    element: ElementRef;
    constructor(element: ElementRef);
}
