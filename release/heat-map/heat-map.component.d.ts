
import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export declare class HeatMapComponent extends BaseChartComponent {
    legend: any;
    xAxis: any;
    yAxis: any;
    showXAxisLabel: any;
    showYAxisLabel: any;
    xAxisLabel: any;
    yAxisLabel: any;
    gradient: boolean;
    innerPadding: Number | Number[];
    xAxisTickFormatting: any;
    yAxisTickFormatting: any;
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
    update(): void;
    getXDomain(): any;
    getYDomain(): any[];
    getValueDomain(): any[];
    getXScale(): any;
    getYScale(): any;
    getRects(): any[];
    onClick(data: any): void;
    setColors(): void;
    getLegendOptions(): {
        scaleType: string;
        domain: any[];
        colors: any;
    };
    updateYAxisWidth({width}: {
        width: any;
    }): void;
    updateXAxisHeight({height}: {
        height: any;
    }): void;
}
