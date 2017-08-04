import { Component, Input, Output, EventEmitter, ViewChild, Renderer, ChangeDetectionStrategy, } from '@angular/core';
import { trigger, style, animate, transition } from '@angular/animations';
var TooltipArea = (function () {
    function TooltipArea(renderer) {
        this.renderer = renderer;
        this.anchorOpacity = 0;
        this.anchorPos = -1;
        this.anchorValues = [];
        this.showPercentage = false;
        this.tooltipDisabled = false;
        this.hover = new EventEmitter();
    }
    TooltipArea.prototype.getValues = function (xVal) {
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
    TooltipArea.prototype.mouseMove = function (event) {
        var xPos = event.offsetX - this.dims.xOffset;
        var closestIndex = this.findClosestPointIndex(xPos);
        var closestPoint = this.xSet[closestIndex];
        this.anchorPos = this.xScale(closestPoint);
        this.anchorPos = Math.max(0, this.anchorPos);
        this.anchorPos = Math.min(this.dims.width, this.anchorPos);
        this.anchorValues = this.getValues(closestPoint);
        if (this.anchorPos !== this.lastAnchorPos) {
            var ev = new MouseEvent('mouseleave', { bubbles: false });
            this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [ev]);
            this.anchorOpacity = 0.7;
            this.hover.emit({
                value: closestPoint
            });
            this.showTooltip();
            this.lastAnchorPos = this.anchorPos;
        }
    };
    TooltipArea.prototype.findClosestPointIndex = function (xPos) {
        var minIndex = 0;
        var maxIndex = this.xSet.length - 1;
        var minDiff = Number.MAX_VALUE;
        var closestIndex = 0;
        while (minIndex <= maxIndex) {
            var currentIndex = (minIndex + maxIndex) / 2 | 0;
            var currentElement = this.xScale(this.xSet[currentIndex]);
            var curDiff = Math.abs(currentElement - xPos);
            if (curDiff < minDiff) {
                minDiff = curDiff;
                closestIndex = currentIndex;
            }
            if (currentElement < xPos) {
                minIndex = currentIndex + 1;
            }
            else if (currentElement > xPos) {
                maxIndex = currentIndex - 1;
            }
            else {
                minDiff = 0;
                closestIndex = currentIndex;
                break;
            }
        }
        return closestIndex;
    };
    TooltipArea.prototype.showTooltip = function () {
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [event]);
    };
    TooltipArea.prototype.hideTooltip = function () {
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.renderer.invokeElementMethod(this.tooltipAnchor.nativeElement, 'dispatchEvent', [event]);
        this.anchorOpacity = 0;
        this.lastAnchorPos = -1;
    };
    TooltipArea.prototype.getToolTipText = function (tooltipItem) {
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
    return TooltipArea;
}());
export { TooltipArea };
TooltipArea.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-tooltip-area]',
                template: "\n    <svg:g>\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"0\"\n        y=\"0\"\n        [attr.width]=\"dims.width\"\n        [attr.height]=\"dims.height\"\n        style=\"opacity: 0; cursor: 'auto';\"\n        (mousemove)=\"mouseMove($event)\"\n        (mouseleave)=\"hideTooltip()\"\n      />\n      <xhtml:ng-template #defaultTooltipTemplate let-model=\"model\">\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div\n            *ngFor=\"let tooltipItem of model\"\n            class=\"tooltip-item\">\n            <span\n              class=\"tooltip-item-color\"\n              [style.background-color]=\"tooltipItem.color\">\n            </span>\n            {{getToolTipText(tooltipItem)}}\n          </xhtml:div>\n        </xhtml:div>\n      </xhtml:ng-template>\n      <svg:rect\n        #tooltipAnchor\n        [@animationState]=\"anchorOpacity !== 0 ? 'active' : 'inactive'\"\n        class=\"tooltip-anchor\"\n        [attr.x]=\"anchorPos\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"dims.height\"\n        [style.opacity]=\"anchorOpacity\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipDisabled]=\"tooltipDisabled\"\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"15\"\n        [tooltipTemplate]=\"tooltipTemplate ? tooltipTemplate: defaultTooltipTemplate\"\n        [tooltipContext]=\"anchorValues\"\n        [tooltipImmediateExit]=\"true\"\n      />\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
                animations: [
                    trigger('animationState', [
                        transition('inactive => active', [
                            style({
                                opacity: 0,
                            }),
                            animate(250, style({ opacity: 0.7 }))
                        ]),
                        transition('active => inactive', [
                            style({
                                opacity: 0.7,
                            }),
                            animate(250, style({ opacity: 0 }))
                        ])
                    ])
                ]
            },] },
];
/** @nocollapse */
TooltipArea.ctorParameters = function () { return [
    { type: Renderer, },
]; };
TooltipArea.propDecorators = {
    'dims': [{ type: Input },],
    'xSet': [{ type: Input },],
    'xScale': [{ type: Input },],
    'yScale': [{ type: Input },],
    'results': [{ type: Input },],
    'colors': [{ type: Input },],
    'showPercentage': [{ type: Input },],
    'tooltipDisabled': [{ type: Input },],
    'tooltipTemplate': [{ type: Input },],
    'hover': [{ type: Output },],
    'tooltipAnchor': [{ type: ViewChild, args: ['tooltipAnchor',] },],
};
//# sourceMappingURL=tooltip-area.component.js.map