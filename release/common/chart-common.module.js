"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var chart_component_1 = require('./charts/chart.component');
var legend_1 = require('./legend');
var base_chart_component_1 = require('./base-chart.component');
var axes_module_1 = require('./axes/axes.module');
var tooltip_1 = require('./tooltip');
var circle_series_component_1 = require('./circle-series.component');
var circle_component_1 = require('./circle.component');
var grid_panel_component_1 = require('./grid-panel.component');
var grid_panel_series_component_1 = require('./grid-panel-series.component');
var svg_linear_gradient_component_1 = require('./svg-linear-gradient.component');
var svg_radial_gradient_component_1 = require('./svg-radial-gradient.component');
var timeline_1 = require('./timeline');
var common_2 = require('@angular/common');
var area_component_1 = require('./area.component');
var area_tooltip_component_1 = require('./area-tooltip.component');
var count_1 = require('./count');
var COMPONENTS = [
    area_component_1.AreaComponent,
    base_chart_component_1.BaseChartComponent,
    count_1.CountUpDirective,
    area_tooltip_component_1.AreaTooltip,
    chart_component_1.ChartComponent,
    legend_1.LegendComponent,
    legend_1.LegendEntryComponent,
    legend_1.ScaleLegendComponent,
    circle_component_1.CircleComponent,
    circle_series_component_1.CircleSeriesComponent,
    grid_panel_component_1.GridPanelComponent,
    grid_panel_series_component_1.GridPanelSeriesComponent,
    svg_linear_gradient_component_1.SvgLinearGradientComponent,
    svg_radial_gradient_component_1.SvgRadialGradientComponent,
    timeline_1.Timeline,
    legend_1.AdvancedLegendComponent
];
var ChartCommonModule = (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule.decorators = [
        { type: core_1.NgModule, args: [{
                    providers: [
                        common_1.Location,
                        {
                            provide: common_1.LocationStrategy,
                            useClass: common_1.PathLocationStrategy
                        }
                    ],
                    imports: [
                        common_2.CommonModule,
                        axes_module_1.AxesModule,
                        tooltip_1.TooltipModule
                    ],
                    declarations: COMPONENTS.slice(),
                    exports: [
                        common_2.CommonModule,
                        axes_module_1.AxesModule,
                        tooltip_1.TooltipModule
                    ].concat(COMPONENTS)
                },] },
    ];
    /** @nocollapse */
    ChartCommonModule.ctorParameters = function () { return []; };
    return ChartCommonModule;
}());
exports.ChartCommonModule = ChartCommonModule;
//# sourceMappingURL=chart-common.module.js.map