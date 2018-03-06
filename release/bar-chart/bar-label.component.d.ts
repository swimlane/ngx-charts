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
    leftPadding: number;
    topPadding: number;
    formatedValue: string;
    transform: string;
    ngOnChanges(changes: SimpleChanges): void;
    update(): void;
}
