import { ElementRef, NgZone } from "@angular/core";
export declare abstract class BaseChart {
    results: any[];
    chartElement: ElementRef;
    zone: NgZone;
    view: number[];
    width: number;
    height: number;
    resizeSubscription: any;
    constructor(chartElement: ElementRef, zone: NgZone);
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
