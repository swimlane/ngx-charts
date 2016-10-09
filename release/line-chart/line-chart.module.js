"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var line_component_1 = require("./line.component");
exports.Line = line_component_1.Line;
var line_chart_component_1 = require("./line-chart.component");
exports.LineChart = line_chart_component_1.LineChart;
var line_series_component_1 = require("./line-series.component");
exports.LineSeries = line_series_component_1.LineSeries;
var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
                    declarations: [
                        line_component_1.Line,
                        line_chart_component_1.LineChart,
                        line_series_component_1.LineSeries
                    ],
                    exports: [
                        line_component_1.Line,
                        line_chart_component_1.LineChart,
                        line_series_component_1.LineSeries
                    ]
                },] },
    ];
    LineChartModule.ctorParameters = [];
    return LineChartModule;
}());
exports.LineChartModule = LineChartModule;
//# sourceMappingURL=line-chart.module.js.map