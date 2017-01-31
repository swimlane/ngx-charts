"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var force_directed_graph_component_1 = require("./force-directed-graph.component");
exports.ForceDirectedGraphComponent = force_directed_graph_component_1.ForceDirectedGraphComponent;
var chart_common_module_1 = require("../common/chart-common.module");
var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    return ForceDirectedGraphModule;
}());
ForceDirectedGraphModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            force_directed_graph_component_1.ForceDirectedGraphComponent,
        ],
        exports: [
            force_directed_graph_component_1.ForceDirectedGraphComponent,
        ]
    })
], ForceDirectedGraphModule);
exports.ForceDirectedGraphModule = ForceDirectedGraphModule;
//# sourceMappingURL=force-directed-graph.module.js.map