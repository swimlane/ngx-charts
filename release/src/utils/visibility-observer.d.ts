import { EventEmitter, NgZone } from '@angular/core';
/**
 * Visibility Observer
 */
export declare class VisibilityObserver {
    private element;
    private zone;
    visible: EventEmitter<any>;
    timeout: any;
    isVisible: boolean;
    constructor(element: any, zone: NgZone);
    destroy(): void;
    onVisibilityChange(): void;
    runCheck(): void;
}
