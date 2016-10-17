import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { HeatMapCell } from "./heat-map-cell.component";
import { HeatCellSeries } from "./heat-map-cell-series.component";
import { HeatMap } from "./heat-map.component";

export { HeatMapCell, HeatCellSeries, HeatMap };

@NgModule({
  imports: [CommonModule],
  declarations: [
    HeatMapCell,
    HeatCellSeries,
    HeatMap
  ],
  exports: [
    HeatMapCell,
    HeatCellSeries,
    HeatMap
  ]
})
export class HeatMapModule {}
