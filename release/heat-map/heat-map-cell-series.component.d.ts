import { EventEmitter, OnChanges } from '@angular/core';
export declare class HeatCellSeries implements OnChanges {
    cells: any[];
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getCells(): any[];
    trackBy(index: any, item: any): any;
    click(value: any, label: any, series: any): void;
}
