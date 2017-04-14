import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
import { LocationStrategy } from '@angular/common';
export declare class CircleSeriesComponent implements OnChanges {
    private location;
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    colors: any;
    scaleType: any;
    visibleValue: any;
    activeEntries: any[];
    tooltipDisabled: boolean;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    constructor(location: LocationStrategy);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCircles(): any[];
    getTooltipText({tooltipLabel, value, seriesName, min, max}: {
        tooltipLabel: any;
        value: any;
        seriesName: any;
        min: any;
        max: any;
    }): string;
    getTooltipMinMaxText(min: any, max: any): string;
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
