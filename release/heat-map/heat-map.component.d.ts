import { TemplateRef } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export declare class HeatMapComponent extends BaseChartComponent {
    legend: any;
    legendTitle: string;
    legendPosition: string;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    yAxisLabel: any;
    gradient: boolean;
    innerPadding: number | number[];
    trimXAxisTicks: boolean;
    trimYAxisTicks: boolean;
    rotateXAxisTicks: boolean;
    maxXAxisTickLength: number;
    maxYAxisTickLength: number;
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
    xAxisTicks: any[];
    yAxisTicks: any[];
    tooltipDisabled: boolean;
    tooltipText: any;
    min: any;
    max: any;
    tooltipTemplate: TemplateRef<any>;
    dims: ViewDimensions;
    xDomain: any[];
    yDomain: any[];
    valueDomain: any[];
    xScale: any;
    yScale: any;
    color: any;
    colors: ColorHelper;
    colorScale: any;
    transform: string;
    rects: any[];
    margin: number[];
    xAxisHeight: number;
    yAxisWidth: number;
    legendOptions: any;
    scaleType: string;
    update(): void;
    getXDomain(): any;
    getYDomain(): any[];
    getValueDomain(): any[];
    /**
     * Converts the input to gap paddingInner in fraction
     * Supports the following inputs:
     *    Numbers: 8
     *    Strings: "8", "8px", "8%"
     *    Arrays: [8,2], "8,2", "[8,2]"
     *    Mixed: [8,"2%"], ["8px","2%"], "8,2%", "[8,2%]"
     *
     * @param {(string | number | Array<string | number>)} value
     * @param {number} [index=0]
     * @param {number} N
     * @param {number} L
     * @returns {number}
     *
     * @memberOf HeatMapComponent
     */
    getDimension(value: string | number | Array<string | number>, index: number, N: number, L: number): number;
    getXScale(): any;
    getYScale(): any;
    getRects(): any[];
    onClick(data: any): void;
    setColors(): void;
    getLegendOptions(): {
        scaleType: string;
        domain: any[];
        colors: any;
        title: string;
        position: string;
    };
    updateYAxisWidth({ width }: {
        width: any;
    }): void;
    updateXAxisHeight({ height }: {
        height: any;
    }): void;
}
