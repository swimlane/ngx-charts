import { OnChanges, EventEmitter } from '@angular/core';
export declare class TreeMapCellSeriesComponent implements OnChanges {
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    cells: any[];
    ngOnChanges(): void;
    getCells(): any[];
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
}
