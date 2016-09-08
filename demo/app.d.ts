import { OnInit } from '@angular/core';
import '../src/ng2d3.scss';
import './demo.scss';
export declare class App implements OnInit {
    chartType: string;
    chartGroups: any[];
    chart: any;
    realTimeData: boolean;
    countries: any[];
    single: any[];
    multi: any[];
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
    constructor();
    ngOnInit(): void;
    updateData(): void;
    selectChart(chartSelector: any): void;
    clickHandler(data: any): void;
}
