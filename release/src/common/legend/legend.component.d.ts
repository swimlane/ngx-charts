import { EventEmitter, SimpleChanges, OnChanges, ChangeDetectorRef, NgZone } from '@angular/core';
export declare class LegendComponent implements OnChanges {
    private cd;
    private zone;
    data: any;
    title: any;
    colors: any;
    height: any;
    width: any;
    activeEntries: any;
    labelClick: EventEmitter<any>;
    labelActivate: EventEmitter<any>;
    labelDeactivate: EventEmitter<any>;
    legendEntries: any[];
    constructor(cd: ChangeDetectorRef, zone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLegendEntries(): any[];
    isActive(entry: any): boolean;
    activate(item: any): void;
    deactivate(item: any): void;
    trackBy(index: any, item: any): string;
}
