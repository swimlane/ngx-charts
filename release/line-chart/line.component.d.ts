import { EventEmitter, ElementRef } from '@angular/core';
export declare class LineComponent {
    private element;
    path: any;
    stroke: any;
    data: any;
    fill: string;
    select: EventEmitter<{}>;
    constructor(element: ElementRef);
}
