"use strict";
var core_1 = require('@angular/core');
var chart_common_module_1 = require('../common/chart-common.module');
var line_component_1 = require('./line.component');
exports.LineComponent = line_component_1.LineComponent;
var line_chart_component_1 = require('./line-chart.component');
exports.LineChartComponent = line_chart_component_1.LineChartComponent;
var line_series_component_1 = require('./line-series.component');
exports.LineSeriesComponent = line_series_component_1.LineSeriesComponent;
var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [chart_common_module_1.ChartCommonModule],
                    declarations: [
                        line_component_1.LineComponent,
                        line_chart_component_1.LineChartComponent,
                        line_series_component_1.LineSeriesComponent
                    ],
                    exports: [
                        line_component_1.LineComponent,
                        line_chart_component_1.LineChartComponent,
                        line_series_component_1.LineSeriesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    LineChartModule.ctorParameters = function () { return []; };
    return LineChartModule;
}());
exports.LineChartModule = LineChartModule;
//# sourceMappingURL=line-chart.module.js.map