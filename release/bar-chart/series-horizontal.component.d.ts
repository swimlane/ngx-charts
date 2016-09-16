import { EventEmitter, OnChanges } from '@angular/core';
export declare class SeriesHorizontal implements OnChanges {
    bars: any;
    x: any;
    y: any;
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    colors: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(changes: any): void;
    update(): void;
    trackBy(index: any, bar: any): any;
    click(data: any): void;
}
