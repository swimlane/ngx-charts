"use strict";
var core_1 = require("@angular/core");
var common_module_1 = require("../common/common.module");
var card_component_1 = require("./card.component");
exports.Card = card_component_1.Card;
var card_series_component_1 = require("./card-series.component");
exports.CardSeries = card_series_component_1.CardSeries;
var number_card_component_1 = require("./number-card.component");
exports.NumberCard = number_card_component_1.NumberCard;
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule.decorators = [
        { type: core_1.NgModule, args: [{
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
                },] },
    ];
    /** @nocollapse */
    NumberCardModule.ctorParameters = [];
    return NumberCardModule;
}());
exports.NumberCardModule = NumberCardModule;
//# sourceMappingURL=number-card.module.js.map