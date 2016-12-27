"use strict";
var core_1 = require('@angular/core');
var area_chart_component_1 = require('./area-chart.component');
exports.AreaChartComponent = area_chart_component_1.AreaChartComponent;
var area_chart_normalized_component_1 = require('./area-chart-normalized.component');
exports.AreaChartNormalizedComponent = area_chart_normalized_component_1.AreaChartNormalizedComponent;
var area_chart_stacked_component_1 = require('./area-chart-stacked.component');
exports.AreaChartStackedComponent = area_chart_stacked_component_1.AreaChartStackedComponent;
var area_series_component_1 = require('./area-series.component');
exports.AreaSeriesComponent = area_series_component_1.AreaSeriesComponent;
var chart_common_module_1 = require('../common/chart-common.module');
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [chart_common_module_1.ChartCommonModule],
                    declarations: [
                        area_chart_component_1.AreaChartComponent,
                        area_chart_normalized_component_1.AreaChartNormalizedComponent,
                        area_chart_stacked_component_1.AreaChartStackedComponent,
                        area_series_component_1.AreaSeriesComponent
                    ],
                    exports: [
                        area_chart_component_1.AreaChartComponent,
                        area_chart_normalized_component_1.AreaChartNormalizedComponent,
                        area_chart_stacked_component_1.AreaChartStackedComponent,
                        area_series_component_1.AreaSeriesComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    AreaChartModule.ctorParameters = function () { return []; };
    return AreaChartModule;
}());
exports.AreaChartModule = AreaChartModule;
//# sourceMappingURL=area-chart.module.js.map