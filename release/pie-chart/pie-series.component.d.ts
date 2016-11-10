import { EventEmitter, OnChanges } from '@angular/core';
export declare class PieSeries implements OnChanges {
    max: number;
    data: any;
    colors: any;
    series: any;
    dims: any;
    innerRadius: number;
    outerRadius: number;
    explodeSlices: any;
    showLabels: any;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    midAngle(d: any): any;
    outerArc(): any;
    calculateLabelPositions(pieData: any): any;
    labelVisible(arc: any): boolean;
    label(arc: any): any;
    tooltipText(arc: any): string;
    color(arc: any): any;
    trackBy(index: any, item: any): any;
    click(data: any): void;
}
