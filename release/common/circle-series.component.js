"use strict";
var core_1 = require('@angular/core');
var moment = require('moment');
var label_helper_1 = require('../common/label.helper');
var CircleSeriesComponent = (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.clickHandler = new core_1.EventEmitter();
        this.barVisible = false;
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
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var tooltipLabel = label_helper_1.formatLabel(label);
            if (value) {
                var cx = void 0;
                if (_this.scaleType === 'time') {
                    cx = _this.xScale(moment(label).toDate());
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
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipLabel: tooltipLabel,
                    opacity: opacity,
                    seriesName: seriesName
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.clickHandler.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        return this.activeEntries.indexOf(entry) > -1;
    };
    CircleSeriesComponent.prototype.isVisible = function (circle) {
        return circle.opacity || this.isActive(circle.seriesName);
    };
    CircleSeriesComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[circleSeries]',
                    template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <svg:rect\n        *ngIf=\"barVisible\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"color\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g circle\n        *ngIf=\"isVisible(circle)\"\n        [attr.class]=\"className\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"color\"\n        [class.active]=\"isActive(circle.label)\"\n        [stroke]=\"strokeColor\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (clickHandler)=\"onClick($event, circle.label)\"\n        [style.cursor]=\"'pointer'\"\n        swui-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipText(circle)\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    CircleSeriesComponent.ctorParameters = [];
    CircleSeriesComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'type': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'color': [{ type: core_1.Input },],
        'strokeColor': [{ type: core_1.Input },],
        'scaleType': [{ type: core_1.Input },],
        'visibleValue': [{ type: core_1.Input },],
        'activeEntries': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return CircleSeriesComponent;
}());
exports.CircleSeriesComponent = CircleSeriesComponent;
//# sourceMappingURL=circle-series.component.js.map