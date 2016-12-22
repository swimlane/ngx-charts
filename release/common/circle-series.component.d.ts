import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
export declare class CircleSeriesComponent implements OnChanges {
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: any;
    visibleValue: any;
    activeEntries: any[];
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCircles(): any[];
    getTooltipText({tooltipLabel, value, seriesName}: {
        tooltipLabel: any;
        value: any;
        seriesName: any;
    }): string;
    getGradientStops(color: any): {
        offset: number;
        color: any;
        opacity: number;
    }[];
    onClick(value: any, label: any): void;
    isActive(entry: any): boolean;
    isVisible(circle: any): boolean;
    activateCircle(circle: any): void;
    deactivateCircle(circle: any): void;
}
