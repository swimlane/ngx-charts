import { OnInit, OnChanges } from '@angular/core';
export declare class Legend implements OnInit, OnChanges {
    data: any;
    title: any;
    colors: any;
    height: any;
    legendItems: any;
    ngOnInit(): void;
    ngOnChanges(): void;
    update(): void;
    getLegendItems(): any;
}
