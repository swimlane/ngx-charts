"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var card_component_1 = require("./card.component");
var card_series_component_1 = require("./card-series.component");
var number_card_component_1 = require("./number-card.component");
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule = __decorate([
        core_1.NgModule({
            imports: [common_module_1.CommonModule],
            declarations: [
                card_component_1.Card,
                card_series_component_1.CardSeries,
                number_card_component_1.NumberCard
            ],
            exports: [
                card_component_1.Card,
                card_series_component_1.CardSeries,
                number_card_component_1.NumberCard
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCardModule);
    return NumberCardModule;
}());
exports.NumberCardModule = NumberCardModule;
//# sourceMappingURL=number-card.module.js.map