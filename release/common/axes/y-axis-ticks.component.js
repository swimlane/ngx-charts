import { Component, Input, Output, ViewChild, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
var YAxisTicksComponent = (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.showRefLabels = false;
        this.showRefLines = false;
        this.dimensionsChanged = new EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.referenceLineLength = 0;
        this.trimLabel = trimLabel;
    }
    YAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
        if (width !== this.width) {
            this.width = width;
            this.dimensionsChanged.emit({ width: width });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    YAxisTicksComponent.prototype.update = function () {
        var _this = this;
        var scale;
        var sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
        this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;
        scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        if (this.showRefLines && this.referenceLines) {
            this.setReferencelines();
        }
        switch (this.orient) {
            case 'top':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'bottom':
                this.transform = function (tick) {
                    return 'translate(' + this.adjustedScale(tick) + ',0)';
                };
                this.textAnchor = 'middle';
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? '0em' : '.71em';
                break;
            case 'left':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'end';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            case 'right':
                this.transform = function (tick) {
                    return 'translate(0,' + this.adjustedScale(tick) + ')';
                };
                this.textAnchor = 'start';
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = '.32em';
                break;
            default:
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.setReferencelines = function () {
        this.refMin = this.adjustedScale(Math.min.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.refMax = this.adjustedScale(Math.max.apply(null, this.referenceLines.map(function (item) { return item.value; })));
        this.referenceLineLength = this.referenceLines.length;
        this.referenceAreaPath = roundedRect(0, this.refMax, this.gridLineWidth, this.refMin - this.refMax, 0, [false, false, false, false]);
    };
    YAxisTicksComponent.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks(20);
        var maxScaleTicks = this.getMaxTicks(50);
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, [maxScaleTicks]);
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function (tickHeight) {
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return "translate(" + this.adjustedScale(tick) + "," + this.verticalSpacing + ")";
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    return YAxisTicksComponent;
}());
export { YAxisTicksComponent };
YAxisTicksComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-y-axis-ticks]',
                template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:path *ngIf=\"referenceLineLength > 1 && refMax && refMin && showRefLines\"\n      class=\"reference-area\"\n      [attr.d]=\"referenceAreaPath\"\n      [attr.transform]=\"gridLineTransform()\"\n    />\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line *ngIf=\"orient === 'left'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line *ngIf=\"orient === 'right'\"\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"-gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let refLine of referenceLines\">\n      <svg:g *ngIf=\"showRefLines\" [attr.transform]=\"transform(refLine.value)\">\n        <svg:line class=\"refline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          [attr.transform]=\"gridLineTransform()\"/>\n        <svg:g *ngIf=\"showRefLabels\">\n          <title>{{trimLabel(tickFormat(refLine.value))}}</title>\n          <svg:text\n            class=\"refline-label\"\n            [attr.dy]=\"dy\"\n            [attr.y]=\"-6\"\n            [attr.x]=\"gridLineWidth\"\n            [attr.text-anchor]=\"textAnchor\" >\n            {{refLine.name}}\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
YAxisTicksComponent.ctorParameters = function () { return []; };
YAxisTicksComponent.propDecorators = {
    'scale': [{ type: Input },],
    'orient': [{ type: Input },],
    'tickArguments': [{ type: Input },],
    'tickValues': [{ type: Input },],
    'tickStroke': [{ type: Input },],
    'tickFormatting': [{ type: Input },],
    'showGridLines': [{ type: Input },],
    'gridLineWidth': [{ type: Input },],
    'height': [{ type: Input },],
    'referenceLines': [{ type: Input },],
    'showRefLabels': [{ type: Input },],
    'showRefLines': [{ type: Input },],
    'dimensionsChanged': [{ type: Output },],
    'ticksElement': [{ type: ViewChild, args: ['ticksel',] },],
};
//# sourceMappingURL=y-axis-ticks.component.js.map