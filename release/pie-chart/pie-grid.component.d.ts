/// <reference types="core-js" />
import { EventEmitter, OnChanges } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export declare class PieGrid extends BaseChart implements OnChanges {
    dims: ViewDimensions;
    data: any[];
    transform: string;
    series: any[];
    domain: any[];
    colorScale: Function;
    margin: number[];
    view: any;
    results: any;
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    getSeries(): {
        transform: string;
        colors: () => any;
        innerRadius: number;
        outerRadius: number;
        label: string;
        total: string;
        value: any;
        percent: any;
        data: any[];
    }[];
    getTotal(): any;
    click(data: any): void;
    setColors(): void;
}
