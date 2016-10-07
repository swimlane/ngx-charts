import { OnChanges, OnInit, ElementRef, AfterViewInit, ApplicationRef } from '@angular/core';
export declare class Chart implements OnChanges, OnInit, AfterViewInit {
    private element;
    private applicationRef;
    view: any;
    legend: boolean;
    data: any;
    legendData: any;
    legendTitle: string;
    colors: any;
    chartWidth: any;
    title: any;
    legendWidth: any;
    legendType: any;
    constructor(element: ElementRef, applicationRef: ApplicationRef);
    ngOnInit(): void;
    ngOnChanges(): void;
    ngAfterViewInit(): void;
    update(): void;
    getLegendType(): string;
}
