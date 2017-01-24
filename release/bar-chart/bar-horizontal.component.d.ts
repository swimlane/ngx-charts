import { EventEmitter } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarHorizontalComponent extends BaseChartComponent {
    legend: boolean;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    yAxisLabel: any;
    gradient: boolean;
    showGridLines: boolean;
    activeEntries: any[];
    schemeType: string;
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
    barPadding: number;
    roundDomains: boolean;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dims: ViewDimensions;
    yScale: any;
    xScale: any;
    xDomain: any;
    yDomain: any;
    transform: string;
    colors: ColorHelper;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: any;
    update(): void;
    getXScale(): any;
    getYScale(): any;
    getXDomain(): any[];
    getYDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
    getLegendOptions(): {
        scaleType: string;
        colors: any;
        domain: any[];
    };
    updateYAxisWidth({width}: {
        width: any;
    }): void;
    updateXAxisHeight({height}: {
        height: any;
    }): void;
    onActivate(item: any): void;
    onDeactivate(item: any): void;
}
