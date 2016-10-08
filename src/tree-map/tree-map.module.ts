import {NgModule} from "@angular/core";
import {CommonModule} from "../common/common.module";
import {TreeMapCell} from "./tree-map-cell.component";
import {TreeMapCellSeries} from "./tree-map-cell-series.component";
import {TreeMap} from "./tree-map.component";

export { TreeMapCell, TreeMapCellSeries, TreeMap };

@NgModule({
  imports: [CommonModule],
  declarations: [
    TreeMapCell,
    TreeMapCellSeries,
    TreeMap
  ],
  exports: [
    TreeMapCell,
    TreeMapCellSeries,
    TreeMap
  ]
})
export class TreeMapModule {}
