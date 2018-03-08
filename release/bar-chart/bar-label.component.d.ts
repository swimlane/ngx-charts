import { OnChanges, SimpleChanges } from '@angular/core';
export declare class BarLabelComponent implements OnChanges {
    value: any;
    barX: any;
    barY: any;
    barWidth: any;
    barHeight: any;
    orientation: any;
    x: number;
    y: number;
    horizontalPadding: number;
    verticalPadding: number;
    formatedValue: string;
    transform: string;
    textAnchor: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
}
