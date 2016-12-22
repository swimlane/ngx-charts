import { SimpleChanges, EventEmitter, OnChanges } from '@angular/core';
export declare class PieSeriesComponent implements OnChanges {
    colors: any;
    series: any;
    dims: any;
    innerRadius: number;
    outerRadius: number;
    explodeSlices: any;
    showLabels: any;
    gradient: boolean;
    activeEntries: any[];
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    max: number;
    data: any;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    midAngle(d: any): number;
    outerArc(): any;
    calculateLabelPositions(pieData: any): any;
    labelVisible(arc: any): boolean;
    label(arc: any): string;
    tooltipText(arc: any): string;
    color(arc: any): any;
    trackBy(index: any, item: any): string;
    onClick(data: any): void;
    isActive(entry: any): boolean;
}
