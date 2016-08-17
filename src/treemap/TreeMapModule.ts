import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {TreeMapCell} from "./TreeMapCell";
import {TreeMapCellSeries} from "./TreeMapCellSeries";
import {TreeMap} from "./TreeMap";

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
