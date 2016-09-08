import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class HeatCellSeries implements OnInit, OnChanges {
    cells: any[];
    data: any;
    colors: any;
    xScale: any;
    yScale: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getCells(): any[];
    click(value: any, label: any, series: any): void;
}
