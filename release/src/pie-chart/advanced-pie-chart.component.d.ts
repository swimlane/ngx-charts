import { EventEmitter } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
export declare class AdvancedPieChartComponent extends BaseChartComponent {
    gradient: boolean;
    activeEntries: any[];
    tooltipDisabled: boolean;
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    data: any;
    dims: ViewDimensions;
    domain: any[];
    outerRadius: number;
    innerRadius: number;
    transform: string;
    colors: ColorHelper;
    legendWidth: number;
    margin: number[];
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
    onActivate(event: any): void;
    onDeactivate(event: any): void;
}
