import { PlacementTypes } from './placement.type';
import { StyleTypes } from './style.type';
import { AlignmentTypes } from './alignment.type';
export declare class TooltipOptions {
    title: string;
    template: any;
    context: any;
    host: any;
    showCaret: boolean;
    type: StyleTypes;
    placement: PlacementTypes;
    alignment: AlignmentTypes;
    closeOnClickOutside: boolean;
    closeOnMouseLeave: boolean;
    spacing: number;
    hide: any;
    cssClass: string;
    constructor(opts: any);
}
