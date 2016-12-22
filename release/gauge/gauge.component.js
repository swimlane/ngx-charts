"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_helper_1 = require('../common/color.helper');
var GaugeComponent = (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent() {
        _super.apply(this, arguments);
        this.min = 0;
        this.max = 100;
        this.bigSegments = 10;
        this.smallSegments = 5;
        this.showAxis = true;
        this.startAngle = -120;
        this.angleSpan = 240;
        this.schemeType = 'ordinal';
        this.resizeScale = 1;
        this.rotation = '';
        this.textTransform = '';
        this.cornerRadius = 10;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (!_this.showAxis) {
                _this.margin = [10, 20, 10, 20];
            }
            else {
                _this.margin = [60, 100, 60, 100];
            }
            // make the starting angle positive
            if (_this.startAngle < 0) {
                _this.startAngle = (_this.startAngle % 360) + 360;
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.valueScale = _this.getValueScale();
            _this.displayValue = _this.getDisplayValue();
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2;
            _this.arcs = _this.getArcs();
            _this.setColors();
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            _this.rotation = "rotate(" + _this.startAngle + ")";
            _this.scaleText();
        });
    };
    GaugeComponent.prototype.getArcs = function () {
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var d = _a[_i];
            var outerRadius = this.outerRadius - (i * radiusPerArc);
            var innerRadius = outerRadius - arcWidth;
            var backgroundArc = {
                endAngle: this.angleSpan * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            var valueArc = {
                endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            var arc = {
                backgroundArc: backgroundArc,
                valueArc: valueArc
            };
            arcs.push(arc);
            i++;
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, values);
        var dataMax = Math.max.apply(Math, values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.angleSpan])
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function () {
        var _this = this;
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        if (width === 0)
            return;
        var oldScale = this.resizeScale;
        var availableSpace = this.textRadius;
        this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            setTimeout(function () { _this.scaleText(); });
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    GaugeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'ngx-charts-gauge',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs\" [attr.transform]=\"rotation\">\n          <svg:g ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            (select)=\"onClick($event)\">\n          </svg:g>\n        </svg:g>\n\n        <svg:g ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"0\">{{displayValue}}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{units}}</tspan>\n        </svg:text>\n        \n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    GaugeComponent.ctorParameters = function () { return []; };
    GaugeComponent.propDecorators = {
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'units': [{ type: core_1.Input },],
        'bigSegments': [{ type: core_1.Input },],
        'smallSegments': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'showAxis': [{ type: core_1.Input },],
        'startAngle': [{ type: core_1.Input },],
        'angleSpan': [{ type: core_1.Input },],
        'schemeType': [{ type: core_1.Input },],
        'textEl': [{ type: core_1.ViewChild, args: ['textEl',] },],
    };
    return GaugeComponent;
}(base_chart_component_1.BaseChartComponent));
exports.GaugeComponent = GaugeComponent;
//# sourceMappingURL=gauge.component.js.map