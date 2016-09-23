import { OnInit, ViewContainerRef } from '@angular/core';
import '../src/ng2d3.scss';
import './demo.scss';
export declare class App implements OnInit {
    viewContainerRef: ViewContainerRef;
    chartType: string;
    chartGroups: any[];
    chart: any;
    realTimeData: boolean;
    countries: any[];
    single: any[];
    multi: any[];
    dateData: any[];
    linearScale: boolean;
    view: any[];
    showXAxis: boolean;
    showYAxis: boolean;
    gradient: boolean;
    showLegend: boolean;
    showXAxisLabel: boolean;
    xAxisLabel: string;
    showYAxisLabel: boolean;
    yAxisLabel: string;
    colorScheme: {
        domain: string[];
    };
    showLabels: boolean;
    explodeSlices: boolean;
    doughnut: boolean;
    autoScale: boolean;
    timeline: boolean;
    constructor(viewContainerRef: ViewContainerRef);
    ngOnInit(): void;
    updateData(): void;
    selectChart(chartSelector: any): void;
    clickHandler(data: any): void;
}
