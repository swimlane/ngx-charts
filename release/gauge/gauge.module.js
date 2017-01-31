"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var linear_gauge_component_1 = require("./linear-gauge.component");
exports.LinearGaugeComponent = linear_gauge_component_1.LinearGaugeComponent;
var gauge_component_1 = require("./gauge.component");
exports.GaugeComponent = gauge_component_1.GaugeComponent;
var gauge_arc_component_1 = require("./gauge-arc.component");
exports.GaugeArcComponent = gauge_arc_component_1.GaugeArcComponent;
var gauge_axis_component_1 = require("./gauge-axis.component");
exports.GaugeAxisComponent = gauge_axis_component_1.GaugeAxisComponent;
var pie_chart_module_1 = require("../pie-chart/pie-chart.module");
var bar_chart_module_1 = require("../bar-chart/bar-chart.module");
var GaugeModule = (function () {
    function GaugeModule() {
    }
    return GaugeModule;
}());
GaugeModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule, pie_chart_module_1.PieChartModule, bar_chart_module_1.BarChartModule],
        declarations: [
            linear_gauge_component_1.LinearGaugeComponent,
            gauge_component_1.GaugeComponent,
            gauge_arc_component_1.GaugeArcComponent,
            gauge_axis_component_1.GaugeAxisComponent
        ],
        exports: [
            linear_gauge_component_1.LinearGaugeComponent,
            gauge_component_1.GaugeComponent,
            gauge_arc_component_1.GaugeArcComponent,
            gauge_axis_component_1.GaugeAxisComponent
        ]
    })
], GaugeModule);
exports.GaugeModule = GaugeModule;
//# sourceMappingURL=gauge.module.js.map