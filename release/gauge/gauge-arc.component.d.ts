import { EventEmitter } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
export declare class GaugeArcComponent {
    backgroundArc: any;
    valueArc: any;
    cornerRadius: any;
    colors: ColorHelper;
    select: EventEmitter<{}>;
}
