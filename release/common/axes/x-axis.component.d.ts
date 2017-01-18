import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
export declare class XAxisComponent implements OnChanges {
    xScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    xAxisTickInterval: any;
    xAxisTickCount: any;
    dimensionsChanged: EventEmitter<{}>;
    xAxisClassName: string;
    xOrient: string;
    tickArguments: any;
    transform: any;
    labelOffset: number;
    fill: string;
    stroke: string;
    tickStroke: string;
    strokeWidth: string;
    xAxisOffset: number;
    ticksComponent: XAxisTicksComponent;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    emitTicksHeight({height}: {
        height: any;
    }): void;
}
