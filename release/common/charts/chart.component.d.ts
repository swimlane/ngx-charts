import { OnChanges } from '@angular/core';
export declare class Chart implements OnChanges {
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
    ngOnChanges(): void;
    update(): void;
    getLegendType(): string;
}
