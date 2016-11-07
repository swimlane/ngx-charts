import { EventEmitter, OnChanges } from '@angular/core';
import { YAxisTicks } from './y-axis-ticks.component';
export declare class YAxis implements OnChanges {
    yScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    yAxisTickInterval: any;
    dimensionsChanged: EventEmitter<{}>;
    yAxisTickCount: any;
    tickArguments: any;
    offset: any;
    transform: any;
    yAxisOffset: any;
    yOrient: any;
    labelOffset: number;
    ticksComponent: YAxisTicks;
    constructor();
    ngOnChanges(): void;
    update(): void;
    emitTicksWidth({width}: {
        width: any;
    }): void;
}
