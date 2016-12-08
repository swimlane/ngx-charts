import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
export declare class CircleSeriesComponent implements OnChanges {
    data: any;
    type: string;
    xScale: any;
    yScale: any;
    color: any;
    strokeColor: any;
    scaleType: any;
    visibleValue: any;
    activeEntries: any[];
    clickHandler: EventEmitter<{}>;
    areaPath: any;
    circles: any[];
    barVisible: boolean;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    getCircles(): any[];
    getTooltipText({tooltipLabel, value, seriesName}: {
        tooltipLabel: any;
        value: any;
        seriesName: any;
    }): string;
    onClick(value: any, label: any): void;
    isActive(entry: any): boolean;
    isVisible(circle: any): boolean;
}
