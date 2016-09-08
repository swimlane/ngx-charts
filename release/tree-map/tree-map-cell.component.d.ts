import { EventEmitter, ElementRef, OnInit } from '@angular/core';
export declare class TreeMapCell implements OnInit {
    element: HTMLElement;
    transform: string;
    formattedValue: string;
    fill: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    value: any;
    valueType: any;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    click(): void;
}
