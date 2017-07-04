import { SimpleChanges, EventEmitter, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { LocationStrategy } from '@angular/common';
export declare class CircleSeriesComponent implements OnChanges, OnInit {
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
    tooltipTemplate: TemplateRef<any>;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    circle: any;
    barVisible: boolean;
    gradientId: string;
    gradientFill: string;
    constructor(location: LocationStrategy);
    ngOnInit(): void;
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
    activateCircle(): void;
    deactivateCircle(): void;
}
