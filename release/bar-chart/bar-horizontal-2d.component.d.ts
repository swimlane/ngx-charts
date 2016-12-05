
import { EventEmitter, OnChanges, OnDestroy, ElementRef, NgZone, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class BarHorizontal2DComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
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
    clickHandler: EventEmitter<{}>;
    dims: ViewDimensions;
    groupDomain: any[];
    innerDomain: any[];
    valuesDomain: any[];
    groupScale: any;
    innerScale: any;
    valueScale: any;
    transform: string;
    colors: Function;
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getGroupScale(): any;
    getInnerScale(): any;
    getValueScale(): any;
    getGroupDomain(): any[];
    getInnerDomain(): any[];
    getValueDomain(): number[];
    groupTransform(group: any): string;
    onClick(data: any, group: any): void;
    trackBy(index: any, item: any): any;
    setColors(): void;
    updateYAxisWidth({width}: {
        width: any;
    }): void;
    updateXAxisHeight({height}: {
        height: any;
    }): void;
}
