
import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, NgZone, ElementRef, ChangeDetectorRef } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
export declare class PieChart extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    outerRadius: number;
    innerRadius: number;
    data: any;
    colors: Function;
    domain: any;
    dims: any;
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
    clickHandler: EventEmitter<{}>;
    translation: string;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    click(data: any): void;
    setColors(): void;
}
