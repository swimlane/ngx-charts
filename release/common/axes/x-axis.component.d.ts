import { OnInit, OnChanges } from '@angular/core';
export declare class XAxis implements OnInit, OnChanges {
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
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
}
