import { EventEmitter, OnChanges } from '@angular/core';
export declare class CircleSeries implements OnChanges {
    areaPath: any;
    circles: any[];
    barVisible: boolean;
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    color: any;
    strokeColor: any;
    scaleType: any;
    visibleValue: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getCircles(): any;
    click(value: any, label: any): void;
}
