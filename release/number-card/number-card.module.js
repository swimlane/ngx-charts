"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var card_component_1 = require("./card.component");
exports.CardComponent = card_component_1.CardComponent;
var card_series_component_1 = require("./card-series.component");
exports.CardSeriesComponent = card_series_component_1.CardSeriesComponent;
var number_card_component_1 = require("./number-card.component");
exports.NumberCardComponent = number_card_component_1.NumberCardComponent;
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule.decorators = [
        { type: core_1.NgModule, args: [{
                    imports: [common_module_1.CommonModule],
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
                },] },
    ];
    /** @nocollapse */
    NumberCardModule.ctorParameters = [];
    return NumberCardModule;
}());
exports.NumberCardModule = NumberCardModule;
//# sourceMappingURL=number-card.module.js.map