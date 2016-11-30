import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class TreeMapComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    legendLabelClick: EventEmitter<any>;
    dims: any;
    domain: any;
    transform: any;
    colors: any;
    treemap: any;
    data: any;
    margin: number[];
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
