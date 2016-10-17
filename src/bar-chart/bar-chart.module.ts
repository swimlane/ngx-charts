import { NgModule } from "@angular/core";
import { CommonModule } from "../common/common.module";
import { Bar } from "./bar.component";
import { BarHorizontal } from "./bar-horizontal.component";
import { BarHorizontal2D } from "./bar-horizontal-2d.component";
import { BarHorizontalNormalized } from "./bar-horizontal-normalized.component";
import { BarHorizontalStacked } from "./bar-horizontal-stacked.component";
import { BarVertical } from "./bar-vertical.component";
import { BarVertical2D } from "./bar-vertical-2d.component";
import { BarVerticalNormalized } from "./bar-vertical-normalized.component";
import { BarVerticalStacked } from "./bar-vertical-stacked.component";
import { SeriesHorizontal } from "./series-horizontal.component";
import { SeriesVertical } from "./series-vertical.component";

export { Bar, BarHorizontal, BarHorizontal2D, BarHorizontalNormalized, BarHorizontalStacked, BarVertical, BarVertical2D,
  BarVerticalNormalized, BarVerticalStacked, SeriesHorizontal, SeriesVertical };

@NgModule({
  imports: [CommonModule],
  declarations: [
    Bar,
    BarHorizontal,
    BarHorizontal2D,
    BarHorizontalNormalized,
    BarHorizontalStacked,
    BarVertical,
    BarVertical2D,
    BarVerticalNormalized,
    BarVerticalStacked,
    SeriesHorizontal,
    SeriesVertical
  ],
  exports: [
    Bar,
    BarHorizontal,
    BarHorizontal2D,
    BarHorizontalNormalized,
    BarHorizontalStacked,
    BarVertical,
    BarVertical2D,
    BarVerticalNormalized,
    BarVerticalStacked,
    SeriesHorizontal,
    SeriesVertical
  ]
})
export class BarChartModule {}
