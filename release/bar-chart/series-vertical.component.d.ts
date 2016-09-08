import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class SeriesVertical implements OnInit, OnChanges {
    bars: any;
    x: any;
    y: any;
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: string;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnChanges(changes: any): void;
    update(): void;
    click(data: any): void;
}
