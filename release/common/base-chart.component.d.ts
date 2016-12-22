import { ElementRef, NgZone, ChangeDetectorRef, EventEmitter, AfterViewInit, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
export declare class BaseChartComponent implements OnChanges, AfterViewInit, OnDestroy {
    protected chartElement: ElementRef;
    protected zone: NgZone;
    protected cd: ChangeDetectorRef;
    results: any;
    view: number[];
    scheme: any;
    schemeType: string;
    customColors: any;
    select: EventEmitter<{}>;
    width: number;
    height: number;
    resizeSubscription: any;
    constructor(chartElement: ElementRef, zone: NgZone, cd: ChangeDetectorRef);
    ngAfterViewInit(): void;
    ngOnDestroy(): void;
    ngOnChanges(changes: SimpleChanges): void;
    protected unbindEvents(): void;
    update(): void;
    getContainerDims(): any;
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
    formatDates(): void;
}
