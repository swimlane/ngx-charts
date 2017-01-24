import { ElementRef, NgZone, ChangeDetectorRef, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { Location } from '@angular/common';
import 'rxjs/add/observable/fromEvent';
import 'rxjs/add/operator/debounceTime';
import { VisibilityObserver } from '../utils';
export declare class BaseChartComponent implements OnChanges, AfterViewInit, OnDestroy {
    protected chartElement: ElementRef;
    protected zone: NgZone;
    protected cd: ChangeDetectorRef;
    protected location: Location;
    results: any;
    view: number[];
    scheme: any;
    schemeType: string;
    customColors: any;
    select: EventEmitter<{}>;
    width: number;
    height: number;
    resizeSubscription: any;
    visibilityObserver: VisibilityObserver;
    constructor(chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef, location: Location);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getContainerDims(): any;
    /**
     * Converts all date objects that appear as name
     * into formatted date strings
     */
    formatDates(): void;
    protected unbindEvents(): void;
    private bindWindowResizeEvent();
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    private cloneData(data);
}
