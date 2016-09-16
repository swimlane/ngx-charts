import { OnChanges } from '@angular/core';
export declare class ScaleLegend implements OnChanges {
    valueRange: any;
    colors: any;
    height: any;
    gradient: any;
    ngOnChanges(): void;
    gradientString(colors: any, splits: any): string;
}
