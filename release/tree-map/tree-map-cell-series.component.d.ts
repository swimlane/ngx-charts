import { OnInit, EventEmitter } from '@angular/core';
export declare class TreeMapCellSeries implements OnInit {
    cells: any[];
    data: any;
    dims: any;
    colors: any;
    clickHandler: EventEmitter<{}>;
    ngOnInit(): void;
    getCells(): any;
    click(data: any): void;
}
