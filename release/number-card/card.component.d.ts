import { EventEmitter, ElementRef, OnInit } from '@angular/core';
export declare class Card implements OnInit {
    element: HTMLElement;
    transform: string;
    trimmedLabel: string;
    value: string;
    cardWidth: number;
    cardHeight: number;
    textWidth: number;
    color: any;
    x: any;
    y: any;
    width: any;
    height: any;
    label: any;
    data: any;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef);
    ngOnInit(): void;
    update(): void;
    loadAnimation(): void;
    animateToCurrentForm(): void;
    click(): void;
}
