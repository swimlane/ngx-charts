"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
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