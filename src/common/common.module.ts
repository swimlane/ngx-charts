import {NgModule} from "@angular/core";
import {Chart} from "./charts/chart.component";
import {Legend} from "./legend.component";
import {ScaleLegend} from "./scale-legend.component";
import {AxesModule} from "./axes/axes-module.component";
import {Popover} from "./popover/sw-popover.component";
import {CircleSeries} from "./circle-series.component";
import {Circle} from "./circle.component";
import {GridPanel} from "./grid-panel.component";
import {GridPanelSeries} from "./grid-panel-series.component";
import {SvgLinearGradient} from "./svg-linear-gradient.component";
import {SvgRadialGradient} from "./svg-radial-gradient.component";
import {Timeline} from "./timeline.component";
import {BrowserModule} from "@angular/platform-browser";
import {Area} from "./area.component";

@NgModule({
  imports: [
    BrowserModule,
    AxesModule
  ],
  declarations: [
    Area,
    Chart,
    Legend,
    ScaleLegend,
    Circle,
    Popover,
    CircleSeries,
    GridPanel,
    GridPanelSeries,
    SvgLinearGradient,
    SvgRadialGradient,
    Timeline
  ],
  exports: [
    AxesModule,
    Area,
    BrowserModule,
    Chart,
    Legend,
    ScaleLegend,
    Circle,
    Popover,
    CircleSeries,
    GridPanel,
    GridPanelSeries,
    SvgLinearGradient,
    SvgRadialGradient,
    Timeline
  ]
})
export class CommonModule {}
