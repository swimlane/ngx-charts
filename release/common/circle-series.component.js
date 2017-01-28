"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var label_helper_1 = require('../common/label.helper');
var id_1 = require('../utils/id');
var CircleSeriesComponent = (function () {
    function CircleSeriesComponent(location) {
        this.location = location;
        this.type = 'standard';
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    CircleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        var pageUrl = this.location.path();
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var tooltipLabel = label_helper_1.formatLabel(label);
            if (value) {
                var cx = void 0;
                if (_this.scaleType === 'time') {
                    cx = _this.xScale(label);
                }
                else if (_this.scaleType === 'linear') {
                    cx = _this.xScale(Number(label));
                }
                else {
                    cx = _this.xScale(label);
                }
                var cy = _this.yScale(_this.type === 'standard' ? value : d.d1);
                var radius = 5;
                var height = _this.yScale.range()[0] - cy;
                var opacity = 0;
                if (label && _this.visibleValue && label.toString() === _this.visibleValue.toString()) {
                    opacity = 1;
                }
                var gradientId = 'grad' + id_1.id().toString();
                var gradientFill = "url(" + pageUrl + "#" + gradientId + ")";
                var color = void 0;
                if (_this.colors.scaleType === 'linear') {
                    if (_this.type === 'standard') {
                        color = _this.colors.getColor(value);
                    }
                    else {
                        color = _this.colors.getColor(d.d1);
                    }
                }
                else {
                    color = _this.colors.getColor(seriesName);
                }
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    barVisible: false,
                    gradientId: gradientId,
                    gradientFill: gradientFill,
                    gradientStops: _this.getGradientStops(color),
                    min: d.min,
                    max: d.max
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName, min = _a.min, max = _a.max;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + this.getTooltipMinMaxText(min, max) + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getTooltipMinMaxText = function (min, max) {
        if (min !== undefined || max !== undefined) {
            var result = ' (';
            if (min !== undefined) {
                if (max === undefined) {
                    result += '≥';
                }
                result += min.toLocaleString();
                if (max !== undefined) {
                    result += ' - ';
                }
            }
            else if (max !== undefined) {
                result += '≤';
            }
            if (max !== undefined) {
                result += max.toLocaleString();
            }
            result += ')';
            return result;
        }
        else {
            return '';
        }
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }];
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    CircleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-circle-series]',
                    template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient\n          [color]=\"color\"\n          orientation=\"vertical\"\n          [name]=\"circle.gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"circle.barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"circle.gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ngx-charts-circle\n        *ngIf=\"isVisible(circle)\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle(circle)\"\n        (deactivate)=\"deactivateCircle(circle)\"\n        ngx-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipText(circle)\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('void => *', [
                                core_1.style({
                                    opacity: 0,
                                }),
                                core_1.animate(250, core_1.style({ opacity: 1 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    CircleSeriesComponent.ctorParameters = function () { return [
        { type: common_1.Location, },
    ]; };
    CircleSeriesComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'scaleType': [{ type: core_1.Input },],
        'visibleValue': [{ type: core_1.Input },],
        'activeEntries': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return CircleSeriesComponent;
}());
exports.CircleSeriesComponent = CircleSeriesComponent;
//# sourceMappingURL=circle-series.component.js.map