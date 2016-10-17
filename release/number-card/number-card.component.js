"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var grid_layout_helper_1 = require('../common/grid-layout.helper');
var NumberCard = (function (_super) {
    __extends(NumberCard, _super);
    function NumberCard(element, zone) {
        _super.call(this, element, zone);
        this.element = element;
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
    }
    NumberCard.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    NumberCard.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    NumberCard.prototype.ngOnChanges = function () {
        this.update();
    };
    NumberCard.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.width, this.height, this.margin, false, false, false);
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
    NumberCard.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'number-card',
                    template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"[width, height]\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\">\n        <svg:g cardSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
                },] },
    ];
    NumberCard.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
    ];
    NumberCard.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'margin': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return NumberCard;
}(base_chart_component_1.BaseChart));
exports.NumberCard = NumberCard;
//# sourceMappingURL=number-card.component.js.map