import { OnChanges, EventEmitter, SimpleChanges } from '@angular/core';
export declare class LegendComponent implements OnChanges {
    data: any;
    title: any;
    colors: any;
    height: any;
    width: any;
    labelClick: EventEmitter<any>;
    legendItems: any;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendItems(): any[];
    clickLegendItem(legendItem: any): void;
}
