import { EventEmitter, OnChanges } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
export declare class TreeMap extends BaseChart implements OnChanges {
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
    ngOnChanges(): void;
    click(data: any): void;
    setColors(): void;
    update(): void;
}
