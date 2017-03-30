export interface ViewDimensions {
    width: number;
    height: number;
    xOffset: number;
}
export declare function calculateViewDimensions({width, height, margins, showXAxis, showYAxis, xAxisHeight, yAxisWidth, showXLabel, showYLabel, showLegend, legendType, columns}: {
    width: any;
    height: any;
    margins: any;
    showXAxis?: boolean;
    showYAxis?: boolean;
    xAxisHeight?: number;
    yAxisWidth?: number;
    showXLabel?: boolean;
    showYLabel?: boolean;
    showLegend?: boolean;
    legendType?: string;
    columns?: number;
}): ViewDimensions;
