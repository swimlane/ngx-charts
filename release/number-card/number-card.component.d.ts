/// <reference types="core-js" />
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, NgZone } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
export declare class NumberCard extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    dims: ViewDimensions;
    data: any[];
    colors: Function;
    transform: string;
    domain: any[];
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    constructor(element: ElementRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    click(data: any): void;
    setColors(): void;
}
