import { ElementRef, NgZone, ChangeDetectorRef } from "@angular/core";
export declare abstract class BaseChartComponent {
    results: any[];
    chartElement: ElementRef;
    zone: NgZone;
    changeDetector: ChangeDetectorRef;
    view: number[];
    width: number;
    height: number;
    resizeSubscription: any;
    constructor(chartElement: ElementRef, zone: NgZone, changeDetector: ChangeDetectorRef);
    protected bindResizeEvents(view: number[]): void;
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
    abstract setColors(): void;
    abstract onClick(data: any, group: any): void;
}
