import { OnChanges } from '@angular/core';
export declare class GridPanelSeries implements OnChanges {
    gridPanels: any[];
    data: any;
    dims: any;
    xScale: any;
    yScale: any;
    orient: any;
    ngOnChanges(): void;
    update(): void;
    getGridPanels(): any;
}
