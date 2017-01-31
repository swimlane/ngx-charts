"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var core_1 = require("@angular/core");
var chart_common_module_1 = require("../common/chart-common.module");
var card_component_1 = require("./card.component");
exports.CardComponent = card_component_1.CardComponent;
var card_series_component_1 = require("./card-series.component");
exports.CardSeriesComponent = card_series_component_1.CardSeriesComponent;
var number_card_component_1 = require("./number-card.component");
exports.NumberCardComponent = number_card_component_1.NumberCardComponent;
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    return NumberCardModule;
}());
NumberCardModule = __decorate([
    core_1.NgModule({
        imports: [chart_common_module_1.ChartCommonModule],
        declarations: [
            card_component_1.CardComponent,
            card_series_component_1.CardSeriesComponent,
            number_card_component_1.NumberCardComponent
        ],
        exports: [
            card_component_1.CardComponent,
            card_series_component_1.CardSeriesComponent,
            number_card_component_1.NumberCardComponent
        ]
    })
], NumberCardModule);
exports.NumberCardModule = NumberCardModule;
//# sourceMappingURL=number-card.module.js.map