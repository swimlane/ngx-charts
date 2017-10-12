import { OnChanges, SimpleChanges } from '@angular/core';
export declare class SvgRadialGradientComponent implements OnChanges {
    color: string;
    name: string;
    startOpacity: number;
    endOpacity: number;
    cx: number;
    cy: number;
    stops: any[];
    r: string;
    private stopsInput;
    private stopsDefault;
    ngOnChanges(changes: SimpleChanges): void;
}
