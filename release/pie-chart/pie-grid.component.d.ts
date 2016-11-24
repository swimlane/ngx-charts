
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChart } from '../common/base-chart.component';
export declare class PieGrid extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
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
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
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
