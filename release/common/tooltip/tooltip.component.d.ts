import { ElementRef, AfterViewInit, Renderer } from '@angular/core';
import { TooltipOptions } from './tooltip-options';
import { PlacementTypes } from './placement.type';
export declare class TooltipContentComponent implements AfterViewInit {
    element: ElementRef;
    private renderer;
    caretElm: any;
    readonly cssClasses: string;
    readonly visibilityChanged: string;
    private host;
    context: any;
    showCaret: boolean;
    template: any;
    title: string;
    private type;
    placement: PlacementTypes;
    private alignment;
    private spacing;
    private cssClass;
    constructor(element: ElementRef, renderer: Renderer, options: TooltipOptions);
    ngAfterViewInit(): void;
    position(): void;
    positionContent(nativeElm: any, hostDim: any, elmDim: any): void;
    positionCaret(hostDim: any, elmDim: any): void;
    checkFlip(hostDim: any, elmDim: any): void;
    onWindowResize(): void;
}
