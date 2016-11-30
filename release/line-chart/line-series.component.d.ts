import { OnChanges } from '@angular/core';
export declare class LineSeriesComponent implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    curve: string;
    path: string;
    ngOnChanges(): void;
    update(): void;
}
