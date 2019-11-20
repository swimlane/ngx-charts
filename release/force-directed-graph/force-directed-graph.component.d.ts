import { ElementRef, TemplateRef, EventEmitter } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export declare class ForceDirectedGraphComponent extends BaseChartComponent {
    force: any;
    forceLink: any;
    legend: boolean;
    legendTitle: string;
    legendPosition: string;
    nodes: any[];
    links: Array<{
        source: any;
        target: any;
    }>;
    activeEntries: any[];
    tooltipDisabled: boolean;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    linkTemplate: TemplateRef<any>;
    nodeTemplate: TemplateRef<any>;
    tooltipTemplate: TemplateRef<any>;
    chart: ElementRef;
    colors: ColorHelper;
    dims: ViewDimensions;
    draggingNode: any;
    draggingStart: {
        x: number;
        y: number;
    };
    margin: number[];
    results: any[];
    seriesDomain: any;
    transform: string;
    legendOptions: any;
    groupResultsBy: (node: any) => string;
    update(): void;
    onClick(data: any): void;
    onActivate(event: any): void;
    onDeactivate(event: any): void;
    getSeriesDomain(): any[];
    trackLinkBy(index: any, link: any): any;
    trackNodeBy(index: any, node: any): any;
    setColors(): void;
    getLegendOptions(): {
        scaleType: string;
        domain: any;
        colors: ColorHelper;
        title: string;
        position: string;
    };
    onDragStart(node: any, $event: MouseEvent): void;
    onDrag($event: MouseEvent): void;
    onDragEnd($event: MouseEvent): void;
    escape(label: any): string;
}
