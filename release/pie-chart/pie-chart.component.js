"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
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
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var color_helper_1 = require("../common/color.helper");
var base_chart_component_1 = require("../common/base-chart.component");
var PieChartComponent = (function (_super) {
    __extends(PieChartComponent, _super);
    function PieChartComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.labels = false;
        _this.legend = false;
        _this.explodeSlices = false;
        _this.doughnut = false;
        _this.arcWidth = 0.25;
        _this.activeEntries = [];
        _this.select = new core_1.EventEmitter();
        _this.activate = new core_1.EventEmitter();
        _this.deactivate = new core_1.EventEmitter();
        _this.margin = [20, 20, 20, 20];
        return _this;
    }
    PieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (_this.labels) {
                _this.margin = [30, 80, 30, 80];
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showLegend: _this.legend,
                columns: 10
            });
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.translation = "translate(" + xOffset + ", " + yOffset + ")";
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height);
            if (_this.labels) {
                // make room for labels
                _this.outerRadius /= 3;
            }
            else {
                _this.outerRadius /= 2;
            }
            _this.innerRadius = 0;
            if (_this.doughnut) {
                _this.innerRadius = _this.outerRadius * (1 - _this.arcWidth);
            }
            _this.domain = _this.getDomain();
            // sort data according to domain
            _this.data = _this.results.sort(function (a, b) {
                return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
            });
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
        });
    };
    PieChartComponent.prototype.getDomain = function () {
        var items = [];
        this.results.map(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            if (items.indexOf(label) === -1) {
                items.push(label);
            }
        });
        return items;
    };
    PieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieChartComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieChartComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors
        };
    };
    PieChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: item, entries: this.activeEntries });
    };
    return PieChartComponent;
}(base_chart_component_1.BaseChartComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "labels", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "legend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "explodeSlices", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "doughnut", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "arcWidth", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], PieChartComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], PieChartComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], PieChartComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PieChartComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], PieChartComponent.prototype, "deactivate", void 0);
PieChartComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-pie-chart',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n        <svg:g ngx-charts-pie-series\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"data\"\n          [activeEntries]=\"activeEntries\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: [
            '../common/base-chart.component.scss',
            './pie-chart.component.scss'
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    })
], PieChartComponent);
exports.PieChartComponent = PieChartComponent;
//# sourceMappingURL=pie-chart.component.js.map