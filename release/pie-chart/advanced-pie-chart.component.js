var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, ViewEncapsulation, ContentChild } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var AdvancedPieChartComponent = (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    AdvancedPieChartComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width * 4 / 12.0,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.legendWidth = this.width - this.dims.width - this.margin[1];
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    AdvancedPieChartComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    return AdvancedPieChartComponent;
}(BaseChartComponent));
export { AdvancedPieChartComponent };
AdvancedPieChartComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-advanced-pie-chart',
                template: "\n    <div\n      [style.width.px]=\"width\"\n      [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\"\n        [style.width.px]=\"dims.width\"\n        [style.height.px]=\"dims.height\">\n        <ngx-charts-chart\n          [view]=\"[width, height]\"\n          [showLegend]=\"false\">\n          <svg:g\n            [attr.transform]=\"transform\"\n            class=\"pie chart\">\n            <svg:g ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\">\n            </svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div\n        class=\"advanced-pie-legend-wrapper\"\n        [style.width.px]=\"width - dims.width\"\n        [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\">\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
                styleUrls: [
                    '../common/base-chart.component.css',
                    './advanced-pie-chart.component.css'
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
AdvancedPieChartComponent.ctorParameters = function () { return []; };
AdvancedPieChartComponent.propDecorators = {
    'gradient': [{ type: Input },],
    'activeEntries': [{ type: Input },],
    'tooltipDisabled': [{ type: Input },],
    'tooltipText': [{ type: Input },],
    'label': [{ type: Input },],
    'activate': [{ type: Output },],
    'deactivate': [{ type: Output },],
    'tooltipTemplate': [{ type: ContentChild, args: ['tooltipTemplate',] },],
};
//# sourceMappingURL=advanced-pie-chart.component.js.map