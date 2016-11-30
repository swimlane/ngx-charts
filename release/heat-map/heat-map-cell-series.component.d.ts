import { EventEmitter, OnChanges } from '@angular/core';
export declare class HeatCellSeriesComponent implements OnChanges {
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    cells: any[];
    ngOnChanges(): void;
    update(): void;
    getCells(): any[];
    trackBy(index: any, item: any): string;
    onClick(value: any, label: any, series: any): void;
}
