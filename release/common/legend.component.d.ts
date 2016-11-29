import { OnChanges, EventEmitter } from '@angular/core';
export declare class Legend implements OnChanges {
    data: any;
    title: any;
    colors: any;
    height: any;
    width: any;
    labelClick: EventEmitter<any>;
    legendItems: any;
    ngOnChanges(): void;
    update(): void;
    getLegendItems(): any[];
}
