import { EventEmitter, OnChanges } from '@angular/core';
export declare class AreaSeries implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    stacked: boolean;
    normalized: boolean;
    gradient: any;
    curve: any;
    clickHandler: EventEmitter<{}>;
    opacity: number;
    path: string;
    startingPath: string;
    ngOnChanges(): void;
    update(): void;
}
