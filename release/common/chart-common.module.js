var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
import { NgModule } from '@angular/core';
import { Location, LocationStrategy, PathLocationStrategy, CommonModule } from '@angular/common';
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
var ChartCommonModule = /** @class */ (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule = __decorate([
        NgModule({
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
        })
    ], ChartCommonModule);
    return ChartCommonModule;
}());
export { ChartCommonModule };
//# sourceMappingURL=chart-common.module.js.map