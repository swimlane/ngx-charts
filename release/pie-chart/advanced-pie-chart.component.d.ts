/// <reference types="core-js" />
import { EventEmitter, OnChanges } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export interface LegendItem {
    value: number;
    label: string;
    percentage: number;
}
export declare class AdvancedPieChart extends BaseChart implements OnChanges {
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
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getTotal(): any;
    getDomain(): any;
    getLegendItems(): LegendItem;
    click(data: any): void;
    setColors(): void;
}
