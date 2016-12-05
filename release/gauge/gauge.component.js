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
var color_sets_1 = require('../utils/color-sets');
var GaugeComponent = (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.value = 0;
        this.min = 0;
        this.max = 100;
        this.bigSegments = 10;
        this.smallSegments = 5;
        this.clickHandler = new core_1.EventEmitter();
        this.margin = [40, 100, 40, 100];
        this.angleSpan = 240;
        this.resizeScale = 1;
        this.textTransform = '';
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        this.bindResizeEvents(this.view);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    GaugeComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (!_this.value) {
                _this.value = 0;
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                columns: 12
            });
            _this.valueDomain = _this.getValueDomain();
            _this.valueScale = _this.getValueScale();
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2;
            _this.innerRadius = _this.outerRadius - 10;
            _this.backgroundArc = {
                endAngle: _this.angleSpan * Math.PI / 180,
                innerRadius: _this.innerRadius,
                outerRadius: _this.outerRadius,
                cornerRadius: 10,
                data: {
                    value: 100,
                    name: 'Value'
                }
            };
            _this.valueArc = {
                endAngle: Math.min(_this.valueScale(_this.value), _this.angleSpan) * Math.PI / 180,
                innerRadius: _this.innerRadius,
                outerRadius: _this.outerRadius,
                cornerRadius: 10,
                data: {
                    value: _this.value,
                    name: 'Value'
                }
            };
            _this.setColors();
            _this.ticks = _this.getTicks();
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var circleHeight = _this.outerRadius / 2 + 20;
            var yOffset = _this.margin[0] + _this.dims.height / 2 + circleHeight / 2;
            _this.transform = "translate(" + xOffset + ", " + yOffset + ") rotate(-" + _this.angleSpan / 2 + ")";
            _this.scaleText();
        });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.angleSpan])
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / (this.smallSegments);
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.outerRadius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = 'middle';
            if (angleDeg < 90) {
                textAnchor = 'end';
            }
            else if (angleDeg >= 180) {
                textAnchor = 'start';
            }
            ticks.big.push({
                line: this.getTickPath(startDistance, tickLength, angle),
                textAnchor: textAnchor,
                text: Number.parseInt(this.valueScale.invert(angleDeg).toString()).toLocaleString(),
                textTransform: "translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(210)",
                highlighted: this.valueScale.invert(angleDeg) <= this.value
            });
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle),
                    highlighted: this.valueScale.invert(smallAngleDeg) <= this.value
                });
            }
        }
        return ticks;
    };
    GaugeComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var line = d3_1.default.line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return line(points);
    };
    GaugeComponent.prototype.displayValue = function () {
        if (this.units) {
            return this.value.toLocaleString() + " " + this.units;
        }
        else {
            return this.value.toLocaleString();
        }
    };
    GaugeComponent.prototype.scaleText = function () {
        var _this = this;
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        if (width === 0)
            return;
        var oldScale = this.resizeScale;
        var availableSpace = this.outerRadius;
        this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            setTimeout(function () { _this.scaleText(); });
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.clickHandler.emit(data);
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    };
    GaugeComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'gauge',
                    template: "\n    <chart\n      [legend]=\"legend\"\n      [legendData]=\"colorScale\"\n      (legendLabelClick)=\"onClick($event)\"\n      [data]=\"valueDomain\"\n      [view]=\"[width, height]\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g pieArc\n          class=\"background-arc\"\n          [startAngle]=\"0\"\n          [endAngle]=\"backgroundArc.endAngle\"\n          [innerRadius]=\"backgroundArc.innerRadius\"\n          [outerRadius]=\"backgroundArc.outerRadius\"\n          [cornerRadius]=\"backgroundArc.cornerRadius\"\n          [data]=\"backgroundArc.data\"\n          [animate]=\"false\"\n          [pointerEvents]=\"false\">\n        </svg:g>\n        <svg:g pieArc\n          [startAngle]=\"0\"\n          [endAngle]=\"valueArc.endAngle\"\n          [innerRadius]=\"valueArc.innerRadius\"\n          [outerRadius]=\"valueArc.outerRadius\"\n          [cornerRadius]=\"valueArc.cornerRadius\"\n          [fill]=\"colors(value)\"\n          [data]=\"valueArc.data\"\n          [animate]=\"true\"\n          (clickHandler)=\"onClick($event)\">\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n          class=\"gauge-tick gauge-tick-large\"\n          transform=\"rotate(-90)\"\n          [class.highlighted]=\"tick.highlighted\">\n          <svg:path\n            [attr.d]=\"tick.line\"\n          />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n          class=\"gauge-tick gauge-tick-large\"\n          transform=\"rotate(-90)\"\n          [ngClass]=\"{'highlighted': tick.highlighted}\">\n          <svg:text\n            [style.textAnchor]=\"tick.textAnchor\"\n            [attr.transform]=\"tick.textTransform\"\n            alignment-baseline=\"central\">\n            {{tick.text}}\n          </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"\n          class=\"gauge-tick gauge-tick-small\"\n          transform=\"rotate(-90)\"\n          [class.highlighted]=\"tick.highlighted\">\n          <svg:path\n            [attr.d]=\"tick.line\"\n          />\n        </svg:g>\n        <svg:g transform=\"rotate(120)\">\n          <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n            {{displayValue()}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    GaugeComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    GaugeComponent.propDecorators = {
        'view': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'min': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'units': [{ type: core_1.Input },],
        'bigSegments': [{ type: core_1.Input },],
        'smallSegments': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
        'textEl': [{ type: core_1.ViewChild, args: ['textEl',] },],
    };
    return GaugeComponent;
}(base_chart_component_1.BaseChartComponent));
exports.GaugeComponent = GaugeComponent;
//# sourceMappingURL=gauge.component.js.map