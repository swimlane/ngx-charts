var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Component, Input, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { radialLine } from 'd3-shape';
import { id } from '../utils/id';
import { sortLinear, sortByTime, sortByDomain } from '../utils/sort';
var PolarSeriesComponent = /** @class */ (function () {
    function PolarSeriesComponent() {
        this.tooltipDisabled = false;
        this.gradient = false;
        this.animations = true;
        this.circleRadius = 3;
    }
    PolarSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PolarSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradients();
        var line = this.getLineGenerator();
        var data = this.sortData(this.data.series);
        var seriesName = this.data.name;
        var linearScaleType = this.colors.scaleType === 'linear';
        var min = this.yScale.domain()[0];
        this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);
        this.path = line(data) || '';
        this.circles = data.map(function (d) {
            var a = _this.getAngle(d);
            var r = _this.getRadius(d);
            var value = d.value;
            var color = _this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);
            var cData = {
                series: seriesName,
                value: value,
                name: d.name
            };
            return {
                data: cData,
                cx: r * Math.sin(a),
                cy: -r * Math.cos(a),
                value: value,
                color: color,
                label: d.name
            };
        });
        this.active = this.isActive(this.data);
        this.inactive = this.isInactive(this.data);
        this.tooltipText = this.tooltipText || (function (c) { return _this.defaultTooltipText(c); });
    };
    PolarSeriesComponent.prototype.getAngle = function (d) {
        var label = d.name;
        if (this.scaleType === 'time') {
            return this.xScale(label);
        }
        else if (this.scaleType === 'linear') {
            return this.xScale(Number(label));
        }
        return this.xScale(label);
    };
    PolarSeriesComponent.prototype.getRadius = function (d) {
        return this.yScale(d.value);
    };
    PolarSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return radialLine()
            .angle(function (d) { return _this.getAngle(d); })
            .radius(function (d) { return _this.getRadius(d); })
            .curve(this.curve);
    };
    PolarSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            return sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            return sortByTime(data, 'name');
        }
        return sortByDomain(data, 'name', 'asc', this.xScale.domain());
    };
    PolarSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    PolarSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    PolarSeriesComponent.prototype.defaultTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + this.data.name + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    PolarSeriesComponent.prototype.updateGradients = function () {
        this.hasGradient = this.gradient || this.colors.scaleType === 'linear';
        if (!this.hasGradient) {
            return;
        }
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        if (this.colors.scaleType === 'linear') {
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
        }
        else {
            this.gradientStops = undefined;
        }
    };
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "name", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "data", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "colors", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Object)
    ], PolarSeriesComponent.prototype, "curve", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Array)
    ], PolarSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Number)
    ], PolarSeriesComponent.prototype, "rangeFillOpacity", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "tooltipDisabled", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Function)
    ], PolarSeriesComponent.prototype, "tooltipText", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        Input(),
        __metadata("design:type", TemplateRef)
    ], PolarSeriesComponent.prototype, "tooltipTemplate", void 0);
    __decorate([
        Input(),
        __metadata("design:type", Boolean)
    ], PolarSeriesComponent.prototype, "animations", void 0);
    PolarSeriesComponent = __decorate([
        Component({
            selector: 'g[ngx-charts-polar-series]',
            template: "\n    <svg:g class=\"polar-charts-series\">\n      <defs>\n        <svg:g ngx-charts-svg-radial-gradient *ngIf=\"hasGradient\"\n          orientation=\"vertical\"\n          [color]=\"seriesColor\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"0.25\"\n          [endOpacity]=\"1\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-line\n        class=\"polar-series-path\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : seriesColor\"\n        [class.active]=\"active\"\n        [class.inactive]=\"inactive\"\n        [attr.fill-opacity]=\"rangeFillOpacity\"\n        [fill]=\"hasGradient ? gradientUrl : seriesColor\"\n        [animations]=\"animations\"\n      />\n      <svg:g ngx-charts-circle\n        *ngFor=\"let circle of circles\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circleRadius\"\n        [fill]=\"circle.color\"\n        [style.opacity]=\"inactive ? 0.2 : 1\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        tooltipType=\"tooltip\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : tooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: ChangeDetectionStrategy.OnPush
        })
    ], PolarSeriesComponent);
    return PolarSeriesComponent;
}());
export { PolarSeriesComponent };
//# sourceMappingURL=polar-series.component.js.map