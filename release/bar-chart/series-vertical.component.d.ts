import { EventEmitter, OnChanges, TemplateRef } from '@angular/core';
export declare enum D0Types {
    positive = "positive",
    negative = "negative",
}
export declare class SeriesVerticalComponent implements OnChanges {
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    colors: any;
    gradient: boolean;
    activeEntries: any[];
    seriesName: string;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    roundEdges: boolean;
    animations: boolean;
    showDataLabel: boolean;
    dataLabelFormatting: any;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    dataLabelHeightChanged: EventEmitter<{}>;
    tooltipPlacement: string;
    tooltipType: string;
    bars: any;
    x: any;
    y: any;
    barsForDataLabels: Array<{
        x: number;
        y: number;
        width: number;
        height: number;
        total: number;
        series: string;
    }>;
    ngOnChanges(changes: any): void;
    update(): void;
    updateDataLabels(): void;
    updateTooltipSettings(): void;
    isActive(entry: any): boolean;
    onClick(data: any): void;
    trackBy(index: any, bar: any): string;
    trackDataLabelBy(index: any, barLabel: any): string;
}
