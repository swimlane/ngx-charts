
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, SimpleChanges, NgZone, ChangeDetectorRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
export declare class NumberCardComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    legendLabelClick: EventEmitter<any>;
    dims: ViewDimensions;
    data: any[];
    colors: Function;
    transform: string;
    domain: any[];
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
