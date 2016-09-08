/// <reference types="core-js" />
import { EventEmitter, OnInit } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export declare class DateBar extends BaseChart implements OnInit {
    dims: ViewDimensions;
    xScale: any;
    yScale: any;
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
    click(data: any): void;
    setColors(): void;
    update(): void;
}
