
import { EventEmitter, OnChanges, OnDestroy, SimpleChanges, ElementRef, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarHorizontalStackedComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
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
    groupDomain: any[];
    innerDomain: any[];
    valueDomain: any[];
    xScale: any;
    yScale: any;
    transform: string;
    colors: Function;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getGroupDomain(): any[];
    getInnerDomain(): any[];
    getValueDomain(): any[];
    getYScale(): any;
    getXScale(): any;
    groupTransform(group: any): string;
    onClick(data: any, group: any): void;
    trackBy(index: any, item: any): string;
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
