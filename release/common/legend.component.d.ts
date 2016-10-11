import { OnChanges } from '@angular/core';
export declare class Legend implements OnChanges {
    data: any;
    title: any;
    colors: any;
    height: any;
    width: any;
    legendItems: any;
    ngOnChanges(): void;
    update(): void;
    getLegendItems(): any;
}
