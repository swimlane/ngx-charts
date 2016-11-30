import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { HeatMapCellComponent } from "./heat-map-cell.component";
import { HeatCellSeriesComponent } from "./heat-map-cell-series.component";
import { HeatMapComponent } from "./heat-map.component";

export { HeatMapCellComponent, HeatCellSeriesComponent, HeatMapComponent };

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeatMapCellComponent,
    HeatCellSeriesComponent,
    HeatMapComponent
  ],
  exports: [
    HeatMapCellComponent,
    HeatCellSeriesComponent,
    HeatMapComponent
  ]
})
export class HeatMapModule {}
