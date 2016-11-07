import { EventEmitter, OnChanges } from '@angular/core';
export declare class AreaSeries implements OnChanges {
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
    curve: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
}
