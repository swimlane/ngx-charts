"use strict";
var core_1 = require('@angular/core');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var grid_layout_helper_1 = require('../common/grid-layout.helper');
var NumberCard = (function (_super) {
    __extends(NumberCard, _super);
    function NumberCard() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
    }
    NumberCard.prototype.ngOnInit = function () {
        this.update();
    };
    NumberCard.prototype.ngOnChanges = function () {
        this.update();
    };
    NumberCard.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = grid_layout_helper_1.gridLayout(this.dims, this.results, 150);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    NumberCard.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCard.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    NumberCard.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "clickHandler", void 0);
    NumberCard = __decorate([
        core_1.Component({
            selector: 'number-card',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"numbercard\">\n        <svg:g cardSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCard);
    return NumberCard;
}(base_chart_component_1.BaseChart));
exports.NumberCard = NumberCard;
//# sourceMappingURL=number-card.component.js.map