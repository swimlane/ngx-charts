import { EventEmitter, OnChanges, SimpleChanges } from '@angular/core';
export declare class AreaSeriesComponent implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    baseValue: any;
    colors: any;
    scaleType: any;
    stacked: boolean;
    normalized: boolean;
    gradient: any;
    curve: any;
    activeEntries: any[];
    animations: boolean;
    select: EventEmitter<{}>;
    opacity: number;
    path: string;
    startingPath: string;
    hasGradient: boolean;
    gradientStops: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    updateGradient(): void;
    isActive(entry: any): boolean;
    isInactive(entry: any): boolean;
}
