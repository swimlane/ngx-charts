"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require("@angular/core");
var d3_1 = require("../d3");
var sort_1 = require("../utils/sort");
var AreaSeriesComponent = (function () {
    function AreaSeriesComponent() {
        this.stacked = false;
        this.normalized = false;
        this.select = new core_1.EventEmitter();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var area;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        area.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sort_1.sortByTime(data, 'name');
        }
        else {
            data = sort_1.sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = area(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                var max = Math.max.apply(Math, d1values);
                var min = Math.min.apply(Math, d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    return AreaSeriesComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "xScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "yScale", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "colors", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "scaleType", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AreaSeriesComponent.prototype, "stacked", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AreaSeriesComponent.prototype, "normalized", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "curve", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AreaSeriesComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AreaSeriesComponent.prototype, "select", void 0);
AreaSeriesComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-area-series]',
        template: "\n    <svg:g ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], AreaSeriesComponent);
exports.AreaSeriesComponent = AreaSeriesComponent;
//# sourceMappingURL=area-series.component.js.map