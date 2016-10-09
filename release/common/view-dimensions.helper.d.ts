export interface ViewDimensions {
    width: number;
    height: number;
    xOffset: number;
}
export declare function calculateViewDimensions(view: any, margins: any, showXLabel: any, showYLabel: any, showLegend: any, columns?: number): ViewDimensions;
