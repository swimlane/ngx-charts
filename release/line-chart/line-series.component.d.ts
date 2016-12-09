import { OnChanges, SimpleChanges } from '@angular/core';
export declare class LineSeriesComponent implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    color: any;
    scaleType: any;
    curve: string;
    activeEntries: any[];
    path: string;
    areaPath: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLineGenerator(): any;
    getAreaGenerator(): any;
    sortData(data: any): any;
    isActive(entry: any): boolean;
    isInactive(entry: any): boolean;
}
