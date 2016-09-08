import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class CircleSeries implements OnInit, OnChanges {
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
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getCircles(): any;
    click(value: any, label: any): void;
}
