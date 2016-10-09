/// <reference types="core-js" />
import { EventEmitter, OnChanges } from '@angular/core';
import { BaseChart } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
export declare class NumberCard extends BaseChart implements OnChanges {
    dims: ViewDimensions;
    data: any[];
    colors: Function;
    transform: string;
    domain: any[];
    view: any;
    results: any;
    margin: number[];
    scheme: any;
    customColors: any;
    clickHandler: EventEmitter<{}>;
    ngOnChanges(): void;
    update(): void;
    getDomain(): any;
    click(data: any): void;
    setColors(): void;
}
