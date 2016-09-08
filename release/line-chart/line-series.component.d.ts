import { OnInit, OnChanges } from '@angular/core';
export declare class LineSeries implements OnInit, OnChanges {
    path: string;
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
}
