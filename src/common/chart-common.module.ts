import { NgModule } from "@angular/core";
import { ChartComponent } from "./charts/chart.component";
import { LegendComponent } from "./legend.component";
import { ScaleLegendComponent } from "./scale-legend.component";
import { AxesModule } from "./axes/axes.module";
import { TooltipModule } from "./tooltip";
import { CircleSeriesComponent } from "./circle-series.component";
import { CircleComponent } from "./circle.component";
import { GridPanelComponent } from "./grid-panel.component";
import { GridPanelSeriesComponent } from "./grid-panel-series.component";
import { SvgLinearGradientComponent } from "./svg-linear-gradient.component";
import { SvgRadialGradientComponent } from "./svg-radial-gradient.component";
import { Timeline } from "./timeline.component";
import { CommonModule } from "@angular/common";
import { AreaComponent } from "./area.component";
import { AreaTooltip } from "./area-tooltip.component";
import { BaseChartComponent } from "./base-chart.component";

export * from "./tooltip";
export { 
  ChartComponent, LegendComponent, ScaleLegendComponent, CircleSeriesComponent, CircleComponent, GridPanelComponent, 
  GridPanelSeriesComponent, SvgLinearGradientComponent, SvgRadialGradientComponent,
  Timeline, AreaComponent, AreaTooltip, BaseChartComponent 
};

const COMPONENTS = [
  AreaComponent,
  AreaTooltip,
  ChartComponent,
  LegendComponent,
  ScaleLegendComponent,
  CircleComponent,
  CircleSeriesComponent,
  GridPanelComponent,
  GridPanelSeriesComponent,
  SvgLinearGradientComponent,
  SvgRadialGradientComponent,
  Timeline
];

@NgModule({
  imports: [
    CommonModule,
    AxesModule,
    TooltipModule
  ],
  declarations: [
    ...COMPONENTS
  ],
  exports: [
    CommonModule,
    AxesModule,
    TooltipModule,
    ...COMPONENTS
  ]
})
export class ChartCommonModule {
}
