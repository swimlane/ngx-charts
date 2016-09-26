import { NgModule } from "@angular/core";
import { Chart } from "./charts/chart.component";
import { Legend } from "./legend.component";
import { ScaleLegend } from "./scale-legend.component";
import { AxesModule } from "./axes/axes.module";
import { TooltipModule } from "./tooltip";
import { CircleSeries } from "./circle-series.component";
import { Circle } from "./circle.component";
import { GridPanel } from "./grid-panel.component";
import { GridPanelSeries } from "./grid-panel-series.component";
import { SvgLinearGradient } from "./svg-linear-gradient.component";
import { SvgRadialGradient } from "./svg-radial-gradient.component";
import { Timeline } from "./timeline.component";
import { BrowserModule } from "@angular/platform-browser";
import { Area } from "./area.component";
import { AreaTooltip } from "./area-tooltip.component";

const COMPONENTS = [
  Area,
  AreaTooltip,
  Chart,
  Legend,
  ScaleLegend,
  Circle,
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
    AxesModule,
    TooltipModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    BrowserModule,
    AxesModule,
    TooltipModule,
    ...COMPONENTS
  ]
})
export class CommonModule {
}
