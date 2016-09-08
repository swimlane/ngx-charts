import { OnInit, OnChanges } from '@angular/core';
export declare class Chart implements OnInit, OnChanges {
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
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getLegendType(): string;
}
