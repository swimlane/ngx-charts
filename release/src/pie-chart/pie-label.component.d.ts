import { OnChanges, SimpleChanges } from '@angular/core';
import { PieLabelOption } from '../common';
export declare class PieLabelComponent implements OnChanges {
    data: any;
    radius: any;
    label: any;
    color: any;
    max: any;
    value: any;
    explodeSlices: any;
    pieLabelOption: PieLabelOption;
    trimLabel: (label: string, max?: number) => string;
    line: string;
    private readonly isIE;
    constructor();
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
    readonly textX: number;
    readonly textY: number;
    readonly styleTransform: string;
    readonly attrTransform: string;
    readonly textTransition: string;
    textAnchor(): any;
    midAngle(d: any): number;
    /**
     * Format pie label base on provided options
     *
     * @param {string} label
     * @returns {string}
     *
     * @memberOf PieLabelComponent
     */
    formatPieLabel(label: string): string;
}
