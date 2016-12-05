
import { ElementRef, EventEmitter, SimpleChanges, NgZone, OnChanges, TemplateRef, ChangeDetectorRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
export declare class ForceDirectedGraphComponent extends BaseChartComponent implements OnChanges {
    private element;
    private cd;
    force: any;
    forceLink: any;
    groupResultsBy: (node: any) => string;
    legend: boolean;
    nodes: any[];
    links: {
        source: any;
        target: any;
    }[];
    scheme: any;
    view: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    linkTemplate: TemplateRef<any>;
    nodeTemplate: TemplateRef<any>;
    chart: ElementRef;
    colors: Function;
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
    constructor(element: ElementRef, cd: ChangeDetectorRef, zone: NgZone);
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    onClick(data: any, node: any): void;
    getSeriesDomain(): any[];
    trackLinkBy(index: any, link: any): any;
    trackNodeBy(index: any, node: any): any;
    setColors(): void;
    onDragStart(node: any, $event: MouseEvent): void;
    onDrag($event: MouseEvent): void;
    onDragEnd(node: any, $event: MouseEvent): void;
}
