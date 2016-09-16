import { OnChanges } from '@angular/core';
export declare class YAxis implements OnChanges {
    yScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    yAxisTickInterval: any;
    yAxisTickCount: any;
    tickArguments: any;
    offset: any;
    transform: any;
    yAxisOffset: any;
    yOrient: any;
    constructor();
    ngOnChanges(): void;
    update(): void;
}
