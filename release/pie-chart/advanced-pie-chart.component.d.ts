
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export interface LegendItem {
    value: number;
    label: string;
    percentage: number;
}
export declare class AdvancedPieChartComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    legendLabelClick: EventEmitter<any>;
    data: any;
    dims: ViewDimensions;
    domain: any[];
    outerRadius: number;
    innerRadius: number;
    transform: string;
    total: number;
    roundedTotal: number;
    totalLabel: string;
    legendItems: LegendItem;
    colors: Function;
    legendWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getTotal(): number;
    getDomain(): any[];
    getLegendItems(): LegendItem;
    onClick(data: any): void;
    setColors(): void;
}
