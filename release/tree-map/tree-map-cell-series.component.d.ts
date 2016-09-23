import { OnChanges, EventEmitter } from '@angular/core';
export declare class TreeMapCellSeries implements OnChanges {
    cells: any[];
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    getCells(): any;
    click(data: any): void;
    trackBy(index: any, item: any): any;
}
