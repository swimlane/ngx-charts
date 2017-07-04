import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy } from '@angular/common';
import { ChartComponent } from './charts/chart.component';
import { ScaleLegendComponent, LegendComponent, LegendEntryComponent, AdvancedLegendComponent } from './legend';
import { BaseChartComponent } from './base-chart.component';
import { AxesModule } from './axes/axes.module';
import { TooltipModule } from './tooltip';
import { CircleSeriesComponent } from './circle-series.component';
import { CircleComponent } from './circle.component';
import { GridPanelComponent } from './grid-panel.component';
import { GridPanelSeriesComponent } from './grid-panel-series.component';
import { SvgLinearGradientComponent } from './svg-linear-gradient.component';
import { SvgRadialGradientComponent } from './svg-radial-gradient.component';
import { Timeline } from './timeline';
import { CommonModule } from '@angular/common';
import { AreaComponent } from './area.component';
import { TooltipArea } from './tooltip-area.component';
import { CountUpDirective } from './count';
var COMPONENTS = [
    AreaComponent,
    BaseChartComponent,
    CountUpDirective,
    TooltipArea,
    ChartComponent,
    LegendComponent,
    LegendEntryComponent,
    ScaleLegendComponent,
    CircleComponent,
    CircleSeriesComponent,
    GridPanelComponent,
    GridPanelSeriesComponent,
    SvgLinearGradientComponent,
    SvgRadialGradientComponent,
    Timeline,
    AdvancedLegendComponent
];
var ChartCommonModule = (function () {
    function ChartCommonModule() {
    }
    return ChartCommonModule;
}());
export { ChartCommonModule };
ChartCommonModule.decorators = [
    { type: NgModule, args: [{
                providers: [
                    Location,
                    {
                        provide: LocationStrategy,
                        useClass: PathLocationStrategy
                    }
                ],
                imports: [
                    CommonModule,
                    AxesModule,
                    TooltipModule
                ],
                declarations: COMPONENTS.slice(),
                exports: [
                    CommonModule,
                    AxesModule,
                    TooltipModule
                ].concat(COMPONENTS)
            },] },
];
/** @nocollapse */
ChartCommonModule.ctorParameters = function () { return []; };
//# sourceMappingURL=chart-common.module.js.map