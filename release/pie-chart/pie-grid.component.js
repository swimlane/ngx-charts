var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { min } from 'd3-array';
import { format } from 'd3-format';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import { formatLabel } from '../common/label.helper';
var PieGridComponent = (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieGridComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, 150);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
        this.tooltipText = this.tooltipText || this.defaultTooltipText;
    };
    PieGridComponent.prototype.defaultTooltipText = function (_a) {
        var data = _a.data;
        var label = trimLabel(formatLabel(data.name));
        var val = data.value.toLocaleString();
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var name = d.data.name;
            var label = formatLabel(name);
            var value = d.data.value;
            var radius = (min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                name: name,
                label: trimLabel(label),
                total: value,
                value: value,
                percent: format('.1%')(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return PieGridComponent;
}(BaseChartComponent));
export { PieGridComponent };
PieGridComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-pie-grid',
                template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n          <svg:g ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipText({data: series})\"\n          />\n          <svg:text\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\">\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"'Total: '\">\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                styleUrls: [
                    '../common/base-chart.component.css',
                    './pie-grid.component.css'
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
PieGridComponent.ctorParameters = function () { return []; };
PieGridComponent.propDecorators = {
    'tooltipDisabled': [{ type: Input },],
    'tooltipText': [{ type: Input },],
};
//# sourceMappingURL=pie-grid.component.js.map