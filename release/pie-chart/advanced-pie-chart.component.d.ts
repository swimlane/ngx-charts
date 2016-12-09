
import { EventEmitter, OnChanges, OnDestroy, SimpleChanges, AfterViewInit, NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class AdvancedPieChartComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    gradient: boolean;
    activeEntries: any[];
    select: EventEmitter<{}>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    data: any;
    dims: ViewDimensions;
    domain: any[];
    outerRadius: number;
    innerRadius: number;
    transform: string;
    colors: Function;
    legendWidth: number;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
    onActivate(event: any): void;
    onDeactivate(event: any): void;
}
