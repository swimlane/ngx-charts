import { EventEmitter } from '@angular/core';
import { ColorHelper } from '../utils/color-sets';
export declare class GaugeArcComponent {
    backgroundArc: any;
    valueArc: any;
    cornerRadius: any;
    colors: ColorHelper;
    select: EventEmitter<{}>;
}
