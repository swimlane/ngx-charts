"use strict";
var core_1 = require("@angular/core");
var chart_component_1 = require("./charts/chart.component");
var legend_component_1 = require("./legend.component");
var scale_legend_component_1 = require("./scale-legend.component");
var axes_module_component_1 = require("./axes/axes-module.component");
var sw_popover_component_1 = require("./popover/sw-popover.component");
var circle_series_component_1 = require("./circle-series.component");
var circle_component_1 = require("./circle.component");
var grid_panel_component_1 = require("./grid-panel.component");
var grid_panel_series_component_1 = require("./grid-panel-series.component");
var svg_linear_gradient_component_1 = require("./svg-linear-gradient.component");
var svg_radial_gradient_component_1 = require("./svg-radial-gradient.component");
var timeline_component_1 = require("./timeline.component");
var platform_browser_1 = require("@angular/platform-browser");
var area_component_1 = require("./area.component");
var COMPONENTS = [
    area_component_1.Area,
    chart_component_1.Chart,
    legend_component_1.Legend,
    scale_legend_component_1.ScaleLegend,
    circle_component_1.Circle,
    sw_popover_component_1.Popover,
    circle_series_component_1.CircleSeries,
    grid_panel_component_1.GridPanel,
    grid_panel_series_component_1.GridPanelSeries,
    svg_linear_gradient_component_1.SvgLinearGradient,
    svg_radial_gradient_component_1.SvgRadialGradient,
    timeline_component_1.Timeline
];
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                axes_module_component_1.AxesModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                platform_browser_1.BrowserModule,
                axes_module_component_1.AxesModule
            ].concat(COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map