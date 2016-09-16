import { OnChanges } from '@angular/core';
export declare class LineSeries implements OnChanges {
    path: string;
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    ngOnChanges(): void;
    update(): void;
}
