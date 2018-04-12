import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class AdvancedLegendComponent implements OnChanges {
    width: number;
    data: any;
    colors: any;
    label: string;
    animations: boolean;
    select: EventEmitter<any>;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    legendItems: any[];
    total: number;
    roundedTotal: number;
    valueFormatting: (value: number) => any;
    labelFormatting: (value: string) => any;
    percentageFormatting: (value: number) => any;
    ngOnChanges(changes: SimpleChanges): void;
    getTotal(): number;
    update(): void;
    getLegendItems(): any;
    trackBy(item: any): any;
}
