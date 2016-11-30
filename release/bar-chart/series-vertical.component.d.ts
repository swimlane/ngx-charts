import { EventEmitter, OnChanges } from '@angular/core';
export declare class SeriesVerticalComponent implements OnChanges {
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: string;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    bars: any;
    x: any;
    y: any;
    ngOnChanges(changes: any): void;
    update(): void;
    trackBy(index: any, bar: any): string;
    onClick(data: any): void;
}
