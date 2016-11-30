import { EventEmitter, OnChanges } from '@angular/core';
export declare class CircleSeriesComponent implements OnChanges {
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    color: any;
    strokeColor: any;
    scaleType: any;
    visibleValue: any;
    clickHandler: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    barVisible: boolean;
    ngOnChanges(): void;
    update(): void;
    getCircles(): any[];
    onClick(value: any, label: any): void;
}
