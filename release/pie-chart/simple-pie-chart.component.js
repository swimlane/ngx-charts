"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_helper_1 = require('../common/color.helper');
var base_chart_component_1 = require('../common/base-chart.component');
var SimplePieChartComponent = (function (_super) {
    __extends(SimplePieChartComponent, _super);
    function SimplePieChartComponent() {
        _super.apply(this, arguments);
        this.activeEntries = [];
        this.unit = '';
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [0, 0, 0, 0];
    }
    SimplePieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.setColors();
            var xOffset = _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.legendWidth = _this.width - _this.dims.width - _this.margin[1];
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2.5;
            _this.innerRadius = _this.outerRadius * 0.65;
            _this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        });
    };
    SimplePieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    SimplePieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SimplePieChartComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    SimplePieChartComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    SimplePieChartComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    SimplePieChartComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-charts-simple-pie-chart',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g\n        [attr.transform]=\"transform\"\n        class=\"pie chart\">\n        <svg:g ngx-charts-pie-series\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"results\"\n          [innerRadius]=\"innerRadius\"\n          [activeEntries]=\"activeEntries\"\n          [outerRadius]=\"outerRadius\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\">\n        </svg:g>\n        <svg:text\n          class=\"label\"\n          dy=\"-0.5em\"\n          x=\"0\"\n          y=\"5\"\n          text-anchor=\"middle\">\n          {{ totalLabel }}\n        </svg:text>\n        <svg:text\n          class=\"label percent-label\"\n          dy=\"0.5em\"\n          x=\"0\"\n          y=\"5\"\n          ngx-charts-count-up\n          [countTo]=\"totalValue\"\n          [countSuffix]=\"unit\"\n          text-anchor=\"middle\">\n        </svg:text>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    SimplePieChartComponent.ctorParameters = function () { return []; };
    SimplePieChartComponent.propDecorators = {
        'gradient': [{ type: core_1.Input },],
        'activeEntries': [{ type: core_1.Input },],
        'totalLabel': [{ type: core_1.Input },],
        'totalValue': [{ type: core_1.Input },],
        'unit': [{ type: core_1.Input },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return SimplePieChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.SimplePieChartComponent = SimplePieChartComponent;
//# sourceMappingURL=simple-pie-chart.component.js.map