import { EventEmitter, ChangeDetectorRef, NgZone, OnDestroy, ElementRef } from '@angular/core';
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
export declare class CountUpDirective implements OnDestroy {
    private cd;
    private zone;
    countDecimals: number;
    countDuration: number;
    countPrefix: string;
    countSuffix: string;
    countTo: any;
    countFrom: any;
    countChange: EventEmitter<{}>;
    countFinish: EventEmitter<{}>;
    nativeElement: any;
    private value;
    private animationReq;
    private startTime;
    private _countTo;
    private _countFrom;
    constructor(cd: ChangeDetectorRef, zone: NgZone, element: ElementRef);
    ngOnDestroy(): void;
    start(): void;
    count(startVal: any, endVal: any, dec: any, duration: any, countDown: any, timestamp: any): void;
}
