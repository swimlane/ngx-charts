import { OnChanges } from '@angular/core';
export declare class GaugeAxisComponent implements OnChanges {
    bigSegments: any;
    smallSegments: any;
    min: any;
    max: any;
    angleSpan: number;
    startAngle: number;
    radius: any;
    valueScale: any;
    tickFormatting: any;
    ticks: any[];
    rotationAngle: number;
    rotate: string;
    ngOnChanges(): void;
    update(): void;
    getTicks(): any;
    getTextAnchor(angle: any): string;
    getTickPath(startDistance: any, tickLength: any, angle: any): any;
}
