"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("./common/common.module");
var area_chart_module_1 = require("./area-chart/area-chart.module");
var bar_chart_module_1 = require("./bar-chart/bar-chart.module");
var heat_map_module_1 = require("./heat-map/heat-map.module");
var line_chart_module_1 = require("./line-chart/line-chart.module");
var number_card_module_1 = require("./number-card/number-card.module");
var pie_chart_module_1 = require("./pie-chart/pie-chart.module");
var tree_map_module_1 = require("./tree-map/tree-map.module");
var NG2D3Module = (function () {
    function NG2D3Module() {
    }
    NG2D3Module.decorators = [
        { type: core_1.NgModule, args: [{
                    exports: [
                        common_module_1.CommonModule,
                        area_chart_module_1.AreaChartModule,
                        bar_chart_module_1.BarChartModule,
                        heat_map_module_1.HeatMapModule,
                        line_chart_module_1.LineChartModule,
                        number_card_module_1.NumberCardModule,
                        pie_chart_module_1.PieChartModule,
                        tree_map_module_1.TreeMapModule
                    ]
                },] },
    ];
    NG2D3Module.ctorParameters = [];
    return NG2D3Module;
}());
exports.NG2D3Module = NG2D3Module;
//# sourceMappingURL=ng2d3.js.map