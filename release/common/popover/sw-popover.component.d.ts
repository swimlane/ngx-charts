/// <reference types="core-js" />
import { ElementRef, Renderer, ViewContainerRef, OnInit, OnDestroy } from '@angular/core';
import { PopoverRegistry } from './popover-registry.service';
export declare class Popover implements OnInit, OnDestroy {
    element: ElementRef;
    renderer: Renderer;
    mouseEnterListener: Function;
    mouseLeaveListener: Function;
    exitTimeout: any;
    options: any;
    popoverCssClass: any;
    popoverPlain: any;
    popoverId: any;
    popover: any;
    popoverRegistry: PopoverRegistry;
    parent: ViewContainerRef;
    popoverText: any;
    popoverTemplate: any;
    popoverPlacement: string;
    popoverAlignment: string;
    popoverGroup: any;
    popoverSpacing: number;
    showCaret: boolean;
    constructor(element: ElementRef, renderer: Renderer);
    ngOnInit(): void;
    mouseOut(): void;
    display(): void;
    remove(): void;
    checkFlip(triggerElement: any, popover: any, options: any): void;
    positionPopover(triggerElement: any, popover: any, options: any): void;
    addCaret(popoverEl: any, elDimensions: any, popoverDimensions: any): void;
    toBoolean(value: any): any;
    ngOnDestroy(): void;
}
