/// <reference types="core-js" />
import { ElementRef, OnInit, OnChanges } from '@angular/core';
export declare class PieLabel implements OnInit, OnChanges {
    element: HTMLElement;
    trimLabel: Function;
    labelXY: any;
    transform: string;
    line: string;
    data: any;
    radius: any;
    label: any;
    color: any;
    max: any;
    value: any;
    explodeSlices: any;
    constructor(element: ElementRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    textAnchor(): string;
    midAngle(d: any): any;
    loadAnimation(): void;
}
