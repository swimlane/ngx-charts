import { BaseChartComponent } from '../common/base-chart.component';
import { ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export declare class NumberCardComponent extends BaseChartComponent {
    dims: ViewDimensions;
    data: any[];
    colors: ColorHelper;
    transform: string;
    domain: any[];
    margin: number[];
    update(): void;
    getDomain(): any[];
    onClick(data: any): void;
    setColors(): void;
}
