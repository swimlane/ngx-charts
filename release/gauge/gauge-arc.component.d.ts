import { EventEmitter, TemplateRef } from '@angular/core';
import { ColorHelper } from '../common/color.helper';
export declare class GaugeArcComponent {
    backgroundArc: any;
    valueArc: any;
    cornerRadius: any;
    colors: ColorHelper;
    isActive: boolean;
    tooltipDisabled: boolean;
    valueFormatting: (value: any) => string;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<{}>;
    activate: EventEmitter<{}>;
    deactivate: EventEmitter<{}>;
    tooltipText(arc: any): string;
}
