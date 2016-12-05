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
var NumberCardComponent = (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
        this.legendLabelClick = new core_1.EventEmitter();
    }
    NumberCardComponent.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    NumberCardComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    NumberCardComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    NumberCardComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.data = grid_layout_helper_1.gridLayout(_this.dims, _this.results, 150);
            _this.setColors();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.clickHandler.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    NumberCardComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'number-card',
                    template: "\n    <chart\n      [legend]=\"false\"\n      (legendLabelClick)=\"onClick($event)\"\n      [view]=\"[width, height]\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\">\n        <svg:g cardSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"onClick($event)\"\n        />\n      </svg:g>\n    </chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    NumberCardComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    NumberCardComponent.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'margin': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
        'legendLabelClick': [{ type: core_1.Output },],
    };
    return NumberCardComponent;
}(base_chart_component_1.BaseChartComponent));
exports.NumberCardComponent = NumberCardComponent;
//# sourceMappingURL=number-card.component.js.map