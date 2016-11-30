import { EventEmitter, OnChanges } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
export declare class XAxisComponent implements OnChanges {
    xScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    xAxisTickInterval: any;
    dimensionsChanged: EventEmitter<{}>;
    xAxisTickCount: any;
    xAxisClassName: any;
    xOrient: any;
    tickArguments: any;
    xAxisOffset: any;
    transform: any;
    labelOffset: number;
    ticksComponent: XAxisTicksComponent;
    constructor();
    ngOnChanges(): void;
    update(): void;
    emitTicksHeight({height}: {
        height: any;
    }): void;
}
