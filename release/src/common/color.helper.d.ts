export declare class ColorHelper {
    scale: any;
    scaleType: any;
    colorDomain: any[];
    domain: any;
    customColors: any;
    constructor(scheme: any, type: any, domain: any, customColors?: any);
    generateColorScheme(scheme: any, type: any, domain: any): any;
    getColor(value: any): any;
    getLinearGradientStops(value: any, start: any): any[];
}
