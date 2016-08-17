import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {HeatMapCell} from "./HeatMapCell";
import {HeatCellSeries} from "./HeatMapCellSeries";
import {HeatMap} from "./HeatMap";

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
