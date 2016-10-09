import { OnChanges } from '@angular/core';
export declare class XAxis implements OnChanges {
    xScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    xAxisTickInterval: any;
    xAxisTickCount: any;
    xAxisClassName: any;
    xOrient: any;
    tickArguments: any;
    xAxisOffset: any;
    transform: any;
    constructor();
    ngOnChanges(): void;
    update(): void;
}
