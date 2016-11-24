import { ElementRef, NgZone, ChangeDetectorRef } from "@angular/core";
export declare abstract class BaseChart {
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
    getContainerDims(): {
        width: number;
        height: number;
    };
    private bindWindowResizeEvent();
    private cloneData(data);
    abstract setColors(): any;
    abstract click(data: any, group: any): any;
}
