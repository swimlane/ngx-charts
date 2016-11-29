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
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    gradientString(colors: any, splits: any): string;
}
