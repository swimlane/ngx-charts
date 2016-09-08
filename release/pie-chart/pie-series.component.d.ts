import { EventEmitter, OnInit, OnChanges } from '@angular/core';
export declare class PieSeries implements OnInit, OnChanges {
    total: number;
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
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getTotal(): any;
    midAngle(d: any): any;
    outerArc(): any;
    calculateLabelPositions(pieData: any): any;
    labelVisible(arc: any): boolean;
    label(arc: any): any;
    tooltipText(arc: any): string;
    color(arc: any): any;
    click(data: any): void;
}
