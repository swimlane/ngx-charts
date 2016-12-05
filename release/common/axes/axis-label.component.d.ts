import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class AxisLabelComponent implements OnChanges {
    orient: any;
    label: any;
    offset: any;
    width: any;
    height: any;
    x: any;
    y: any;
    transform: any;
    strokeWidth: any;
    textAnchor: any;
    element: ElementRef;
    textHeight: number;
    margin: number;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
}
