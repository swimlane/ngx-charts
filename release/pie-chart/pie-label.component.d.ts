
import { ElementRef, OnChanges, SimpleChanges } from '@angular/core';
export declare class PieLabelComponent implements OnChanges {
    data: any;
    radius: any;
    label: any;
    color: any;
    max: any;
    value: any;
    explodeSlices: any;
    element: HTMLElement;
    trimLabel: Function;
    labelXY: any;
    transform: string;
    line: string;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    textAnchor(): any;
    midAngle(d: any): number;
    loadAnimation(): void;
}
