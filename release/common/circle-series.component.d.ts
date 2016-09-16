import { EventEmitter, OnChanges } from '@angular/core';
export declare class CircleSeries implements OnChanges {
    areaPath: any;
    circles: any[];
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    color: any;
    strokeColor: any;
    scaleType: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getCircles(): any;
    click(value: any, label: any): void;
}
