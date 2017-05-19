import { EventEmitter, TemplateRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ColorHelper } from '../common/color.helper';
export declare class TreeMapComponent extends BaseChartComponent {
    results: any;
    tooltipDisabled: boolean;
    valueFormatting: any;
    labelFormatting: any;
    gradient: boolean;
    select: EventEmitter<{}>;
    tooltipTemplate: TemplateRef<any>;
    dims: any;
    domain: any;
    transform: any;
    colors: ColorHelper;
    treemap: any;
    data: any;
    margin: number[];
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
