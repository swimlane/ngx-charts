import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
export declare class HeatCellSeriesComponent implements OnChanges {
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    cells: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCells(): any[];
    getTooltipText({label, data}: {
        label: any;
        data: any;
    }): string;
    trackBy(index: any, item: any): string;
    onClick(value: any, label: any, series: any): void;
}
