var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ViewEncapsulation, ChangeDetectionStrategy, ContentChild, TemplateRef } from '@angular/core';
import { min } from 'd3-array';
import { format } from 'd3-format';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import { formatLabel } from '../common/label.helper';
var PieGridComponent = /** @class */ (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.minWidth = 150;
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
        this.data = gridLayout(this.dims, this.results, this.minWidth, this.designatedTotal);
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
        var total = this.designatedTotal ? this.designatedTotal : this.getTotal();
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
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieGridComponent.prototype, "designatedTotal", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PieGridComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PieGridComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], PieGridComponent.prototype, "label", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PieGridComponent.prototype, "minWidth", void 0);
    __decorate([
        ContentChild('tooltipTemplate'),
        __metadata("design:type", TemplateRef)
    ], PieGridComponent.prototype, "tooltipTemplate", void 0);
    PieGridComponent = __decorate([
        Component({
            selector: 'ngx-charts-pie-grid',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      [animations]=\"animations\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n          <svg:g ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            [animations]=\"animations\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipDisabled]=\"tooltipDisabled\"\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText({data: series})\"\n            [tooltipTemplate]=\"tooltipTemplate\"\n            [tooltipContext]=\"series.data[0].data\"\n          />\n          <svg:text *ngIf=\"animations\"\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up\n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\">\n          </svg:text>\n          <svg:text *ngIf=\"!animations\"\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.percent.toLocaleString()}}\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n          <svg:text *ngIf=\"animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up\n            [countTo]=\"series.total\"\n            [countPrefix]=\"label + ': '\">\n          </svg:text>\n          <svg:text *ngIf=\"!animations\"\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\">\n            {{label}}: {{series.total.toLocaleString()}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            styleUrls: [
                '../common/base-chart.component.css',
                './pie-grid.component.css'
            ],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush,
        })
    ], PieGridComponent);
    return PieGridComponent;
}(BaseChartComponent));
export { PieGridComponent };
//# sourceMappingURL=pie-grid.component.js.map