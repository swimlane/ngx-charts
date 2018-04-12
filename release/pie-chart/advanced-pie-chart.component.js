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
import { ChangeDetectionStrategy, Component, ContentChild, EventEmitter, Input, Output, TemplateRef, ViewEncapsulation } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { BaseChartComponent } from '../common/base-chart.component';
var AdvancedPieChartComponent = /** @class */ (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.activeEntries = [];
        _this.tooltipDisabled = false;
        _this.label = 'Total';
        _this.activate = new EventEmitter();
        _this.deactivate = new EventEmitter();
        _this.margin = [20, 20, 20, 20];
        _this.valueFormatting = function (value) { return value; };
        _this.nameFormatting = function (label) { return label; };
        _this.percentageFormatting = function (percentage) { return percentage; };
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
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedPieChartComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], AdvancedPieChartComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], AdvancedPieChartComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", String)
    ], AdvancedPieChartComponent.prototype, "label", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AdvancedPieChartComponent.prototype, "activate", void 0);
    __decorate([
        Output(),
        __metadata("design:type", EventEmitter)
    ], AdvancedPieChartComponent.prototype, "deactivate", void 0);
    __decorate([
        ContentChild('tooltipTemplate'),
        __metadata("design:type", TemplateRef)
    ], AdvancedPieChartComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "valueFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "nameFormatting", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], AdvancedPieChartComponent.prototype, "percentageFormatting", void 0);
    AdvancedPieChartComponent = __decorate([
        Component({
            selector: 'ngx-charts-advanced-pie-chart',
            template: "\n    <div\n      [style.width.px]=\"width\"\n      [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\"\n        [style.width.px]=\"dims.width\"\n        [style.height.px]=\"dims.height\">\n        <ngx-charts-chart\n          [view]=\"[width, height]\"\n          [showLegend]=\"false\"\n          [animations]=\"animations\">\n          <svg:g\n            [attr.transform]=\"transform\"\n            class=\"pie chart\">\n            <svg:g ngx-charts-pie-series\n              [colors]=\"colors\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              [tooltipDisabled]=\"tooltipDisabled\"\n              [tooltipTemplate]=\"tooltipTemplate\"\n              [tooltipText]=\"tooltipText\"\n              (select)=\"onClick($event)\"\n              [animations]=\"animations\">\n            </svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div\n        class=\"advanced-pie-legend-wrapper\"\n        [style.width.px]=\"width - dims.width\"\n        [style.height.px]=\"height\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          [label]=\"label\"\n          [animations]=\"animations\"\n          [valueFormatting]=\"valueFormatting\"\n          [labelFormatting]=\"nameFormatting\"\n          [percentageFormatting]=\"percentageFormatting\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\">\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
            styleUrls: [
                '../common/base-chart.component.css',
                './advanced-pie-chart.component.css'
            ],
            encapsulation: ViewEncapsulation.None,
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], AdvancedPieChartComponent);
    return AdvancedPieChartComponent;
}(BaseChartComponent));
export { AdvancedPieChartComponent };
//# sourceMappingURL=advanced-pie-chart.component.js.map