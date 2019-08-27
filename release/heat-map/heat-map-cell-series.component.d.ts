import { SimpleChanges, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
export declare class HeatCellSeriesComponent implements OnChanges, OnInit {
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    tooltipDisabled: boolean;
    tooltipText: any;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<{}>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    cells: any[];
    ngOnInit(): void;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCells(): any[];
    getTooltipText({ label, data, series }: {
        label: any;
        data: any;
        series: any;
    }): string;
    trackBy(index: any, item: any): string;
    onClick(data: any): void;
}
