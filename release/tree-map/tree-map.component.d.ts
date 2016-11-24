import { EventEmitter, OnChanges, OnDestroy, AfterViewInit, ElementRef, NgZone, ChangeDetectorRef } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
export declare class TreeMap extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
    private element;
    private cd;
    margin: number[];
    view: any;
    results: any;
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    dims: any;
    domain: any;
    transform: any;
    colors: any;
    treemap: any;
    data: any;
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    click(data: any): void;
    setColors(): void;
}
