import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
export declare class CircleComponent implements OnChanges {
    cx: any;
    cy: any;
    r: any;
    fill: any;
    stroke: any;
    data: any;
    classNames: any;
    circleOpacity: any;
    pointerEvents: any;
    select: EventEmitter<{}>;
    ngOnChanges(changes: SimpleChanges): void;
}
