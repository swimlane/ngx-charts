import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export declare class NumberCardComponent extends BaseChartComponent {
    cardColor: string;
    bandColor: string;
    emptyColor: string;
    innerPadding: number;
    textColor: string;
    valueFormatting: any;
    labelFormatting: any;
    designatedTotal: number;
    dims: ViewDimensions;
    data: any[];
    slots: any[];
    colors: ColorHelper;
    transform: string;
    domain: any[];
    margin: number[];
    backgroundCards: any[];
    readonly clickable: boolean;
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
