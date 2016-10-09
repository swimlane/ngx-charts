import { ElementRef, NgZone } from "@angular/core";
export declare abstract class BaseChart {
    results: any[];
    chartElement: ElementRef;
    zone: NgZone;
    view: number[];
    constructor(chartElement: ElementRef, zone: NgZone);
    protected bindResizeEvents(view: number[]): void;
    update(): void;
    setChartSizeBasedOnContainer(): void;
    private bindWindowResizeEvent();
    cloneData(data: any): any[];
    abstract setColors(): any;
    abstract click(data: any, group: any): any;
}
