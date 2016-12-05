"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var base_chart_component_1 = require('../common/base-chart.component');
var trim_label_helper_1 = require('../common/trim-label.helper');
var AdvancedPieChartComponent = (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new core_1.EventEmitter();
    }
    AdvancedPieChartComponent.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    AdvancedPieChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    AdvancedPieChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedPieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width * 4 / 12.0,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.setColors();
            var xOffset = _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.legendWidth = _this.width - _this.dims.width - _this.margin[1];
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2.5;
            _this.innerRadius = _this.outerRadius * 0.75;
            _this.transform = "translate(" + xOffset + " , " + yOffset + ")";
            _this.total = _this.getTotal();
            _this.roundedTotal = Math.round(_this.total);
            _this.totalLabel = 'total';
            _this.legendItems = _this.getLegendItems();
        });
    };
    AdvancedPieChartComponent.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChartComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.results.map(function (d, index) {
            var label = d.name;
            if (label instanceof Date) {
                label = label.toLocaleDateString();
            }
            var value = d.value;
            var percentage = Math.round(value / _this.total * 100);
            return {
                value: Math.round(value),
                label: trim_label_helper_1.trimLabel(label, 20),
                originalLabel: d.name,
                percentage: percentage
            };
        });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.clickHandler.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'advanced-pie-chart',
                    template: "\n    <div\n      [style.width.px]=\"width\"\n      [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\"\n        [style.width.px]=\"dims.width\"\n        [style.height.px]=\"dims.height\">\n        <chart\n          [colors]=\"colors\"\n          (legendLabelClick)=\"onClick($event)\"\n          [view]=\"[dims.width, dims.height]\">\n          <svg:g\n            [attr.transform]=\"transform\"\n            class=\"pie chart\">\n            <svg:g pieSeries\n              [colors]=\"colors\"\n              [showLabels]=\"labels\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              (clickHandler)=\"onClick($event)\">\n            </svg:g>\n          </svg:g>\n        </chart>\n      </div>\n      <div [style.width.px]=\"width - dims.width\" class=\"advanced-pie-legend-wrapper\">\n        <div class=\"advanced-pie-legend\"\n          [style.width.px]=\"width - dims.width - margin[1]\">\n          <div class=\"total-value\">\n            {{roundedTotal.toLocaleString()}}\n          </div>\n          <div class=\"total-label\">\n            {{totalLabel}}\n          </div>\n          <div class=\"legend-items-container\">\n            <div class=\"legend-items\">\n              <div\n                *ngFor=\"let legendItem of legendItems\"\n                tabindex=\"-1\"\n                (click)=\"onClick({name: legendItem.label, value: legendItem.value})\"\n                class=\"legend-item\">\n                <div\n                  class=\"item-color\"\n                  [style.background]=\"colors(legendItem.label)\">\n                </div>\n                <div class=\"item-value\">{{legendItem.value.toLocaleString()}}</div>\n                <div class=\"item-label\">{{legendItem.label}}</div>\n                <div class=\"item-percent\">{{legendItem.percentage.toLocaleString()}}%</div>\n              </div>\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AdvancedPieChartComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    AdvancedPieChartComponent.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'margin': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return AdvancedPieChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.AdvancedPieChartComponent = AdvancedPieChartComponent;
//# sourceMappingURL=advanced-pie-chart.component.js.map