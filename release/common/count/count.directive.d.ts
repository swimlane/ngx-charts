import { EventEmitter, ChangeDetectorRef, OnDestroy, ElementRef } from '@angular/core';
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
    countDuration: number;
    countPrefix: string;
    countSuffix: string;
    valueFormatting: any;
    countDecimals: number;
    countTo: any;
    countFrom: any;
    countChange: EventEmitter<{}>;
    countFinish: EventEmitter<{}>;
    nativeElement: any;
    value: any;
    formattedValue: string;
    private animationReq;
    private _countDecimals;
    private _countTo;
    private _countFrom;
    constructor(cd: ChangeDetectorRef, element: ElementRef);
    ngOnDestroy(): void;
    start(): void;
}
