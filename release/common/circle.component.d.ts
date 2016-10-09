import { EventEmitter, OnChanges } from '@angular/core';
export declare class Circle implements OnChanges {
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
    ngOnChanges(): void;
    click(): void;
}
