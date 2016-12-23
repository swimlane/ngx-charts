import { NgModule } from '@angular/core';
import { ChartCommonModule } from '../common/chart-common.module';
import { TreeMapCellComponent } from './tree-map-cell.component';
import { TreeMapCellSeriesComponent } from './tree-map-cell-series.component';
import { TreeMapComponent } from './tree-map.component';

export { TreeMapCellComponent, TreeMapCellSeriesComponent, TreeMapComponent };

@NgModule({
  imports: [ChartCommonModule],
  declarations: [
    TreeMapCellComponent,
    TreeMapCellSeriesComponent,
    TreeMapComponent
  ],
  exports: [
    TreeMapCellComponent,
    TreeMapCellSeriesComponent,
    TreeMapComponent
  ]
})
export class TreeMapModule {}
