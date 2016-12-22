import { OnChanges, SimpleChanges } from '@angular/core';
export declare class LineSeriesComponent implements OnChanges {
    data: any;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: any;
    curve: string;
    activeEntries: any[];
    path: string;
    areaPath: string;
    gradientId: string;
    gradientUrl: string;
    hasGradient: boolean;
    gradientStops: any[];
    areaGradientStops: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getLineGenerator(): any;
    getAreaGenerator(): any;
    sortData(data: any): any;
    updateGradients(): void;
    isActive(entry: any): boolean;
    isInactive(entry: any): boolean;
}
