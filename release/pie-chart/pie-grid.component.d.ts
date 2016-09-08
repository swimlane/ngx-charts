/// <reference types="core-js" />
import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export declare class PieGrid extends BaseChart implements OnInit, OnChanges {
    dims: ViewDimensions;
    data: any[];
    transform: string;
    series: any[];
    domain: any[];
    colorScale: Function;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
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
        percent: any;
        data: any[];
    }[];
    getTotal(): any;
    click(data: any): void;
    setColors(): void;
}
