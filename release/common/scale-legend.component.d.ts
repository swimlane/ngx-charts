import { OnInit } from '@angular/core';
export declare class ScaleLegend implements OnInit {
    valueRange: any;
    colors: any;
    height: any;
    gradient: any;
    ngOnInit(): void;
    gradientString(colors: any, splits: any): string;
}
