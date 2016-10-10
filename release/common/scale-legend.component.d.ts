import { OnChanges } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export declare class ScaleLegend implements OnChanges {
    private sanitizer;
    valueRange: any;
    colors: any;
    height: any;
    width: any;
    gradient: any;
    constructor(sanitizer: DomSanitizer);
    ngOnChanges(): void;
    gradientString(colors: any, splits: any): string;
}
