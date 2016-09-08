import { EventEmitter, OnInit } from '@angular/core';
export declare class Circle implements OnInit {
    cx: any;
    cy: any;
    r: any;
    fill: any;
    stroke: any;
    data: any;
    classNames: any;
    circleOpacity: any;
    pointerEvents: any;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    click(): void;
}
