"use strict";
var core_1 = require('@angular/core');
var AreaTooltip = (function () {
    function AreaTooltip(renderer) {
        this.renderer = renderer;
        this.anchorOpacity = new Array();
        this.hover = new core_1.EventEmitter();
    }
    AreaTooltip.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaTooltip.prototype.update = function () {
        this.tooltipAreas = this.getTooltipAreas();
    };
    AreaTooltip.prototype.getTooltipAreas = function () {
        var _this = this;
        var uniqueSet = this.getUniqueValues(this.xSet);
        uniqueSet = uniqueSet.sort(function (a, b) {
            return _this.xScale(a) - _this.xScale(b);
        });
        var results = [];
        for (var i = 0; i < uniqueSet.length; i++) {
            var val = uniqueSet[i];
            var ob = {};
            ob.tooltipAnchor = this.xScale(val);
            if (i === 0) {
                ob.x0 = this.xScale(val);
            }
            else {
                ob.x0 = (this.xScale(uniqueSet[i - 1]) + this.xScale(uniqueSet[i])) / 2;
            }
            if (i === uniqueSet.length - 1) {
                ob.x1 = this.xScale(uniqueSet[i]);
            }
            else {
                ob.x1 = (this.xScale(uniqueSet[i]) + this.xScale(uniqueSet[i + 1])) / 2;
            }
            ob.width = ob.x1 - ob.x0;
            ob.value = val;
            ob.values = this.getValues(val);
            results.push(ob);
            this.anchorOpacity[i] = 0;
        }
        return results;
    };
    AreaTooltip.prototype.getValues = function (xVal) {
        var results = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var item = group.series.find(function (d) { return d.name.toString() === xVal.toString(); });
            if (item) {
                results.push({
                    value: item.value,
                    name: item.name,
                    series: group.name
                });
            }
        }
        return results;
    };
    AreaTooltip.prototype.getUniqueValues = function (array) {
        var results = [];
        var _loop_1 = function(i) {
            var val = array[i];
            var exists = results.find(function (v) {
                return v.toString() === val.toString();
            });
            if (!exists) {
                results.push(val);
            }
        };
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
        }
        return results;
    };
    AreaTooltip.prototype.showTooltip = function (index) {
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0.7;
        this.hover.emit(this.tooltipAreas[index]);
    };
    AreaTooltip.prototype.hideTooltip = function (index) {
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0;
    };
    AreaTooltip.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[areaTooltip]',
                    template: "\n    <svg:g\n      #tooltips\n      *ngFor=\"let tooltipArea of tooltipAreas; let i = index\">\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"tooltipArea.x0\"\n        y=\"0\"\n        [attr.width]=\"tooltipArea.width\"\n        [attr.height]=\"height\"\n        style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n        (mouseenter)=\"showTooltip(i)\"\n        (mouseleave)=\"hideTooltip(i)\"\n      />\n\n      <xhtml:template #tooltipTemplate>\n        <xhtml:div\n          *ngFor=\"let tooltipItem of tooltipArea.values\"\n          class=\"tooltip-item\">\n\n          <span\n            class=\"tooltip-item-color\"\n            [style.background-color]=\"colors(tooltipItem.series)\">\n          </span>\n\n          {{tooltipItem.series}}: {{tooltipItem.value}}\n        </xhtml:div>\n      </xhtml:template>\n\n      <svg:rect\n        class=\"tooltip-anchor\"\n        [attr.x]=\"tooltipArea.tooltipAnchor\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"height\"\n        style=\"fill: rgb(255, 255, 255);\"\n        [style.opacity]=\"anchorOpacity[i]\"\n        [style.pointer-events]=\"'none'\"\n\n        swui-tooltip\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"5\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n      />\n\n    </svg:g>\n  "
                },] },
    ];
    AreaTooltip.ctorParameters = [
        { type: core_1.Renderer, },
    ];
    AreaTooltip.propDecorators = {
        'xSet': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'hover': [{ type: core_1.Output },],
        'tooltips': [{ type: core_1.ViewChildren, args: ['tooltips',] },],
    };
    return AreaTooltip;
}());
exports.AreaTooltip = AreaTooltip;
//# sourceMappingURL=area-tooltip.component.js.map