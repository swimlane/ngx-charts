import { TemplateRef, EventEmitter } from '@angular/core';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { DataItem } from '../models/chart-data.model';
export declare class PieGridComponent extends BaseChartComponent {
    designatedTotal: number;
    tooltipDisabled: boolean;
    tooltipText: (o: any) => any;
    label: string;
    minWidth: number;
    activeEntries: any[];
    activate: EventEmitter<any>;
    deactivate: EventEmitter<any>;
    dims: ViewDimensions;
    data: any[];
    transform: string;
    series: any[];
    domain: any[];
    colorScale: ColorHelper;
    margin: number[];
    tooltipTemplate: TemplateRef<any>;
    update(): void;
    defaultTooltipText({ data }: {
        data: any;
    }): string;
    getDomain(): any[];
    getSeries(): any[];
    getTotal(): any;
    onClick(data: DataItem): void;
    setColors(): void;
    onActivate(item: any, fromLegend?: boolean): void;
    onDeactivate(item: any, fromLegend?: boolean): void;
}
