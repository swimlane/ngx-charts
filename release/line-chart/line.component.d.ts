import { EventEmitter, OnChanges, ElementRef, SimpleChanges } from '@angular/core';
export declare class LineComponent implements OnChanges {
    private element;
    path: any;
    stroke: any;
    data: any;
    fill: string;
    animations: boolean;
    select: EventEmitter<{}>;
    initialized: boolean;
    initialPath: string;
    constructor(element: ElementRef);
    ngOnChanges(changes: SimpleChanges): void;
    updatePathEl(): void;
}
