/// <reference types="core-js" />
import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export declare class BarHorizontal extends BaseChart implements OnInit, OnChanges {
    dims: ViewDimensions;
    yScale: any;
    xScale: any;
    xDomain: any;
    yDomain: any;
    transform: string;
    colors: Function;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    legend: boolean;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    yAxisLabel: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getXScale(): any;
    getYScale(): any;
    getXDomain(): number[];
    getYDomain(): any;
    yAxisTickFormatting(): any;
    click(data: any): void;
    setColors(): void;
}
