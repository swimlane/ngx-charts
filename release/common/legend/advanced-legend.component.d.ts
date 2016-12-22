import { EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
export declare class AdvancedLegendComponent implements OnChanges {
    width: number;
    data: any;
    colors: any;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    legendItems: any[];
    totalLabel: string;
    total: number;
    roundedTotal: number;
    ngOnChanges(changes: SimpleChanges): void;
    getTotal(): number;
    update(): void;
    getLegendItems(): any;
    trackBy(item: any): any;
}
