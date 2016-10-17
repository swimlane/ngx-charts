export interface ViewDimensions {
    width: number;
    height: number;
    xOffset: number;
}
export declare function calculateViewDimensions(width: any, height: any, margins: any, showXLabel: any, showYLabel: any, showLegend: any, columns?: number): ViewDimensions;
