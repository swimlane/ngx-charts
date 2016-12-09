import { OnChanges, ViewContainerRef, EventEmitter, SimpleChanges } from '@angular/core';
import { InjectionService } from '../../utils/injection.service';
export declare class ChartComponent implements OnChanges {
    private vcr;
    private injectionService;
    view: any;
    legend: boolean;
    data: any;
    legendData: any;
    legendTitle: string;
    colors: any;
    legendType: any;
    legendLabelClick: EventEmitter<any>;
    legendLabelActivate: EventEmitter<any>;
    legendLabelDeactivate: EventEmitter<any>;
    chartWidth: any;
    title: any;
    legendWidth: any;
    constructor(vcr: ViewContainerRef, injectionService: InjectionService);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendType(): string;
}
