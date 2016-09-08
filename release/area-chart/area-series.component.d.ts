import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class AreaSeries implements OnInit, OnChanges {
    opacity: number;
    path: string;
    startingPath: string;
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    stacked: boolean;
    normalized: boolean;
    gradient: any;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
}
