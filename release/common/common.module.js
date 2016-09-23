"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var chart_component_1 = require("./charts/chart.component");
var legend_component_1 = require("./legend.component");
var scale_legend_component_1 = require("./scale-legend.component");
var axes_module_1 = require("./axes/axes.module");
var tooltip_1 = require("./tooltip");
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
                axes_module_1.AxesModule,
                tooltip_1.TooltipModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                platform_browser_1.BrowserModule,
                axes_module_1.AxesModule,
                tooltip_1.TooltipModule
            ].concat(COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], CommonModule);
    return CommonModule;
}());
exports.CommonModule = CommonModule;
//# sourceMappingURL=common.module.js.map