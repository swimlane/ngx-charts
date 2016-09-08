/// <reference types="core-js" />
import { EventEmitter, OnInit, OnChanges } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
export declare class PieChart extends BaseChart implements OnInit, OnChanges {
    outerRadius: number;
    innerRadius: number;
    data: any;
    colors: Function;
    domain: any;
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    labels: boolean;
    legend: boolean;
    explodeSlices: boolean;
    doughnut: boolean;
    gradient: boolean;
    clickHandler: EventEmitter<{}>;
    translation: string;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    click(data: any): void;
    setColors(): void;
}
