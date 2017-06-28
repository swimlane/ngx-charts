import { EventEmitter, OnChanges, SimpleChanges, TemplateRef } from '@angular/core';
export declare class SeriesHorizontal implements OnChanges {
    bars: any;
    x: any;
    y: any;
    dims: any;
    type: string;
    series: any;
    xScale: any;
    yScale: any;
    colors: any;
    tooltipDisabled: boolean;
    gradient: boolean;
    activeEntries: any[];
    seriesName: string;
    tooltipTemplate: TemplateRef<any>;
    roundEdges: boolean;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    tooltipPlacement: string;
    tooltipType: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    updateTooltipSettings(): void;
    isActive(entry: any): boolean;
    trackBy(index: any, bar: any): any;
    click(data: any): void;
}
