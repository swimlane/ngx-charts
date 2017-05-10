import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
import { YAxisTicksComponent } from './y-axis-ticks.component';
export declare class YAxisComponent implements OnChanges {
    yScale: any;
    dims: any;
    tickFormatting: any;
    showGridLines: boolean;
    showLabel: any;
    labelText: any;
    yAxisTickInterval: any;
    yAxisTickCount: any;
    dimensionsChanged: EventEmitter<{}>;
    yAxisClassName: string;
    tickArguments: any;
    offset: any;
    transform: any;
    yAxisOffset: number;
    yOrient: string;
    labelOffset: number;
    fill: string;
    stroke: string;
    tickStroke: string;
    strokeWidth: number;
    ticksComponent: YAxisTicksComponent;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    emitTicksWidth({width}: {
        width: any;
    }): void;
}
