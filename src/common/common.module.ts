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
import { CommonModule as Ng2CommonModule } from "@angular/common";
import { Area } from "./area.component";
import { AreaTooltip } from "./area-tooltip.component";
import { BaseChart } from "./base-chart.component";

export * from "./tooltip";
export { Chart, Legend, ScaleLegend, CircleSeries, Circle, GridPanel, GridPanelSeries, SvgLinearGradient, SvgRadialGradient,
  Timeline, Area, AreaTooltip, BaseChart };

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
    Ng2CommonModule,
    AxesModule,
    TooltipModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    Ng2CommonModule,
    AxesModule,
    TooltipModule,
    ...COMPONENTS
  ]
})
export class CommonModule {
}
