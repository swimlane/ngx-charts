
import { BaseChart } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ElementRef, EventEmitter, NgZone, OnChanges, TemplateRef, ChangeDetectorRef } from '@angular/core';
export declare class ForceDirectedGraph extends BaseChart implements OnChanges {
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
    legendLabelClick: EventEmitter<any>;
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
    ngOnChanges(): void;
    update(): void;
    click($event: any, node: any): void;
    getSeriesDomain(): any[];
    trackLinkBy(index: any, link: any): any;
    trackNodeBy(index: any, node: any): any;
    setColors(): void;
    onDragStart(node: any, $event: MouseEvent): void;
    onDrag($event: MouseEvent): void;
    onDragEnd(node: any, $event: MouseEvent): void;
}
