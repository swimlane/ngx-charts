"use strict";
var core_1 = require('@angular/core');
var chart_common_module_1 = require('./common/chart-common.module');
var area_chart_module_1 = require('./area-chart/area-chart.module');
var bar_chart_module_1 = require('./bar-chart/bar-chart.module');
var bubble_chart_module_1 = require('./bubble-chart/bubble-chart.module');
var force_directed_graph_module_1 = require('./force-directed-graph/force-directed-graph.module');
var heat_map_module_1 = require('./heat-map/heat-map.module');
var line_chart_module_1 = require('./line-chart/line-chart.module');
var number_card_module_1 = require('./number-card/number-card.module');
var pie_chart_module_1 = require('./pie-chart/pie-chart.module');
var tree_map_module_1 = require('./tree-map/tree-map.module');
var gauge_module_1 = require('./gauge/gauge.module');
var NgxChartsModule = (function () {
    function NgxChartsModule() {
    }
    NgxChartsModule.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        chart_common_module_1.ChartCommonModule,
                        area_chart_module_1.AreaChartModule,
                        bar_chart_module_1.BarChartModule,
                        bubble_chart_module_1.BubbleChartModule,
                        force_directed_graph_module_1.ForceDirectedGraphModule,
                        heat_map_module_1.HeatMapModule,
                        line_chart_module_1.LineChartModule,
                        number_card_module_1.NumberCardModule,
                        pie_chart_module_1.PieChartModule,
                        tree_map_module_1.TreeMapModule,
                        gauge_module_1.GaugeModule
                    ]
                },] },
    ];
    /** @nocollapse */
    NgxChartsModule.ctorParameters = function () { return []; };
    return NgxChartsModule;
}());
exports.NgxChartsModule = NgxChartsModule;
//# sourceMappingURL=ngx-charts.module.js.map