import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import { XAxisTicksComponent } from './x-axis-ticks.component';
export declare class XAxisComponent implements OnChanges {
    xScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    ticks: any[];
    xAxisTickInterval: any;
    xAxisTickCount: any;
    xOrient: string;
    xAxisOffset: number;
    dimensionsChanged: EventEmitter<{}>;
    xAxisClassName: string;
    tickArguments: any;
    transform: any;
    labelOffset: number;
    fill: string;
    stroke: string;
    tickStroke: string;
    strokeWidth: string;
    padding: number;
    ticksComponent: XAxisTicksComponent;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    emitTicksHeight({height}: {
        height: any;
    }): void;
}
