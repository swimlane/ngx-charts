
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, NgZone, SimpleChanges, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class PieChartComponent extends BaseChartComponent implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    labels: boolean;
    legend: boolean;
    explodeSlices: boolean;
    doughnut: boolean;
    gradient: boolean;
    activeEntries: any[];
    clickHandler: EventEmitter<{}>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    translation: string;
    outerRadius: number;
    innerRadius: number;
    data: any;
    colors: Function;
    domain: any;
    dims: any;
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
