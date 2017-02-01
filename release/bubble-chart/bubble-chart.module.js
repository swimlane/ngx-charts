"use strict";
var core_1 = require('@angular/core');
var chart_common_module_1 = require('../common/chart-common.module');
var bubble_chart_component_1 = require('./bubble-chart.component');
exports.BubbleChartComponent = bubble_chart_component_1.BubbleChartComponent;
var bubble_series_component_1 = require('./bubble-series.component');
exports.BubbleSeriesComponent = bubble_series_component_1.BubbleSeriesComponent;
var BubbleChartModule = (function () {
    function BubbleChartModule() {
    }
    BubbleChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [chart_common_module_1.ChartCommonModule],
                    declarations: [
                        bubble_chart_component_1.BubbleChartComponent,
                        bubble_series_component_1.BubbleSeriesComponent
                    ],
                    exports: [
                        bubble_chart_component_1.BubbleChartComponent,
                        bubble_series_component_1.BubbleSeriesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    BubbleChartModule.ctorParameters = function () { return []; };
    return BubbleChartModule;
}());
exports.BubbleChartModule = BubbleChartModule;
//# sourceMappingURL=bubble-chart.module.js.map