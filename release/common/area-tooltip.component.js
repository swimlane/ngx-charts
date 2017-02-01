"use strict";
var core_1 = require('@angular/core');
var AreaTooltip = (function () {
    function AreaTooltip(renderer) {
        this.renderer = renderer;
        this.anchorOpacity = new Array();
        this.showPercentage = false;
        this.hover = new core_1.EventEmitter();
    }
    AreaTooltip.prototype.ngOnChanges = function (changes) {
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
            var groupName = group.name;
            if (groupName instanceof Date) {
                groupName = groupName.toLocaleDateString();
            }
            if (item) {
                var label = item.name;
                if (label instanceof Date) {
                    label = label.toLocaleDateString();
                }
                var val = item.value;
                if (this.showPercentage) {
                    val = (item.d1 - item.d0).toFixed(2) + '%';
                }
                var color = void 0;
                if (this.colors.scaleType === 'linear') {
                    var v = val;
                    if (item.d1) {
                        v = item.d1;
                    }
                    color = this.colors.getColor(v);
                }
                else {
                    color = this.colors.getColor(group.name);
                }
                results.push({
                    value: val,
                    name: label,
                    series: groupName,
                    min: item.min,
                    max: item.max,
                    color: color
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
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.getElementsByTagName('rect')[1];
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0.7;
        this.hover.emit(this.tooltipAreas[index]);
    };
    AreaTooltip.prototype.hideTooltip = function (index) {
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.getElementsByTagName('rect')[1];
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0;
    };
    AreaTooltip.prototype.getToolTipText = function (tooltipItem) {
        var result = '';
        if (tooltipItem.series !== undefined) {
            result += tooltipItem.series;
        }
        else {
            result += '???';
        }
        result += ': ';
        if (tooltipItem.value !== undefined) {
            result += tooltipItem.value.toLocaleString();
        }
        if (tooltipItem.min !== undefined || tooltipItem.max !== undefined) {
            result += ' (';
            if (tooltipItem.min !== undefined) {
                if (tooltipItem.max === undefined) {
                    result += '≥';
                }
                result += tooltipItem.min.toLocaleString();
                if (tooltipItem.max !== undefined) {
                    result += ' - ';
                }
            }
            else if (tooltipItem.max !== undefined) {
                result += '≤';
            }
            if (tooltipItem.max !== undefined) {
                result += tooltipItem.max.toLocaleString();
            }
            result += ')';
        }
        return result;
    };
    AreaTooltip.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-area-tooltip]',
                    template: "\n    <svg:g\n      #tooltips\n      *ngFor=\"let tooltipArea of tooltipAreas; let i = index\">\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"tooltipArea.x0\"\n        y=\"0\"\n        [attr.width]=\"tooltipArea.width\"\n        [attr.height]=\"height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mouseenter)=\"showTooltip(i)\"\n        (mouseleave)=\"hideTooltip(i)\"\n      />\n      <xhtml:template #tooltipTemplate>\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div\n            *ngFor=\"let tooltipItem of tooltipArea.values\"\n            class=\"tooltip-item\">\n            <span\n              class=\"tooltip-item-color\"\n              [style.background-color]=\"tooltipItem.color\">\n            </span>\n            {{getToolTipText(tooltipItem)}}\n          </xhtml:div>\n        </xhtml:div>\n      </xhtml:template>\n      <svg:rect\n        [@animationState]=\"anchorOpacity[i] !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"tooltipArea.tooltipAnchor\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"height\"\n        [style.opacity]=\"anchorOpacity[i]\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                    animations: [
                        core_1.trigger('animationState', [
                            core_1.transition('inactive => active', [
                                core_1.style({
                                    opacity: 0,
                                }),
                                core_1.animate(250, core_1.style({ opacity: 0.7 }))
                            ]),
                            core_1.transition('active => inactive', [
                                core_1.style({
                                    opacity: 0.7,
                                }),
                                core_1.animate(250, core_1.style({ opacity: 0 }))
                            ])
                        ])
                    ]
                },] },
    ];
    /** @nocollapse */
    AreaTooltip.ctorParameters = function () { return [
        { type: core_1.Renderer, },
    ]; };
    AreaTooltip.propDecorators = {
        'xSet': [{ type: core_1.Input },],
        'xScale': [{ type: core_1.Input },],
        'yScale': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'showPercentage': [{ type: core_1.Input },],
        'hover': [{ type: core_1.Output },],
        'tooltips': [{ type: core_1.ViewChildren, args: ['tooltips',] },],
    };
    return AreaTooltip;
}());
exports.AreaTooltip = AreaTooltip;
//# sourceMappingURL=area-tooltip.component.js.map