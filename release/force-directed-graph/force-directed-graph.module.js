"use strict";
var core_1 = require('@angular/core');
var force_directed_graph_component_1 = require('./force-directed-graph.component');
exports.ForceDirectedGraphComponent = force_directed_graph_component_1.ForceDirectedGraphComponent;
var chart_common_module_1 = require('../common/chart-common.module');
var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    ForceDirectedGraphModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [chart_common_module_1.ChartCommonModule],
                    declarations: [
                        force_directed_graph_component_1.ForceDirectedGraphComponent,
                    ],
                    exports: [
                        force_directed_graph_component_1.ForceDirectedGraphComponent,
                    ]
                },] },
    ];
    /** @nocollapse */
    ForceDirectedGraphModule.ctorParameters = function () { return []; };
    return ForceDirectedGraphModule;
}());
exports.ForceDirectedGraphModule = ForceDirectedGraphModule;
//# sourceMappingURL=force-directed-graph.module.js.map