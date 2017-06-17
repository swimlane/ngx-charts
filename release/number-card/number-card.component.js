var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, ViewEncapsulation, ChangeDetectionStrategy, Input } from '@angular/core';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { gridLayout, gridSize } from '../common/grid-layout.helper';
var NumberCardComponent = (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.emptyColor = 'rgba(0, 0, 0, 0)';
        _this.innerPadding = 15;
        _this.margin = [10, 10, 10, 10];
        return _this;
    }
    Object.defineProperty(NumberCardComponent.prototype, "clickable", {
        get: function () {
            return !!this.select.observers.length;
        },
        enumerable: true,
        configurable: true
    });
    NumberCardComponent.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions({
            width: this.width,
            height: this.height,
            margins: this.margin
        });
        this.domain = this.getDomain();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var size = gridSize(this.dims, this.results.length, 150);
        var N = size[0] * size[1];
        var data = this.results.slice();
        while (data.length < N) {
            data.push({ value: null });
        }
        this.data = gridLayout(this.dims, data, 150);
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    return NumberCardComponent;
}(BaseChartComponent));
export { NumberCardComponent };
NumberCardComponent.decorators = [
    { type: Component, args: [{
                selector: 'ngx-charts-number-card',
                template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\" [class.clickable]=\"clickable\">\n        <svg:g ngx-charts-card-series\n          [colors]=\"colors\"\n          [cardColor]=\"cardColor\"\n          [bandColor]=\"bandColor\"\n          [textColor]=\"textColor\"\n          [emptyColor]=\"emptyColor\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [innerPadding]=\"innerPadding\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"labelFormatting\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                styleUrls: [
                    '../common/base-chart.component.css',
                    './card.component.css'
                ],
                encapsulation: ViewEncapsulation.None,
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
NumberCardComponent.ctorParameters = function () { return []; };
NumberCardComponent.propDecorators = {
    'cardColor': [{ type: Input },],
    'bandColor': [{ type: Input },],
    'emptyColor': [{ type: Input },],
    'innerPadding': [{ type: Input },],
    'textColor': [{ type: Input },],
    'valueFormatting': [{ type: Input },],
    'labelFormatting': [{ type: Input },],
};
//# sourceMappingURL=number-card.component.js.map