import { OnChanges } from '@angular/core';
export declare class GridPanelSeriesComponent implements OnChanges {
    gridPanels: any[];
    data: any;
    dims: any;
    xScale: any;
    yScale: any;
    orient: any;
    ngOnChanges(): void;
    update(): void;
    getGridPanels(): any[];
}
