import { OnChanges, SimpleChanges, EventEmitter } from '@angular/core';
export declare class TreeMapCellSeriesComponent implements OnChanges {
    data: any;
    dims: any;
    colors: any;
    select: EventEmitter<{}>;
    cells: any[];
    ngOnChanges(changes: SimpleChanges): void;
    getCells(): any[];
    getTooltipText({label, value}: {
        label: any;
        value: any;
    }): string;
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
}
