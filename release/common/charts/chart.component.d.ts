import { OnChanges, ViewContainerRef } from '@angular/core';
import { InjectionService } from '../../utils/injection.service';
export declare class Chart implements OnChanges {
    private vcr;
    private injectionService;
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
    constructor(vcr: ViewContainerRef, injectionService: InjectionService);
    ngOnChanges(): void;
    update(): void;
    getLegendType(): string;
}
