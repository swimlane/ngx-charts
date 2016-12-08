
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, SimpleChanges, NgZone, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarVerticalComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
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
    showGridLines: boolean;
    activeEntries: any[];
    clickHandler: EventEmitter<{}>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dims: ViewDimensions;
    xScale: any;
    yScale: any;
    xDomain: any;
    yDomain: any;
    transform: string;
    colors: Function;
    margin: any[];
    xAxisHeight: number;
    yAxisWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getXScale(): any;
    getYScale(): any;
    getXDomain(): any[];
    getYDomain(): number[];
    onClick(data: any): void;
    setColors(): void;
    updateYAxisWidth({width}: {
        width: any;
    }): void;
    updateXAxisHeight({height}: {
        height: any;
    }): void;
    onActivate(event: any): void;
    onDeactivate(event: any): void;
}
