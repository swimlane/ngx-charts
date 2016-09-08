import { EventEmitter, OnInit } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
export declare class TreeMap extends BaseChart implements OnInit {
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    dims: any;
    transform: any;
    colors: any;
    treemap: any;
    data: any;
    ngOnInit(): void;
    click(data: any): void;
    setColors(): void;
    update(): void;
}
