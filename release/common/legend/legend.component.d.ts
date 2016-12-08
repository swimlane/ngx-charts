import { EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
export declare class LegendComponent implements OnChanges {
    data: any;
    title: any;
    colors: any;
    height: any;
    width: any;
    labelClick: EventEmitter<any>;
    labelActivate: EventEmitter<any>;
    labelDeactivate: EventEmitter<any>;
    legendEntries: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendEntries(): any[];
}
