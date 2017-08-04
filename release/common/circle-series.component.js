import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { formatLabel } from '../common/label.helper';
import { id } from '../utils/id';
var CircleSeriesComponent = (function () {
    function CircleSeriesComponent(location) {
        this.location = location;
        this.type = 'standard';
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.barVisible = false;
    }
    CircleSeriesComponent.prototype.ngOnInit = function () {
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
    };
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
        this.circle = this.circles.find(function (c) {
            return c.opacity !== 0;
        });
    };
    CircleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var tooltipLabel = formatLabel(label);
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
                var data = {
                    series: seriesName,
                    value: value,
                    name: label
                };
                return {
                    classNames: ["circle-data-" + i],
                    value: value,
                    label: label,
                    data: data,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
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
            }
        ];
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
    CircleSeriesComponent.prototype.activateCircle = function () {
        this.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function () {
        this.barVisible = false;
        this.circle.opacity = 0;
        this.deactivate.emit({ name: this.data.name });
    };
    return CircleSeriesComponent;
}());
export { CircleSeriesComponent };
CircleSeriesComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-circle-series]',
                template: "\n    <svg:g *ngIf=\"circle\">\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"barVisible && type === 'standard'\"\n        [@animationState]=\"'active'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ngx-charts-circle\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle()\"\n        (deactivate)=\"deactivateCircle()\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipTemplate ? undefined : getTooltipText(circle)\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n        [tooltipContext]=\"circle.data\"\n      />\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('animationState', [
                        transition(':enter', [
                            style({
                                opacity: 0,
                            }),
                            animate(250, style({ opacity: 1 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
CircleSeriesComponent.ctorParameters = function () { return [
    { type: LocationStrategy, },
]; };
CircleSeriesComponent.propDecorators = {
    'data': [{ type: Input },],
    'type': [{ type: Input },],
    'xScale': [{ type: Input },],
    'yScale': [{ type: Input },],
    'colors': [{ type: Input },],
    'scaleType': [{ type: Input },],
    'visibleValue': [{ type: Input },],
    'activeEntries': [{ type: Input },],
    'tooltipDisabled': [{ type: Input },],
    'tooltipTemplate': [{ type: Input },],
    'select': [{ type: Output },],
    'activate': [{ type: Output },],
    'deactivate': [{ type: Output },],
};
//# sourceMappingURL=circle-series.component.js.map