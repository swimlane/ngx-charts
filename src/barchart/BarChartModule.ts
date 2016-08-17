import {NgModule} from "@angular/core";
import {CommonModule} from "../common/CommonModule";
import {Bar} from "./Bar";
import {BarHorizontal} from "./BarHorizontal";
import {BarHorizontal2D} from "./BarHorizontal2D";
import {BarHorizontalNormalized} from "./BarHorizontalNormalized";
import {BarHorizontalStacked} from "./BarHorizontalStacked";
import {BarVertical} from "./BarVertical";
import {BarVertical2D} from "./BarVertical2D";
import {BarVerticalNormalized} from "./BarVerticalNormalized";
import {BarVerticalStacked} from "./BarVerticalStacked";
import {DateBar} from "./DateBar";
import {SeriesHorizontal} from "./SeriesHorizontal";
import {SeriesVertical} from "./SeriesVertical";

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
    DateBar,
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
    DateBar,
    SeriesHorizontal,
    SeriesVertical
  ]
})
export class BarChartModule {}
