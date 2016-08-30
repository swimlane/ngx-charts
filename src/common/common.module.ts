import { NgModule } from "@angular/core";
import { Chart } from "./charts/chart.component";
import { Legend } from "./legend.component";
import { ScaleLegend } from "./scale-legend.component";
import { AxesModule } from "./axes/axes-module.component";
import { Popover } from "./popover/sw-popover.component";
import { CircleSeries } from "./circle-series.component";
import { Circle } from "./circle.component";
import { GridPanel } from "./grid-panel.component";
import { GridPanelSeries } from "./grid-panel-series.component";
import { SvgLinearGradient } from "./svg-linear-gradient.component";
import { SvgRadialGradient } from "./svg-radial-gradient.component";
import { Timeline } from "./timeline.component";
import { BrowserModule } from "@angular/platform-browser";
import { Area } from "./area.component";

const COMPONENTS = [
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
];

@NgModule({
  imports: [
    BrowserModule,
    AxesModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    BrowserModule,
    AxesModule,
    ...COMPONENTS
  ]
})
export class CommonModule {
}
