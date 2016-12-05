"use strict";
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var gauge_component_1 = require("./gauge.component");
exports.GaugeComponent = gauge_component_1.GaugeComponent;
var pie_chart_module_1 = require("../pie-chart/pie-chart.module");
var GaugeModule = (function () {
    function GaugeModule() {
    }
    GaugeModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [chart_common_module_1.ChartCommonModule, pie_chart_module_1.PieChartModule],
                    declarations: [
                        gauge_component_1.GaugeComponent
                    ],
                    exports: [
                        gauge_component_1.GaugeComponent
                    ]
                },] },
    ];
    /** @nocollapse */
    GaugeModule.ctorParameters = [];
    return GaugeModule;
}());
exports.GaugeModule = GaugeModule;
//# sourceMappingURL=gauge.module.js.map