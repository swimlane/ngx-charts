/**
 * ng2d3 v1.0.0 (https://github.com/swimlane/ng2d3)
 * Copyright 2016
 * Licensed under MIT
 */
import { NgModule, Component, Input, Renderer, ElementRef, Directive, ViewContainerRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import * as moment$1 from 'moment';
import moment$1__default from 'moment';

function __extends(d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
}

function __decorate(decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
}

function __metadata(k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
}

var Chart = (function () {
    function Chart() {
        this.legend = false;
        this.legendTitle = 'Legend';
    }
    Chart.prototype.ngOnInit = function () {
        this.update();
    };
    Chart.prototype.ngOnChanges = function () {
        this.update();
    };
    Chart.prototype.update = function () {
        this.legendWidth = 0;
        if (this.legend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                this.legendWidth = 1;
            }
            else {
                this.legendWidth = 3;
            }
        }
        this.chartWidth = 12 - this.legendWidth;
    };
    Chart.prototype.getLegendType = function () {
        if (typeof this.legendData === 'function') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendData", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "legendTitle", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Chart.prototype, "colors", void 0);
    Chart = __decorate([
        Component({
            selector: 'chart',
            template: "\n    <svg\n      class=\"ng2d3\"\n      [attr.width]=\"view[0] * chartWidth / 12.0\"\n      [attr.height]=\"view[1]\">\n\n      <ng-content></ng-content>\n    </svg>\n\n    <scale-legend\n      *ngIf=\"legend && legendType === 'scaleLegend'\"\n      class=\"legend\"\n      [valueRange]=\"data\"\n      [colors]=\"legendData\"\n      [height]=\"view[1]\">\n    </scale-legend>\n\n    <legend\n      *ngIf=\"legend && legendType === 'legend'\"\n      class=\"legend\"\n      [data]=\"legendData\"\n      [title]=\"legendTitle\"\n      [colors]=\"colors\"\n      [height]=\"view[1]\">\n    </legend>\n"
        }), 
        __metadata('design:paramtypes', [])
    ], Chart);
    return Chart;
}());

function trimLabel(s, max) {
    if (max === void 0) { max = 16; }
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    if (s.length <= max) {
        return s;
    }
    else {
        return s.slice(0, max).trim() + "...";
    }
}

var Legend = (function () {
    function Legend() {
    }
    Legend.prototype.ngOnInit = function () {
        this.update();
    };
    Legend.prototype.ngOnChanges = function () {
        this.update();
    };
    Legend.prototype.update = function () {
        this.legendItems = this.getLegendItems();
    };
    Legend.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (label, index) {
            return {
                className: 'legend-label',
                label: label,
                trimmedLabel: trimLabel(label) || '(empty)',
                backgroundColor: _this.colors(label)
            };
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "title", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Legend.prototype, "height", void 0);
    Legend = __decorate([
        Component({
            selector: 'legend',
            template: "\n    <div >\n      <header class=\"legend-title\"\n        style=\"white-space: nowrap; overflow: hidden;\">\n        <span class=\"legend-icon incon-eye-1\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\" style=\"white-space: nowrap;\">\n          <li *ngFor=\"let legendItem of legendItems\" [class]=\"legendItem.className\">\n            <span\n              [title]=\"legendItem.label\"\n              class=\"legend-label-color\"\n              [style.background-color]=\"colors(legendItem.label)\">\n            </span>\n\n            <span [title]=\"legendItem.label\" class=\"legend-label-text\">\n              {{legendItem.trimmedLabel}}\n            </span>\n\n          </li>\n        </ul>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Legend);
    return Legend;
}());

var ScaleLegend = (function () {
    function ScaleLegend() {
    }
    ScaleLegend.prototype.ngOnInit = function () {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = "linear-gradient(to bottom, " + gradientValues + ")";
    };
    ScaleLegend.prototype.gradientString = function (colors, splits) {
        splits.push(1);
        var pairs = [];
        colors.forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "valueRange", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], ScaleLegend.prototype, "height", void 0);
    ScaleLegend = __decorate([
        Component({
            selector: 'scale-legend',
            template: "\n    <div>\n      <div\n        style=\"padding: 10px 0px; width: 30px; text-align: center;\"\n        [style.height]=\"(height - 40) + 'px'\">\n\n        <div>\n          <span>{{valueRange[0]}}</span>\n        </div>\n\n        <div class=\"legend-wrap\"\n          style=\"height: 100%; width: 100%; border-radius: 5px;\"\n          [style.background]=\"gradient\">\n        </div>\n\n        <div>\n          <span>{{valueRange[1].toFixed()}}</span>\n        </div>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], ScaleLegend);
    return ScaleLegend;
}());

var AxisLabel = (function () {
    function AxisLabel() {
    }
    AxisLabel.prototype.ngOnInit = function () {
        this.update();
    };
    AxisLabel.prototype.ngOnChanges = function () {
        this.update();
    };
    AxisLabel.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
            case 'right':
                this.y = this.offset;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "orient", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "offset", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AxisLabel.prototype, "height", void 0);
    AxisLabel = __decorate([
        Component({
            selector: 'g[axisLabel]',
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AxisLabel);
    return AxisLabel;
}());

var XAxis = (function () {
    function XAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            xAxisClassName: 'x axis',
            xOrient: 'bottom',
            fill: 'none',
            stroke: 'none',
            tickStroke: '#ccc',
            strokeWidth: 'none',
            xAxisOffset: 5,
        });
    }
    XAxis.prototype.ngOnInit = function () {
        this.update();
    };
    XAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    XAxis.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
        if (typeof this.xAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "tickFormatting", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showGridLines", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "showLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "labelText", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxis.prototype, "xAxisTickInterval", void 0);
    XAxis = __decorate([
        Component({
            selector: 'g[xAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g xAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], XAxis);
    return XAxis;
}());

function reduceTicks(ticks, maxTicks) {
    if (ticks.length > maxTicks) {
        var reduced = [];
        var modulus = Math.floor(ticks.length / maxTicks);
        for (var i = 0; i < ticks.length; i++) {
            if (i % modulus === 0) {
                reduced.push(ticks[i]);
            }
        }
        ticks = reduced;
    }
    return ticks;
}

var XAxisTicks = (function () {
    function XAxisTicks() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.maxAllowedLength = 16;
        Object.assign(this, {
            innerTickSize: 6,
            outerTickSize: 6,
            tickPadding: 3,
            rotateLabels: false,
            verticalSpacing: 20,
            textAnchor: 'middle',
            maxTicksLength: 0,
            trimLabel: trimLabel
        });
    }
    XAxisTicks.prototype.ngOnInit = function () {
        this.update();
    };
    XAxisTicks.prototype.ngOnChanges = function () {
        this.update();
    };
    XAxisTicks.prototype.update = function () {
        var scale = this.scale;
        this.ticks = this.getTicks();
        if (this.tickFormatting) {
            this.tickFormat = this.tickFormatting;
        }
        else if (scale.tickFormat) {
            this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
        }
        else {
            this.tickFormat = function (d) {
                return d;
            };
        }
        var angle = this.getRotationAngle(this.ticks);
        this.adjustedScale = this.scale.bandwidth ? function (d) {
            return this.scale(d) + this.scale.bandwidth() * 0.5;
        } : this.scale;
        this.textTransform = '';
        if (angle !== 0) {
            this.textTransform = "rotate(" + angle + ")";
            this.textAnchor = 'end';
            this.verticalSpacing = 10;
        }
    };
    XAxisTicks.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = ticks[i].toString();
            if (tick.length > this.maxTicksLength) {
                this.maxTicksLength = tick.length;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8;
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicks.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicks.prototype.getMaxTicks = function () {
        var tickWidth = 20;
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicks.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicks.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "scale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "orient", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickArguments", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickStroke", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "tickFormatting", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "showGridLines", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "gridLineHeight", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], XAxisTicks.prototype, "width", void 0);
    XAxisTicks = __decorate([
        Component({
            selector: 'g[xAxisTicks]',
            template: "\n    <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n      [attr.transform]=\"tickTransform(tick)\">\n      <title>{{tickFormat(tick)}}</title>\n      <svg:text\n        stroke-width=\"0.01\"\n        [attr.text-anchor]=\"textAnchor\"\n        [attr.transform]=\"textTransform\"\n        [style.font-size]=\"'12px'\">\n        {{trimLabel(tickFormat(tick))}}\n      </svg:text>\n\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n\n        <svg:line\n          class=\"gridline-path gridline-path-vertical gridline-path-shadow\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n        <svg:line\n          class=\"gridline-path gridline-path-vertical\"\n          x1=\"1\"\n          x2=\"1\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], XAxisTicks);
    return XAxisTicks;
}());

var YAxis = (function () {
    function YAxis() {
        this.showGridLines = false;
        Object.assign(this, {
            yAxisClassName: 'y axis',
            yOrient: 'left',
            fill: 'none',
            stroke: '#ccc',
            tickStroke: '#ccc',
            strokeWidth: '1',
            yAxisOffset: -5,
        });
    }
    YAxis.prototype.ngOnInit = function () {
        this.update();
    };
    YAxis.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxis.prototype.update = function () {
        this.offset = this.yAxisOffset;
        if (this.yOrient === 'right') {
            this.transform = "translate(" + (this.offset + this.dims.width) + " , 0)";
        }
        else {
            this.transform = "translate(" + this.offset + " , 0)";
        }
        if (this.yAxisTickCount !== undefined) {
            this.tickArguments = [this.yAxisTickCount];
        }
        if (typeof this.yAxisTickInterval !== 'undefined') {
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "tickFormatting", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showGridLines", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "showLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "labelText", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxis.prototype, "yAxisTickInterval", void 0);
    YAxis = __decorate([
        Component({
            selector: 'g[yAxis]',
            template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g yAxisTicks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [height]=\"dims.height\"\n      />\n\n      <svg:g axisLabel\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"80\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YAxis);
    return YAxis;
}());

var YAxisTicks = (function () {
    function YAxisTicks() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        Object.assign(this, {
            innerTickSize: 6,
            outerTickSize: 6,
            tickPadding: 3,
            rotateLabels: false,
            verticalSpacing: 20,
            textAnchor: 'middle',
            trimLabel: trimLabel
        });
    }
    YAxisTicks.prototype.ngOnInit = function () {
        this.update();
    };
    YAxisTicks.prototype.ngOnChanges = function () {
        this.update();
    };
    YAxisTicks.prototype.update = function () {
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
                return d;
            };
        }
        this.adjustedScale = scale.bandwidth ? function (d) {
            return scale(d) + scale.bandwidth() * 0.5;
        } : scale;
        switch (this.orient) {
            case "top":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "bottom":
                this.transform = function (tick) {
                    return "translate(" + this.adjustedScale(tick) + ",0)";
                };
                this.textAnchor = "middle";
                this.y2 = this.innerTickSize * sign;
                this.y1 = this.tickSpacing * sign;
                this.dy = sign < 0 ? "0em" : ".71em";
                break;
            case "left":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "end";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
            case "right":
                this.transform = function (tick) {
                    return "translate(0," + this.adjustedScale(tick) + ")";
                };
                this.textAnchor = "start";
                this.x2 = this.innerTickSize * -sign;
                this.x1 = this.tickSpacing * -sign;
                this.dy = ".32em";
                break;
        }
    };
    YAxisTicks.prototype.getTicks = function () {
        var ticks;
        var maxTicks = this.getMaxTicks();
        if (this.tickValues) {
            ticks = this.tickValues;
        }
        else if (this.scale.ticks) {
            ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            if (ticks.length > maxTicks) {
                if (this.tickArguments) {
                    this.tickArguments[0] = Math.min(this.tickArguments[0], maxTicks);
                }
                else {
                    this.tickArguments = [maxTicks];
                }
                ticks = this.scale.ticks.apply(this.scale, this.tickArguments);
            }
        }
        else {
            ticks = this.scale.domain();
            ticks = reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicks.prototype.getMaxTicks = function () {
        var tickHeight = 20;
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicks.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    YAxisTicks.prototype.gridLineTransform = function () {
        return "translate(0," + this.verticalSpacing + ")";
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "scale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "orient", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickArguments", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickValues", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickStroke", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "tickFormatting", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "showGridLines", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], YAxisTicks.prototype, "height", void 0);
    YAxisTicks = __decorate([
        Component({
            selector: 'g[yAxisTicks]',
            template: "\n    <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n      [attr.transform]=\"transform(tick)\" >\n      <title>{{tickFormat(tick)}}</title>\n      <svg:text\n        stroke-width=\"0.01\"\n        [attr.dy]=\"dy\"\n        [attr.x]=\"x1\"\n        [attr.y]=\"y1\"\n        [attr.text-anchor]=\"textAnchor\"\n\n        [style.font-size]=\"'12px'\">\n        {{trimLabel(tickFormat(tick))}}\n      </svg:text>\n\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal gridline-path-shadow\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\"\n          y1=\"1\"\n          y2=\"1\" />\n      </svg:g>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], YAxisTicks);
    return YAxisTicks;
}());

var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule = __decorate([
        NgModule({
            imports: [BrowserModule],
            declarations: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks],
            exports: [AxisLabel, XAxis, XAxisTicks, YAxis, YAxisTicks]
        }), 
        __metadata('design:paramtypes', [])
    ], AxesModule);
    return AxesModule;
}());

var caretOffset = 6;
function verticalPosition(elDimensions, popoverDimensions, alignment) {
    var result;
    if (alignment === 'top') {
        result = elDimensions.top - caretOffset;
    }
    if (alignment === 'bottom') {
        result = elDimensions.top + elDimensions.height - popoverDimensions.height + caretOffset;
    }
    if (alignment === 'center') {
        result = elDimensions.top + elDimensions.height / 2 - popoverDimensions.height / 2;
    }
    return result;
}
function horizontalPosition(elDimensions, popoverDimensions, alignment) {
    var result;
    if (alignment === 'left') {
        return elDimensions.left - caretOffset;
    }
    if (alignment === 'right') {
        return elDimensions.left + elDimensions.width - popoverDimensions.width + caretOffset;
    }
    if (alignment === 'center') {
        return elDimensions.left + elDimensions.width / 2 - popoverDimensions.width / 2;
    }
    return result;
}
var PositionHelper = (function () {
    function PositionHelper() {
    }
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 - 1 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - 1 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2 - 1;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 - 1 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - 1 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2 - 1;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    PositionHelper.shouldFlip = function (elDimensions, popoverDimensions, placement, alignment, spacing) {
        var flip = false;
        if (placement === 'right') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.width + spacing > window.innerWidth) {
                flip = true;
            }
        }
        if (placement === 'left') {
            var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'top') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition - spacing < 0) {
                flip = true;
            }
        }
        if (placement === 'bottom') {
            var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
            if (popoverPosition + popoverDimensions.height + spacing > window.innerHeight) {
                flip = true;
            }
        }
        return flip;
    };
    return PositionHelper;
}());

var PopoverRegistry = (function () {
    function PopoverRegistry() {
        "ngInject";
        if (PopoverRegistry._instance) {
            throw new Error("Error: Instantiation failed: Use PopoverRegistry.getInstance() instead of new.");
        }
        PopoverRegistry._instance = this;
        this.popovers = {};
        setInterval(this.cleanUp.bind(this), 1000);
    }
    PopoverRegistry.getInstance = function () {
        return PopoverRegistry._instance;
    };
    PopoverRegistry.prototype.add = function (id, object) {
        this.popovers[id] = object;
    };
    PopoverRegistry.prototype.find = function (id) {
        return this.popovers[id];
    };
    PopoverRegistry.prototype.remove = function (id) {
        if (!this.popovers[id]) {
            return;
        }
        if (this.popovers[id].popoverScope) {
            this.popovers[id].popoverScope.$destroy();
        }
        if (this.popovers[id].popover) {
            this.popovers[id].popover.remove();
        }
        delete this.popovers[id];
    };
    PopoverRegistry.prototype.removeGroup = function (group, currentId) {
        var _this = this;
        var ids = Object.keys(this.popovers);
        var _loop_1 = function(id) {
            var popoverOb = this_1.popovers[id];
            if (!popoverOb) {
                return "continue";
            }
            if (id === currentId) {
                return { value: void 0 };
            }
            if (popoverOb.group && popoverOb.group === group) {
                popoverOb.popover.removeClass('sw-popover-animation');
                setTimeout(function () {
                    popoverOb.popover.remove();
                    if (popoverOb.popoverScope) {
                        popoverOb.popoverScope.$destroy();
                    }
                    delete _this.popovers[id];
                }, 50);
            }
        };
        var this_1 = this;
        for (var _i = 0, ids_1 = ids; _i < ids_1.length; _i++) {
            var id = ids_1[_i];
            var state_1 = _loop_1(id);
            if (typeof state_1 === "object") return state_1.value;
        }
    };
    PopoverRegistry.prototype.cleanUp = function () {
        var ids = Object.keys(this.popovers);
        for (var _i = 0, ids_2 = ids; _i < ids_2.length; _i++) {
            var id = ids_2[_i];
            var element = this.popovers[id].element;
            if (element && element[0]) {
                element = element[0];
            }
            if (element && !document.contains(element)) {
                this.remove(id);
            }
        }
    };
    PopoverRegistry._instance = new PopoverRegistry();
    return PopoverRegistry;
}());

var Popover = (function () {
    function Popover(element, renderer) {
        this.popoverPlacement = 'top';
        this.popoverAlignment = 'center';
        this.popoverSpacing = 0;
        this.showCaret = true;
        this.element = element.nativeElement;
        this.renderer = renderer;
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
        }
        this.mouseEnterListener = this.renderer.listen(this.element, 'mouseenter', this.display.bind(this));
        if (this.mouseLeaveListener) {
            this.mouseLeaveListener();
        }
        this.mouseLeaveListener = this.renderer.listen(this.element, 'mouseleave', this.mouseOut.bind(this));
    }
    Popover.prototype.ngOnInit = function () {
        this.popoverRegistry = PopoverRegistry.getInstance();
    };
    Popover.prototype.mouseOut = function () {
        this.exitTimeout = setTimeout(this.remove.bind(this), 200);
    };
    ;
    Popover.prototype.display = function () {
    };
    ;
    Popover.prototype.remove = function () {
        if (this.popover) {
            this.popover.remove();
        }
        this.popoverRegistry.remove(this.popoverId);
        this.popover = undefined;
    };
    ;
    Popover.prototype.checkFlip = function (triggerElement, popover, options) {
        var elDimensions = triggerElement.getBoundingClientRect(), popoverDimensions = popover[0].getBoundingClientRect();
        if (PositionHelper.shouldFlip(elDimensions, popoverDimensions, options.placement, options.alignment, options.spacing)) {
            if (options.placement === 'right') {
                options.placement = 'left';
            }
            else if (options.placement === 'left') {
                options.placement = 'right';
            }
            else if (options.placement === 'top') {
                options.placement = 'bottom';
            }
            else if (options.placement === 'bottom') {
                options.placement = 'top';
            }
        }
    };
    ;
    Popover.prototype.positionPopover = function (triggerElement, popover, options) {
        var elDimensions = triggerElement.getBoundingClientRect(), popoverDimensions = popover[0].getBoundingClientRect(), top, left;
        if (options.placement === 'right') {
            left = elDimensions.left + elDimensions.width + options.spacing;
            top = PositionHelper.calculateVerticalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'left') {
            left = elDimensions.left - popoverDimensions.width - options.spacing;
            top = PositionHelper.calculateVerticalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'top') {
            top = elDimensions.top - popoverDimensions.height - options.spacing;
            left = PositionHelper.calculateHorizontalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        if (options.placement === 'bottom') {
            top = elDimensions.top + elDimensions.height + options.spacing;
            left = PositionHelper.calculateHorizontalAlignment(elDimensions, popoverDimensions, options.alignment);
        }
        popover.css({
            top: top + 'px',
            left: left + 'px'
        });
        if (this.options.showCaret) {
            this.addCaret(this.popover, elDimensions, popoverDimensions);
        }
        this.popover.addClass('sw-popover-animation');
    };
    ;
    Popover.prototype.addCaret = function (popoverEl, elDimensions, popoverDimensions) {
    };
    ;
    Popover.prototype.toBoolean = function (value) {
        if (value && value.length !== 0) {
            var v = ("" + value).toLowerCase();
            value = (v === 'true');
        }
        else {
            value = false;
        }
        return value;
    };
    ;
    Popover.prototype.ngOnDestroy = function () {
        if (this.mouseEnterListener) {
            this.mouseEnterListener();
        }
        if (this.mouseLeaveListener) {
            this.mouseLeaveListener();
        }
        this.remove();
    };
    __decorate([
        ViewChild('parent', { read: ViewContainerRef }), 
        __metadata('design:type', (typeof (_a = typeof ViewContainerRef !== 'undefined' && ViewContainerRef) === 'function' && _a) || Object)
    ], Popover.prototype, "parent", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverText", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverTemplate", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverPlacement", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverAlignment", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverGroup", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "popoverSpacing", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Popover.prototype, "showCaret", void 0);
    Popover = __decorate([
        Directive({
            selector: '[sw-popover]'
        }), 
        __metadata('design:paramtypes', [(typeof (_b = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _b) || Object, (typeof (_c = typeof Renderer !== 'undefined' && Renderer) === 'function' && _c) || Object])
    ], Popover);
    return Popover;
    var _a, _b, _c;
}());

var cache = {};
function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    var id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    if (!cache[id]) {
        cache[id] = true;
        return id;
    }
    return ObjectId();
}
;

var CircleSeries = (function () {
    function CircleSeries() {
        this.type = 'standard';
        this.clickHandler = new EventEmitter();
    }
    CircleSeries.prototype.ngOnInit = function () {
        this.update();
    };
    CircleSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CircleSeries.prototype.update = function () {
        this.circles = this.getCircles();
    };
    CircleSeries.prototype.getCircles = function () {
        var _this = this;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
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
                var gradientIdRect = 'grad' + ObjectId().toString();
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    gradientIdRect: gradientIdRect
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeries.prototype.click = function (value, label) {
        this.clickHandler.emit({
            name: label,
            value: value
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "type", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "strokeColor", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "scaleType", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CircleSeries.prototype, "clickHandler", void 0);
    CircleSeries = __decorate([
        Component({
            selector: 'g[circleSeries]',
            template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <svg:rect\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"color\"\n        class=\"tooltip-bar\"\n        style=\"pointerEvents: 'none'; opacity: 0;\"\n      />\n\n      <svg:g circle\n        [attr.class]=\"className\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"color\"\n        [stroke]=\"strokeColor\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (clickHandler)=\"click($event, circle.label)\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSeries);
    return CircleSeries;
}());

var Circle = (function () {
    function Circle() {
        this.clickHandler = new EventEmitter();
    }
    Circle.prototype.ngOnInit = function () {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    Circle.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cx", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "cy", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "r", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "stroke", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "classNames", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "circleOpacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "pointerEvents", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Circle.prototype, "clickHandler", void 0);
    Circle = __decorate([
        Component({
            selector: 'g[circle]',
            template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Circle);
    return Circle;
}());

var GridPanel = (function () {
    function GridPanel() {
    }
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "path", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "x", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanel.prototype, "y", void 0);
    GridPanel = __decorate([
        Component({
            selector: 'g[gridPanel]',
            template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      [attr.fill]=\"fill\"\n      class=\"gridpanel\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanel);
    return GridPanel;
}());

var GridPanelSeries = (function () {
    function GridPanelSeries() {
    }
    GridPanelSeries.prototype.ngOnInit = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeries.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d, i) {
            var color = 'rgba(255,255,255,0.02)';
            var offset, width, height, x, y;
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = _this.xScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.xScale.range()[0] / 2;
                width = _this.xScale.bandwidth() + 2 * offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = _this.yScale.range().indexOf(position);
                if (positionIndex % 2 === 1) {
                    color = 'rgba(255,255,255,0)';
                }
                offset = _this.yScale.range()[0] / 2;
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + 2 * offset;
                x = 0;
                y = _this.yScale(d.name) - offset;
            }
            return {
                name: d.name,
                color: color,
                offset: offset,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeries.prototype, "orient", void 0);
    GridPanelSeries = __decorate([
        Component({
            selector: 'g[gridPanelSeries]',
            template: "\n    <svg:g gridPanel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [fill]=\"gridPanel.color\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanelSeries);
    return GridPanelSeries;
}());

var SvgLinearGradient = (function () {
    function SvgLinearGradient() {
        this.orientation = 'vertical';
        this.endOpacity = 1;
    }
    SvgLinearGradient.prototype.ngOnInit = function () {
        this.x1 = '0%';
        this.x2 = '0%';
        this.y1 = '0%';
        this.y2 = '0%';
        if (this.orientation === 'horizontal') {
            this.x2 = '100%';
        }
        else if (this.orientation === 'vertical') {
            this.y1 = '100%';
        }
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "orientation", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "name", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "startOpacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradient.prototype, "endOpacity", void 0);
    SvgLinearGradient = __decorate([
        Component({
            selector: 'g[svgLinearGradient]',
            template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop\n        [attr.offset]=\"'0%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        [attr.offset]=\"'100%'\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:linearGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgLinearGradient);
    return SvgLinearGradient;
}());

var SvgRadialGradient = (function () {
    function SvgRadialGradient() {
        this.endOpacity = 1;
    }
    SvgRadialGradient.prototype.ngOnInit = function () {
        this.cx = 0;
        this.cy = 0;
        this.r = "30%";
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "name", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "startOpacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradient.prototype, "endOpacity", void 0);
    SvgRadialGradient = __decorate([
        Component({
            selector: 'g[svgRadialGradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradient-units=\"userSpaceOnUse\">\n      <svg:stop\n        offset=\"0%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        offset=\"100%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:radialGradient>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SvgRadialGradient);
    return SvgRadialGradient;
}());

function throttle(func, wait, options) {
    if (options === void 0) { options = {}; }
    var context, args, result;
    var timeout = null;
    var previous = 0;
    var later = function () {
        previous = options.leading === false ? 0 : new Date();
        timeout = null;
        result = func.apply(context, args);
    };
    return function () {
        var now = new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now.getTime() - previous);
        context = this;
        args = arguments;
        if (remaining <= 0) {
            clearTimeout(timeout);
            timeout = null;
            previous = now;
            result = func.apply(context, args);
        }
        else if (!timeout && options.trailing !== false) {
            timeout = setTimeout(later, remaining);
        }
        return result;
    };
}

var array = require("d3-array");
var brush = require("d3-brush");
var color = require("d3-color");
var format = require("d3-format");
var interpolate = require("d3-interpolate");
var scales = require("d3-scale");
var selection = require("d3-selection");
var shape = require("d3-shape");
var d3 = {
    arc: shape.arc,
    area: shape.area,
    brush: brush.brush,
    brushX: brush.brushX,
    brushY: brush.brushY,
    extent: array.extent,
    format: format.format,
    interpolate: interpolate.interpolate,
    line: shape.line,
    max: array.max,
    min: array.min,
    mouse: selection.mouse,
    pie: shape.pie,
    range: array.range,
    rgb: color.rgb,
    select: selection.select,
    selectAll: selection.selectAll,
    scaleBand: scales.scaleBand,
    scaleLinear: scales.scaleLinear,
    scaleOrdinal: scales.scaleOrdinal,
    scalePoint: scales.scalePoint,
    scaleQuantile: scales.scaleQuantile,
    scaleTime: scales.scaleTime,
    treemap: shape.treemap
};

var Timeline = (function () {
    function Timeline(element) {
        this.margin = [10, 20, 70, 20];
        this.clickHandler = new EventEmitter();
        this.updateXDomain = new EventEmitter();
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnInit = function () {
        this.dims = this.calculateDims();
        var offsetY = this.view[1] - 150;
        var results = this.results;
        results.series[0] = results.series[0].sort(function (a, b) {
            return results.d0Domain.indexOf(a.vals[0].label[0][0]) - results.d0Domain.indexOf(b.vals[0].label[0][0]);
        });
        var yScale = d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(results.m0Domain);
        if (!this.autoScale) {
            yScale.domain([0, results.m0Domain[1]]);
        }
        this.xScale = this.calculateXScale();
        this.transform = "translate(" + this.margin[3] + " , " + (this.margin[0] + offsetY) + ")";
        this.addBrush();
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.state.brush) {
            this.brush = this.state.brush;
        }
        else {
            this.brush = d3.brushX(this.state.xScale)
                .on("brush", throttle(function () {
                var newDomain = _this.brush.empty() ? _this.state.xScale.domain() : _this.brush.extent();
                _this.updateXDomain.emit(newDomain);
            }, 100));
        }
        var height = 150 - this.margin[0] - this.margin[2];
        var width = this.view[0];
        if (this.legend) {
            width = width * 9 / 12.0;
        }
        width = width - this.margin[1] - this.margin[3];
        d3.select(this.element)
            .select('.brush')
            .call(this.brush)
            .selectAll("rect")
            .attr("y", 0)
            .attr("height", height);
        d3.select(this.element)
            .selectAll('.background')
            .attr('width', width);
    };
    Timeline.prototype.calculateXScale = function () {
        var xScale;
        var domain = d3.extent(this.results.d0Domain, function (d) {
            return moment(d).toDate();
        });
        if (this.state.xScale) {
            xScale = this.state.xScale;
        }
        else {
            xScale = d3.scaleTime()
                .range([0, this.dims.width])
                .domain(domain);
        }
        if (xScale.domain() !== domain) {
            xScale.domain(domain);
        }
        return xScale;
    };
    Timeline.prototype.calculateDims = function () {
        var width = this.view[0];
        var height = 150;
        if (this.legend) {
            width = width * 9 / 12.0;
        }
        var dims = {
            width: width - this.margin[1] - this.margin[3],
            height: height - this.margin[0] - this.margin[2]
        };
        return dims;
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "state", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "miniChart", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "autoScale", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "clickHandler", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "updateXDomain", void 0);
    Timeline = __decorate([
        Component({
            selector: 'g[timeline]',
            template: "\n    <svg:g\n      [attr.transform]=\"transform\">\n\n      <svg:g xAxis\n        [xScale]=\"xScale\"\n        [dims]=\"dims\"\n        [showGridLines]=\"showGridLines\"\n      />\n\n      <svg:g class=\"x brush\">\n      </svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], Timeline);
    return Timeline;
    var _a;
}());

var Area = (function () {
    function Area(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    Area.prototype.ngOnInit = function () {
        this.update();
    };
    Area.prototype.ngOnChanges = function () {
        this.update();
    };
    Area.prototype.update = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + ObjectId().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    Area.prototype.loadAnimation = function () {
        var node = d3.select(this.element).select('.area');
        node
            .attr('d', this.startingPath);
        this.animateToCurrentForm();
    };
    Area.prototype.animateToCurrentForm = function () {
        var node = d3.select(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "path", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startingPath", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "opacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startOpacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "endOpacity", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "activeLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Area.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Area.prototype, "clickHandler", void 0);
    Area = __decorate([
        Component({
            selector: 'g[area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n        [endOpacity]=\"endOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [attr.opacity]=\"opacity\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], Area);
    return Area;
    var _a;
}());

var COMPONENTS = [
    Area,
    Chart,
    Legend,
    ScaleLegend,
    Circle,
    Popover,
    CircleSeries,
    GridPanel,
    GridPanelSeries,
    SvgLinearGradient,
    SvgRadialGradient,
    Timeline
];
var CommonModule = (function () {
    function CommonModule() {
    }
    CommonModule = __decorate([
        NgModule({
            imports: [
                BrowserModule,
                AxesModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                BrowserModule,
                AxesModule
            ].concat(COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], CommonModule);
    return CommonModule;
}());

function calculateViewDimensions(view, margins, showXLabel, showYLabel, showLegend, columns) {
    if (columns === void 0) { columns = 12; }
    var width = view[0];
    var height = view[1];
    var xOffset = margins[3];
    if (showLegend) {
        width = width * columns / 12;
    }
    width = width - margins[1] - margins[3];
    height = height - margins[0] - margins[2];
    if (showXLabel) {
        height -= 40;
    }
    if (showYLabel) {
        width -= 60;
        xOffset += 60;
    }
    width = Math.max(0, width);
    height = Math.max(0, height);
    return { width: width, height: height, xOffset: xOffset };
}

var colorSets = [
    {
        'name': 'flame',
        'base': '#590012',
        'group': 'general',
        'domain': ['#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738']
    },
    {
        'name': 'ocean',
        'base': '#0340B9',
        'group': 'general',
        'domain': ['#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1']
    },
    {
        'name': 'forest',
        'base': '#258203',
        'group': 'general',
        'domain': ['#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32']
    },
    {
        'name': 'horizon',
        'base': '#026CCB',
        'group': 'general',
        'domain': ['#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0']
    },
    {
        'name': 'neons',
        'base': '#B20000',
        'group': 'general',
        'domain': ['#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600']
    },
    {
        'name': 'picnic',
        'base': '#A37C00',
        'group': 'general',
        'domain': ['#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8']
    },
    {
        'name': 'night',
        'base': '#48025F',
        'group': 'general',
        'domain': ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
    },
    {
        'name': 'nightLights',
        'base': '#4e31a5',
        'group': 'general',
        'domain': ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
    },
    {
        'name': 'yellowGreen',
        'group': 'gradient',
        'domain': ["#f7fcb9", "#addd8e", "#31a354"]
    },
    {
        'name': 'purpleRed',
        'group': 'gradient',
        'domain': ["#e7e1ef", "#c994c7", "#dd1c77"]
    },
    {
        'name': 'yellowGreenBlue',
        'group': 'gradient',
        'domain': ["#edf8b1", "#7fcdbb", "#2c7fb8"]
    },
];
function generateColorScale(scheme, type, domain) {
    if (typeof (scheme) === 'string') {
        scheme = colorSets.find(function (cs) {
            return cs.name === scheme;
        });
    }
    var colorScale;
    if (type === 'quantile') {
        colorScale = d3.scaleQuantile()
            .range(scheme.domain)
            .domain(domain);
    }
    else if (type === 'ordinal') {
        colorScale = d3.scaleOrdinal()
            .range(scheme.domain)
            .domain(domain);
    }
    else if (type === 'linear') {
        colorScale = d3.scaleLinear()
            .domain(d3.range(0, 1, 1.0 / (scheme.domain.length - 1)))
            .range(scheme.domain);
    }
    return colorScale;
}
function colorHelper(scheme, type, domain, customColors) {
    var colorScale = generateColorScale(scheme, type, domain);
    var colorScaleFunction = function (value) {
        if (type === 'linear') {
            var valueScale = d3.scaleLinear()
                .domain(domain)
                .range([0, 1]);
            return (colorScale(valueScale(value)));
        }
        else {
            var formattedValue_1 = value.toString();
            var found = undefined;
            if (customColors && customColors.length > 0) {
                found = customColors.find(function (mapping) {
                    return mapping.name === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return colorScale(value);
            }
        }
    };
    return colorScaleFunction;
}

var BaseChart = (function () {
    function BaseChart() {
    }
    BaseChart.prototype.update = function () {
        this.results = this.cloneData(this.results);
    };
    BaseChart.prototype.cloneData = function (data) {
        var results = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var copy = {
                name: item['name']
            };
            if (item['value']) {
                copy['value'] = item['value'];
            }
            ;
            if (item['series']) {
                copy['series'] = [];
                for (var _a = 0, _b = item['series']; _a < _b.length; _a++) {
                    var seriesItem = _b[_a];
                    var seriesItemCopy = Object.assign({}, seriesItem);
                    copy['series'].push(seriesItemCopy);
                }
            }
            results.push(copy);
        }
        return results;
    };
    return BaseChart;
}());

var AreaChart = (function (_super) {
    __extends(AreaChart, _super);
    function AreaChart() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.clickHandler = new EventEmitter();
    }
    AreaChart.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + ", " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + ObjectId().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChart.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChart.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    AreaChart.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChart.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChart.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChart.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChart.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChart.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChart.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "state", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "autoScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "timeline", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], AreaChart.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AreaChart.prototype, "clickHandler", void 0);
    AreaChart = __decorate([
        Component({
            selector: 'area-chart',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChart);
    return AreaChart;
}(BaseChart));

var AreaChartNormalized = (function (_super) {
    __extends(AreaChartNormalized, _super);
    function AreaChartNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    AreaChartNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChartNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChartNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        var _loop_1 = function(i) {
            var val = this_1.xDomain[i];
            var d0 = 0;
            var total = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                total += d.value;
            }
            for (var _b = 0, _c = this_1.results; _b < _c.length; _b++) {
                var group = _c[_b];
                var d = group.series.find(function (item) { return item.name === val; });
                d.d0 = d0;
                d.d1 = d0 + d.value;
                d0 += d.value;
                if (total > 0) {
                    d.d0 = (d.d0 * 100) / total;
                    d.d1 = (d.d1 * 100) / total;
                }
                else {
                    d.d0 = 0;
                    d.d1 = 0;
                }
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_1(i);
        }
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + ObjectId().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
    };
    AreaChartNormalized.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChartNormalized.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalized.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalized.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChartNormalized.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChartNormalized.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartNormalized.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartNormalized.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChartNormalized.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "timeline", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AreaChartNormalized.prototype, "clickHandler", void 0);
    AreaChartNormalized = __decorate([
        Component({
            selector: 'area-chart-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              chartType=\"area\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartNormalized);
    return AreaChartNormalized;
}(BaseChart));

var AreaChartStacked = (function (_super) {
    __extends(AreaChartStacked, _super);
    function AreaChartStacked(element) {
        _super.call(this);
        this.margin = [10, 20, 70, 70];
        this.legend = false;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    AreaChartStacked.prototype.ngOnInit = function () {
        this.update();
    };
    AreaChartStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaChartStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        var _loop_1 = function(i) {
            var val = this_1.xDomain[i];
            var d0 = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                d.d0 = d0;
                d.d1 = d0 + d.value;
                d0 += d.value;
            }
        };
        var this_1 = this;
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_1(i);
        }
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        this.clipPathId = 'clip' + ObjectId().toString();
        this.clipPath = "url(" + pageUrl + "#" + this.clipPathId + ")";
        this.addTooltip();
    };
    AreaChartStacked.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    AreaChartStacked.prototype.getYDomain = function () {
        var domain = [];
        var _loop_2 = function(i) {
            var val = this_2.xDomain[i];
            var sum = 0;
            for (var _i = 0, _a = this_2.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) { return item.name === val; });
                sum += d.value;
            }
            domain.push(sum);
        };
        var this_2 = this;
        for (var i = 0; i < this.xDomain.length; i++) {
            _loop_2(i);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    AreaChartStacked.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartStacked.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    AreaChartStacked.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    AreaChartStacked.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    AreaChartStacked.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartStacked.prototype.addTooltip = function () {
    };
    AreaChartStacked.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    AreaChartStacked.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "timeline", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AreaChartStacked.prototype, "clickHandler", void 0);
    AreaChartStacked = __decorate([
        Component({
            selector: 'area-chart-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"area chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g areaSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              stacked=\"true\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], AreaChartStacked);
    return AreaChartStacked;
    var _a;
}(BaseChart));

var AreaSeries = (function () {
    function AreaSeries() {
        this.stacked = false;
        this.normalized = false;
        this.clickHandler = new EventEmitter();
    }
    AreaSeries.prototype.ngOnInit = function () {
        this.update();
    };
    AreaSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    AreaSeries.prototype.update = function () {
        var _this = this;
        var area;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            if (_this.scaleType === 'time') {
                return _this.xScale(moment(label).toDate());
            }
            else {
                return _this.xScale(label);
            }
        };
        if (this.stacked || this.normalized) {
            area = d3.area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = d3.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            area = d3.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = d3.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        this.opacity = 1;
        this.path = area(this.data.series);
        this.startingPath = startingArea(this.data.series);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "scaleType", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "stacked", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "normalized", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AreaSeries.prototype, "clickHandler", void 0);
    AreaSeries = __decorate([
        Component({
            selector: 'g[areaSeries]',
            template: "\n    <svg:g area\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"color\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AreaSeries);
    return AreaSeries;
}());

var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                AreaChart,
                AreaChartNormalized,
                AreaChartStacked,
                AreaSeries
            ],
            exports: [
                AreaChart,
                AreaChartNormalized,
                AreaChartStacked,
                AreaSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartModule);
    return AreaChartModule;
}());

var Bar = (function () {
    function Bar(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    Bar.prototype.ngOnInit = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + ObjectId().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.startOpacity = this.getStartOpacity();
        this.loadAnimation();
    };
    Bar.prototype.ngOnChanges = function () {
        this.update();
    };
    Bar.prototype.update = function () {
        this.animateToCurrentForm();
    };
    Bar.prototype.loadAnimation = function () {
        var node = d3.select(this.element).select('.bar');
        var startingPath = this.getStartingPath();
        node.attr('d', startingPath);
        this.animateToCurrentForm();
    };
    Bar.prototype.animateToCurrentForm = function () {
        var node = d3.select(this.element).select('.bar');
        this.path = this.getPath();
        node.transition().duration(750)
            .attr('d', this.path);
    };
    Bar.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, true, false, true);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, false, false, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, false, false, false);
            }
        }
        return path;
    };
    Bar.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    Bar.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > radius && this.width > radius) {
            radius = 5;
        }
        return radius;
    };
    Bar.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0;
        }
        else {
            return 0.5;
        }
    };
    Bar.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
        var retval;
        retval = "M" + (x + r) + "," + y;
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
        }
        else {
            retval += "h" + r;
            retval += "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
        }
        else {
            retval += "v" + r;
            retval += "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
        }
        else {
            retval += "h" + -r;
            retval += "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
        }
        else {
            retval += "v" + -r;
            retval += "h" + r;
        }
        retval += "z";
        return retval;
    };
    Bar.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "x", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "y", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "orientation", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "roundEdges", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "gradient", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "offset", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "clickHandler", void 0);
    Bar = __decorate([
        Component({
            selector: 'g[bar]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.cursor]=\"'pointer'\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], Bar);
    return Bar;
    var _a;
}());

function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            return moment$1(label).format("MM/DD/YYYY");
        }
        return label.toString();
    };
}

var BarHorizontal = (function (_super) {
    __extends(BarHorizontal, _super);
    function BarHorizontal() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarHorizontal.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontal.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        return d3.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
    };
    BarHorizontal.prototype.getYScale = function () {
        var spacing = 0.2;
        this.yDomain = this.getYDomain();
        return d3.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontal.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarHorizontal.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarHorizontal.prototype.yAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarHorizontal.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarHorizontal.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.yDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarHorizontal.prototype, "clickHandler", void 0);
    BarHorizontal = __decorate([
        Component({
            selector: 'bar-horizontal',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"yDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"yAxisTickFormatting()\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesHorizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontal);
    return BarHorizontal;
}(BaseChart));

var BarHorizontal2D = (function (_super) {
    __extends(BarHorizontal2D, _super);
    function BarHorizontal2D() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarHorizontal2D.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontal2D.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontal2D.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontal2D.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontal2D.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2D.prototype.getValueScale = function () {
        return d3.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
    };
    BarHorizontal2D.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontal2D.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontal2D.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontal2D.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.name) + ")";
    };
    BarHorizontal2D.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontal2D.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal2D.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarHorizontal2D.prototype, "clickHandler", void 0);
    BarHorizontal2D = __decorate([
        Component({
            selector: 'bar-horizontal-2d',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g gridPanelSeries\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\">\n        </svg:g>\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            [xScale]=\"valueScale\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontal2D);
    return BarHorizontal2D;
}(BaseChart));

var BarHorizontalNormalized = (function (_super) {
    __extends(BarHorizontalNormalized, _super);
    function BarHorizontalNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarHorizontalNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontalNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontalNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalNormalized.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalNormalized.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontalNormalized.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarHorizontalNormalized.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalNormalized.prototype.getXScale = function () {
        return d3.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalNormalized.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalNormalized.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontalNormalized.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalNormalized.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalized.prototype, "clickHandler", void 0);
    BarHorizontalNormalized = __decorate([
        Component({
            selector: 'bar-horizontal-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalNormalized);
    return BarHorizontalNormalized;
}(BaseChart));

var BarHorizontalStacked = (function (_super) {
    __extends(BarHorizontalStacked, _super);
    function BarHorizontalStacked() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarHorizontalStacked.prototype.ngOnInit = function () {
        this.update();
    };
    BarHorizontalStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    BarHorizontalStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarHorizontalStacked.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStacked.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarHorizontalStacked.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarHorizontalStacked.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStacked.prototype.getXScale = function () {
        return d3.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalStacked.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStacked.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarHorizontalStacked.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalStacked.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarHorizontalStacked.prototype, "clickHandler", void 0);
    BarHorizontalStacked = __decorate([
        Component({
            selector: 'bar-horizontal-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesHorizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalStacked);
    return BarHorizontalStacked;
}(BaseChart));

var BarVertical = (function (_super) {
    __extends(BarVertical, _super);
    function BarVertical() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarVertical.prototype.ngOnInit = function () {
        this.update();
    };
    BarVertical.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVertical.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical.prototype.getXScale = function () {
        var spacing = 0.2;
        this.xDomain = this.getXDomain();
        return d3.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVertical.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    BarVertical.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVertical.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVertical.prototype.xAxisTickFormatting = function () {
        var tickFormatting;
        if (this.results.query && this.results.query.dimensions.length) {
            tickFormatting = tickFormat(this.results.query.dimensions[0].field.fieldType, this.results.query.dimensions[0].groupByType.value);
        }
        return tickFormatting;
    };
    BarVertical.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    BarVertical.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.xDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarVertical.prototype, "clickHandler", void 0);
    BarVertical = __decorate([
        Component({
            selector: 'bar-vertical',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"xDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [tickFormatting]=\"xAxisTickFormatting()\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\">\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical);
    return BarVertical;
}(BaseChart));

var BarVertical2D = (function (_super) {
    __extends(BarVertical2D, _super);
    function BarVertical2D() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.scaleType = 'ordinal';
        this.clickHandler = new EventEmitter();
    }
    BarVertical2D.prototype.ngOnInit = function () {
        this.update();
    };
    BarVertical2D.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVertical2D.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valuesDomain = this.getValueDomain();
        this.groupScale = this.getGroupScale();
        this.innerScale = this.getInnerScale();
        this.valueScale = this.getValueScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVertical2D.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVertical2D.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2D.prototype.getValueScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
    };
    BarVertical2D.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVertical2D.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVertical2D.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVertical2D.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.name) + ", 0)";
    };
    BarVertical2D.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVertical2D.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "scaleType", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical2D.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarVertical2D.prototype, "clickHandler", void 0);
    BarVertical2D = __decorate([
        Component({
            selector: 'bar-vertical-2d',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g gridPanelSeries\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\">\n        </svg:g>\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            [xScale]=\"innerScale\"\n            [yScale]=\"valueScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical2D);
    return BarVertical2D;
}(BaseChart));

var BarVerticalNormalized = (function (_super) {
    __extends(BarVerticalNormalized, _super);
    function BarVerticalNormalized() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarVerticalNormalized.prototype.ngOnInit = function () {
        this.update();
    };
    BarVerticalNormalized.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVerticalNormalized.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalNormalized.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalNormalized.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVerticalNormalized.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarVerticalNormalized.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalNormalized.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalNormalized.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalNormalized.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVerticalNormalized.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalNormalized.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalized.prototype, "clickHandler", void 0);
    BarVerticalNormalized = __decorate([
        Component({
            selector: 'bar-vertical-normalized',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalNormalized);
    return BarVerticalNormalized;
}(BaseChart));

var BarVerticalStacked = (function (_super) {
    __extends(BarVerticalStacked, _super);
    function BarVerticalStacked() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    BarVerticalStacked.prototype.ngOnInit = function () {
        this.update();
    };
    BarVerticalStacked.prototype.ngOnChanges = function () {
        this.update();
    };
    BarVerticalStacked.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.groupDomain = this.getGroupDomain();
        this.innerDomain = this.getInnerDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    BarVerticalStacked.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalStacked.prototype.getInnerDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    BarVerticalStacked.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            var sum = 0;
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                sum += d.value;
            }
            domain.push(sum);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    BarVerticalStacked.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStacked.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalStacked.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalStacked.prototype.click = function (data, group) {
        data.series = group.name;
        this.clickHandler.emit(data);
    };
    BarVerticalStacked.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.innerDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalStacked.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], BarVerticalStacked.prototype, "clickHandler", void 0);
    BarVerticalStacked = __decorate([
        Component({
            selector: 'bar-vertical-stacked',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"innerDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          showGridLines=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g\n          *ngFor=\"let group of results\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g seriesVertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event, group)\"\n          />\n        </svg:g>\n\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalStacked);
    return BarVerticalStacked;
}(BaseChart));

var DateBar = (function (_super) {
    __extends(DateBar, _super);
    function DateBar() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.legend = false;
        this.clickHandler = new EventEmitter();
    }
    DateBar.prototype.ngOnInit = function () {
        var groupSpacing = 0.2;
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        this.yScale = d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain([0, this.results.m0Domain[1]]);
        this.xScale = d3.scaleBand()
            .rangeRound([0, this.dims.width], groupSpacing)
            .domain(this.results.d0Domain);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    DateBar.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    DateBar.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
    };
    DateBar.prototype.update = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], DateBar.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], DateBar.prototype, "clickHandler", void 0);
    DateBar = __decorate([
        Component({
            selector: 'date-bar',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"results.series[0]\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          [xAxisTickInterval]=\"{unit: 'hour', interval: 2}\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g seriesVertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          scaleType=\"time\"\n          [colors]=\"colors\"\n          [series]=\"results.series[0]\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], DateBar);
    return DateBar;
}(BaseChart));

var SeriesHorizontal = (function () {
    function SeriesHorizontal() {
        this.type = 'standard';
        this.clickHandler = new EventEmitter();
    }
    SeriesHorizontal.prototype.ngOnInit = function () {
        this.update();
    };
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _this = this;
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; });
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                color: _this.colors(label),
                roundEdges: roundEdges,
                data: d,
                tooltipText: label + ": " + value
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = _this.xScale(value);
                bar.x = 0;
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
            }
            return bar;
        });
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "type", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "series", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SeriesHorizontal.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "clickHandler", void 0);
    SeriesHorizontal = __decorate([
        Component({
            selector: 'g[seriesHorizontal]',
            template: "\n    <svg:g bar *ngFor=\"let bar of bars\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (clickHandler)=\"click($event)\"\n      [gradient]=\"gradient\"\n\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"bar.tooltipText\"\n      [popoverGroup]=\"'charts'\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesHorizontal);
    return SeriesHorizontal;
}());

var SeriesVertical = (function () {
    function SeriesVertical() {
        this.type = 'standard';
        this.scaleType = 'ordinal';
        this.clickHandler = new EventEmitter();
    }
    SeriesVertical.prototype.ngOnInit = function () {
        this.update();
    };
    SeriesVertical.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVertical.prototype.update = function () {
        var _this = this;
        var width;
        if (this.series.length) {
            if (this.scaleType === 'time') {
                var count = this.series.array[0].vals[0].label[0].length;
                var firstDate = this.series.array[0].vals[0].label[0][count - 1];
                var secondDate = moment$1(firstDate).add(1, 'hours');
                width = Math.abs(this.xScale(secondDate) - this.xScale(firstDate)) * 0.8;
            }
            else {
                width = this.xScale.bandwidth();
            }
        }
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; });
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                color: _this.colors(label),
                roundEdges: roundEdges,
                data: d,
                width: width,
                tooltipText: label + ": " + value,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = _this.dims.height - _this.yScale(value);
                bar.x = _this.xScale(label);
                bar.y = _this.yScale(value);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
            }
            else if (_this.type === 'normalized') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                if (total > 0) {
                    offset0 = (offset0 * 100) / total;
                    offset1 = (offset1 * 100) / total;
                }
                else {
                    offset0 = 0;
                    offset1 = 0;
                }
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
            }
            return bar;
        });
    };
    SeriesVertical.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "type", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "series", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "scaleType", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], SeriesVertical.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "clickHandler", void 0);
    SeriesVertical = __decorate([
        Component({
            selector: 'g[seriesVertical]',
            template: "\n    <svg:g bar *ngFor=\"let bar of bars\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (clickHandler)=\"click($event)\"\n      [gradient]=\"gradient\"\n\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"bar.tooltipText\"\n      [popoverGroup]=\"'charts'\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesVertical);
    return SeriesVertical;
}());

var BarChartModule = (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                Bar,
                BarHorizontal,
                BarHorizontal2D,
                BarHorizontalNormalized,
                BarHorizontalStacked,
                BarVertical,
                BarVertical2D,
                BarVerticalNormalized,
                BarVerticalStacked,
                DateBar,
                SeriesHorizontal,
                SeriesVertical
            ],
            exports: [
                Bar,
                BarHorizontal,
                BarHorizontal2D,
                BarHorizontalNormalized,
                BarHorizontalStacked,
                BarVertical,
                BarVertical2D,
                BarVerticalNormalized,
                BarVerticalStacked,
                DateBar,
                SeriesHorizontal,
                SeriesVertical
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartModule);
    return BarChartModule;
}());

var HeatMapCell = (function () {
    function HeatMapCell(element) {
        this.gradient = false;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCell.prototype.ngOnInit = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = window.location.href;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + ObjectId().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    HeatMapCell.prototype.loadAnimation = function () {
        var node = d3.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCell.prototype.animateToCurrentForm = function () {
        var node = d3.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCell.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "x", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "y", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], HeatMapCell.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "clickHandler", void 0);
    HeatMapCell = __decorate([
        Component({
            selector: 'g[heatMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </defs>\n\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"click()\"\n      />\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], HeatMapCell);
    return HeatMapCell;
    var _a;
}());

var HeatCellSeries = (function () {
    function HeatCellSeries() {
        this.clickHandler = new EventEmitter();
    }
    HeatCellSeries.prototype.ngOnInit = function () {
        this.update();
    };
    HeatCellSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatCellSeries.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeries.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                var label = cell.name;
                cells.push({
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors(value),
                    data: value,
                    label: label,
                    series: row.name,
                    tooltipText: label + ": " + value
                });
            });
        });
        return cells;
    };
    HeatCellSeries.prototype.click = function (value, label, series) {
        this.clickHandler.emit({
            name: label,
            value: value,
            series: series
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], HeatCellSeries.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], HeatCellSeries.prototype, "clickHandler", void 0);
    HeatCellSeries = __decorate([
        Component({
            selector: 'g[heatMapCellSeries]',
            template: "\n    <svg:g heatMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event, c.label, c.series)\"\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"c.tooltipText\"\n      [popoverGroup]=\"'charts'\"\n      [gradient]=\"gradient\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeatCellSeries);
    return HeatCellSeries;
}());

var HeatMap = (function (_super) {
    __extends(HeatMap, _super);
    function HeatMap() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 100];
        this.clickHandler = new EventEmitter();
    }
    HeatMap.prototype.ngOnInit = function () {
        this.update();
    };
    HeatMap.prototype.ngOnChanges = function () {
        this.update();
    };
    HeatMap.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 11);
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.valueDomain = this.getValueDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        this.rects = this.getRects();
    };
    HeatMap.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMap.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.name)) {
                    domain.push(d.name);
                }
            }
        }
        return domain;
    };
    HeatMap.prototype.getValueDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            for (var _b = 0, _c = group.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    HeatMap.prototype.getXScale = function () {
        return d3.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(0.1)
            .domain(this.xDomain);
    };
    HeatMap.prototype.getYScale = function () {
        return d3.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(0.1)
            .domain(this.yDomain);
    };
    HeatMap.prototype.getRects = function () {
        var _this = this;
        var rects = [];
        this.xDomain.map(function (xVal) {
            _this.yDomain.map(function (yVal) {
                rects.push({
                    x: _this.xScale(xVal),
                    y: _this.yScale(yVal),
                    rx: 3,
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: 'rgba(200,200,200,0.03)'
                });
            });
        });
        return rects;
    };
    HeatMap.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    HeatMap.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'linear', this.valueDomain);
        this.colorScale = generateColorScale(this.scheme, 'linear', this.valueDomain);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], HeatMap.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], HeatMap.prototype, "clickHandler", void 0);
    HeatMap = __decorate([
        Component({
            selector: 'heat-map',
            template: "\n    <chart\n      [legend]=\"false\"\n      [legendData]=\"colorScale\"\n      [data]=\"results.m0Domain\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"numbercard\">\n\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n\n        <svg:g heatMapCellSeries\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMap);
    return HeatMap;
}(BaseChart));

var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                HeatMapCell,
                HeatCellSeries,
                HeatMap
            ],
            exports: [
                HeatMapCell,
                HeatCellSeries,
                HeatMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMapModule);
    return HeatMapModule;
}());

var Line = (function () {
    function Line() {
        this.clickHandler = new EventEmitter();
    }
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "path", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "stroke", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "data", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Line.prototype, "clickHandler", void 0);
    Line = __decorate([
        Component({
            selector: 'g[line]',
            template: "\n    <svg:path\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n      style=\"strokeDasharray: 2000; strokeDashoffset: 0\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Line);
    return Line;
}());

var LineChart = (function (_super) {
    __extends(LineChart, _super);
    function LineChart() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 70, 70];
        this.clickHandler = new EventEmitter();
    }
    LineChart.prototype.ngOnInit = function () {
        this.update();
    };
    LineChart.prototype.ngOnChanges = function () {
        this.update();
    };
    LineChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, this.showXAxisLabel, this.showYAxisLabel, this.legend, 9);
        if (this.timeline) {
            this.dims.height -= 150;
        }
        this.xDomain = this.getXDomain();
        this.yDomain = this.getYDomain();
        this.seriesDomain = this.getSeriesDomain();
        this.xScale = this.getXScale();
        this.yScale = this.getYScale();
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
        var pageUrl = window.location.href;
        var clipPathId = 'clip' + ObjectId().toString();
        this.clipPath = "url(" + pageUrl + "#" + clipPathId + ")";
    };
    LineChart.prototype.getXDomain = function () {
        var values = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!values.includes(d.name)) {
                    values.push(d.name);
                }
            }
        }
        this.scaleType = this.getScaleType(values);
        var domain = [];
        if (this.scaleType === 'time') {
            values = values.map(function (v) { return moment$1__default(v).toDate(); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else if (this.scaleType === 'linear') {
            values = values.map(function (v) { return Number(v); });
            var min = Math.min.apply(Math, values);
            var max = Math.max.apply(Math, values);
            domain = [min, max];
        }
        else {
            domain = values;
        }
        return domain;
    };
    LineChart.prototype.getYDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var results = _a[_i];
            for (var _b = 0, _c = results.series; _b < _c.length; _b++) {
                var d = _c[_b];
                if (!domain.includes(d.value)) {
                    domain.push(d.value);
                }
            }
        }
        var min = Math.min.apply(Math, domain);
        var max = Math.max.apply(Math, domain);
        if (!this.autoScale) {
            min = Math.min(0, min);
        }
        return [min, max];
    };
    LineChart.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChart.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    LineChart.prototype.getYScale = function () {
        return d3.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    LineChart.prototype.getScaleType = function (values) {
        var date = true;
        var number = true;
        for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
            var value = values_1[_i];
            if (!this.isDate(value)) {
                date = false;
            }
            if (typeof value !== 'number') {
                number = false;
            }
        }
        if (date) {
            return 'time';
        }
        if (number) {
            return 'linear';
        }
        return 'ordinal';
    };
    LineChart.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    LineChart.prototype.click = function (data, series) {
        data.series = series.name;
        this.clickHandler.emit(data);
    };
    LineChart.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "xAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "yAxis", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "showXAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "showYAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "xAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "yAxisLabel", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "autoScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "timeline", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], LineChart.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], LineChart.prototype, "clickHandler", void 0);
    LineChart = __decorate([
        Component({
            selector: 'line-chart',
            template: "\n    <chart\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n\n      <svg:defs>\n        <svg:clipPath id=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            transform=\"translate(-5, -5)\"/>\n        </svg:clipPath>\n      </svg:defs>\n\n      <svg:g [attr.transform]=\"transform\" class=\"line chart\">\n        <svg:g xAxis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\">\n        </svg:g>\n\n        <svg:g yAxis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"true\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\">\n        </svg:g>\n\n        <svg:g [attr.clip-path]=\"clipPath\">\n        <!--\n          <svg:g area\n            *ngIf=\"gradient\"\n            [fill]=\"colors('Line')\"\n            [path]=\"areaPath\"\n            [startingPath]=\"areaPath\"\n            [data]=\"series\"\n            startOpacity=\"0\"\n            endOpacity=\"0.2\"\n            [gradient]=\"gradient\"\n          />\n          -->\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g lineSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n            />\n          </svg:g>\n\n          <svg:rect\n            class=\"tooltip-area\"\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            x=\"-5\"\n            y=\"-5\"\n            style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n          />\n\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g circleSeries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [color]=\"colors(series.name)\"\n              [strokeColor]=\"colors(series.name)\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              (clickHandler)=\"click($event, series)\"\n            />\n          </svg:g>\n\n        </svg:g>\n      </svg:g>\n\n      <svg:g timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [results]=\"results\"\n        [view]=\"view\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\">\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LineChart);
    return LineChart;
}(BaseChart));

var LineSeries = (function () {
    function LineSeries() {
    }
    LineSeries.prototype.ngOnInit = function () {
        this.update();
    };
    LineSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    LineSeries.prototype.update = function () {
        var _this = this;
        var line = d3.line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(moment$1__default(label).toDate());
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); });
        var data = this.data.series;
        this.path = line(data) || '';
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "xScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "yScale", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], LineSeries.prototype, "scaleType", void 0);
    LineSeries = __decorate([
        Component({
            selector: 'g[lineSeries]',
            template: "\n    <svg:g line\n      [data]=\"data\"\n      [path]=\"path\"\n      [stroke]=\"color\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], LineSeries);
    return LineSeries;
}());

var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                Line,
                LineChart,
                LineSeries
            ],
            exports: [
                Line,
                LineChart,
                LineSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartModule);
    return LineChartModule;
}());

var Card = (function () {
    function Card(element) {
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    Card.prototype.ngOnInit = function () {
        this.update();
    };
    Card.prototype.update = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.label = this.data.name;
        this.trimmedLabel = trimLabel(this.label, 55);
        this.value = d3.format(",.0f")(this.data.value);
        this.cardWidth = Math.max(0, this.width - 5);
        this.cardHeight = Math.max(0, this.height - 5);
        this.textWidth = Math.max(0, this.width - 15);
        this.loadAnimation();
    };
    Card.prototype.loadAnimation = function () {
        this.animateToCurrentForm();
    };
    Card.prototype.animateToCurrentForm = function () {
        var options = {
            useEasing: true,
            useGrouping: true,
            separator: ',',
            decimal: '.',
            prefix: '',
            suffix: ''
        };
        var endValue = this.data.value;
        if (this.data.valueType === 'currency') {
            options.prefix = '$';
        }
        else if (this.data.valueType === 'duration') {
            if (endValue < 60) {
                options.suffix = ' sec';
            }
            else if (endValue < 3600) {
                endValue = endValue / 60;
                options.suffix = ' min';
            }
            else {
                endValue = endValue / 3600;
                options.suffix = ' hours';
            }
        }
    };
    Card.prototype.click = function () {
        this.clickHandler.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "x", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "y", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], Card.prototype, "data", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], Card.prototype, "clickHandler", void 0);
    Card = __decorate([
        Component({
            selector: 'g[card]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\"\n      (click)=\"click()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [style.opacity]=\"0.3\"\n        style=\"cursor: pointer; stroke-width: 2px; stroke: #192024;\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        x=\"5\"\n        [attr.y]=\"height * 0.7\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"height * 0.3\"\n        style=\"fill: #fff; font-size: 12px; pointer-events: none; text-transform: uppercase; overflow: hidden; text-align: center;\">\n        <xhtml:p>\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n\n      <svg:text\n        [attr.x]=\"width / 2\"\n        [attr.y]=\"height * 0.30\"\n        dy='.35em'\n        class=\"value-text\"\n        [style.fill]=\"color\"\n        text-anchor=\"middle\"\n        style=\"font-size: 46px; pointer-events: none;\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], Card);
    return Card;
    var _a;
}());

var CardSeries = (function () {
    function CardSeries() {
        this.clickHandler = new EventEmitter();
    }
    CardSeries.prototype.ngOnInit = function () {
        this.update();
    };
    CardSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    CardSeries.prototype.update = function () {
        this.cards = this.getCards();
    };
    CardSeries.prototype.getCards = function () {
        var _this = this;
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            var value = d.data.value;
            return {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                color: _this.colors(label),
                label: d.data.label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "colors", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], CardSeries.prototype, "clickHandler", void 0);
    CardSeries = __decorate([
        Component({
            selector: 'g[cardSeries]',
            template: "\n    <svg:g card *ngFor=\"let c of cards\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (clickHandler)=\"click($event)\"\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"c.tooltipText\"\n      [popoverGroup]=\"'charts'\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], CardSeries);
    return CardSeries;
}());

function gridLayout(dims, data, minWidth) {
    var rows = 1;
    var xScale = d3.scaleBand();
    var yScale = d3.scaleBand();
    var dataLength = data.length;
    var width = dims.width;
    var height = dims.height;
    if (width > minWidth) {
        while (width / dataLength < minWidth) {
            rows += 1;
            dataLength = Math.ceil(data.length / rows);
        }
    }
    var columns = dataLength;
    var xDomain = [];
    var yDomain = [];
    for (var i = 0; i < rows; i++) {
        yDomain.push(i);
    }
    for (var i = 0; i < columns; i++) {
        xDomain.push(i);
    }
    xScale.domain(xDomain);
    yScale.domain(yDomain);
    xScale.rangeRound([0, width], 0.1);
    yScale.rangeRound([0, height], 0.1);
    var res = [];
    var total = getTotal(data);
    var cardWidth = xScale.bandwidth();
    var cardHeight = yScale.bandwidth();
    for (var i = 0; i < data.length; i++) {
        res[i] = {};
        res[i].data = {
            name: data[i].name,
            value: data[i].value
        };
        res[i].x = xScale(i % columns);
        res[i].y = yScale(Math.floor(i / columns));
        res[i].width = cardWidth;
        res[i].height = cardHeight;
        res[i].data.percent = res[i].data.value / total;
        res[i].data.total = total;
    }
    return res;
}
function getTotal(results) {
    return results
        .map(function (d) { return d.value; })
        .reduce(function (sum, val) { return sum + val; });
}

var NumberCard = (function (_super) {
    __extends(NumberCard, _super);
    function NumberCard() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new EventEmitter();
    }
    NumberCard.prototype.ngOnInit = function () {
        this.update();
    };
    NumberCard.prototype.ngOnChanges = function () {
        this.update();
    };
    NumberCard.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, 150);
        this.setColors();
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    NumberCard.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCard.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    NumberCard.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "customColors", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], NumberCard.prototype, "clickHandler", void 0);
    NumberCard = __decorate([
        Component({
            selector: 'number-card',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"numbercard\">\n        <svg:g cardSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCard);
    return NumberCard;
}(BaseChart));

var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                Card,
                CardSeries,
                NumberCard
            ],
            exports: [
                Card,
                CardSeries,
                NumberCard
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCardModule);
    return NumberCardModule;
}());

var AdvancedPieChart = (function (_super) {
    __extends(AdvancedPieChart, _super);
    function AdvancedPieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new EventEmitter();
    }
    AdvancedPieChart.prototype.ngOnInit = function () {
        this.update();
    };
    AdvancedPieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    AdvancedPieChart.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions([this.view[0] * 4 / 12.0, this.view[1]], this.margin, false, false, false);
        this.domain = this.getDomain();
        this.setColors();
        var xOffset = this.margin[3] + this.dims.width / 2;
        var yOffset = this.margin[0] + this.dims.height / 2;
        this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
        this.innerRadius = this.outerRadius * 0.75;
        this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        this.total = this.getTotal();
        this.roundedTotal = Math.round(this.total);
        this.totalLabel = 'total';
        this.legendItems = this.getLegendItems();
    };
    AdvancedPieChart.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    AdvancedPieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChart.prototype.getLegendItems = function () {
        var _this = this;
        return this.results.map(function (d, index) {
            var label = d.name;
            var value = d.value;
            var percentage = Math.round(value / _this.total * 100);
            return {
                value: Math.round(value),
                label: trimLabel(label, 20),
                percentage: percentage
            };
        });
    };
    AdvancedPieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    AdvancedPieChart.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], AdvancedPieChart.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], AdvancedPieChart.prototype, "clickHandler", void 0);
    AdvancedPieChart = __decorate([
        Component({
            selector: 'advanced-pie-chart',
            template: "\n    <div class=\"advanced-pie\"\n      [style.width]=\"dims.width\"\n      [style.height]=\"view[1]\">\n\n      <chart\n        [colors]=\"colors\"\n        [view]=\"[dims.width, dims.height]\">\n\n        <svg:g\n          [attr.transform]=\"transform\"\n          class=\"pie chart\">\n          <svg:g pieSeries\n            [colors]=\"colors\"\n            [showLabels]=\"labels\"\n            [series]=\"results\"\n            [innerRadius]=\"innerRadius\"\n            [outerRadius]=\"outerRadius\"\n            [gradient]=\"gradient\"\n            (clickHandler)=\"click($event)\">\n          </svg:g>\n        </svg:g>\n      </chart>\n    </div>\n\n    <div [style.width]=\"view[0] - dims.width\">\n      <div class=\"advanced-pie-legend\"\n        [style.margin-top]=\"(view[1] - 215)/2\">\n\n        <div class=\"total-value\">\n          {{roundedTotal}}\n        </div>\n        <div class=\"total-label\">\n          {{totalLabel}}\n        </div>\n\n        <div class=\"legend-items-container\">\n          <div class=\"legend-items\">\n            <div *ngFor=\"let legendItem of legendItems\" class=\"legend-item\">\n              <div class=\"item-color\"\n                [style.background]=\"colors(legendItem.label)\">\n              </div>\n              <div class=\"item-value\">{{legendItem.value}}</div>\n              <div class=\"item-label\">{{legendItem.label}}</div>\n              <div class=\"item-percent\">{{legendItem.percentage}}%</div>\n            </div>\n          </div>\n        </div>\n\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], AdvancedPieChart);
    return AdvancedPieChart;
}(BaseChart));

var PieLabel = (function () {
    function PieLabel(element) {
        this.element = element.nativeElement;
        this.trimLabel = trimLabel;
    }
    PieLabel.prototype.ngOnInit = function () {
        this.update();
    };
    PieLabel.prototype.ngOnChanges = function () {
        this.update();
    };
    PieLabel.prototype.update = function () {
        var factor = 1.5;
        var outerArc = d3.arc()
            .innerRadius(this.radius * factor)
            .outerRadius(this.radius * factor);
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = d3.arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        this.labelXY = outerArc.centroid(this.data);
        this.labelXY[0] = this.radius * factor * (this.midAngle(this.data) < Math.PI ? 1 : -1);
        this.labelXY[1] = this.data.pos[1];
        this.line = "M" + innerArc.centroid(this.data) + "L" + outerArc.centroid(this.data) + "L" + this.labelXY;
        this.transform = "translate(" + this.labelXY + ")";
        this.loadAnimation();
    };
    PieLabel.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? "start" : "end";
    };
    PieLabel.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieLabel.prototype.loadAnimation = function () {
        var label = d3.select(this.element).select('.label');
        var line = d3.select(this.element).select('.line');
        label
            .attr('opacity', 0)
            .transition().delay(750).duration(750)
            .attr('opacity', 1);
        line
            .style('stroke-dashoffset', 2000)
            .transition().delay(750).duration(750)
            .style('stroke-dashoffset', '0')
            .transition()
            .style('stroke-dasharray', 'none');
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "radius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "color", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "max", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "value", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieLabel.prototype, "explodeSlices", void 0);
    PieLabel = __decorate([
        Component({
            selector: 'g[pieLabel]',
            template: "\n    <title>{{label}}</title>\n    <svg:text\n      class=\"label\"\n      [attr.transform]=\"transform\"\n      dy=\".35em\"\n      [style.textAnchor]=\"textAnchor()\"\n      [style.shapeRendering]=\"'crispEdges'\"\n      [style.textTransform]=\"'uppercase'\">\n      {{trimLabel(label)}}\n    </svg:text>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"line\"\n      [style.strokeDasharray]=\"2000\"\n      [style.strokeDashoffset]=\"0\">\n    </svg:path>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], PieLabel);
    return PieLabel;
    var _a;
}());

var PieArc = (function () {
    function PieArc(element) {
        this.gradient = false;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    PieArc.prototype.ngOnInit = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.3;
        var pageUrl = window.location.href;
        this.radialGradientId = 'linearGrad' + ObjectId().toString();
        this.linearGradientId = 'radialGrad' + ObjectId().toString();
        if (this.innerRadius !== 0) {
            this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        }
        else {
            this.gradientFill = "url(" + pageUrl + "#" + this.linearGradientId + ")";
        }
        this.loadAnimation();
    };
    PieArc.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return d3.arc()
            .innerRadius(this.innerRadius).outerRadius(outerRadius);
    };
    PieArc.prototype.loadAnimation = function () {
        var node = d3.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArc.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "startAngle", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "endAngle", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "innerRadius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "outerRadius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "value", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "total", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "max", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "explodeSlices", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PieArc.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PieArc.prototype, "clickHandler", void 0);
    PieArc = __decorate([
        Component({
            selector: 'g[pieArc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"linearGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n        <svg:g svgRadialGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [style.cursor]=\"'pointer'\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"click()\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], PieArc);
    return PieArc;
    var _a;
}());

var PieChart = (function (_super) {
    __extends(PieChart, _super);
    function PieChart() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.labels = false;
        this.legend = false;
        this.explodeSlices = false;
        this.doughnut = false;
        this.clickHandler = new EventEmitter();
    }
    PieChart.prototype.ngOnInit = function () {
        this.update();
    };
    PieChart.prototype.ngOnChanges = function () {
        this.update();
    };
    PieChart.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        var dims = calculateViewDimensions(this.view, this.margin, false, false, this.legend, 9);
        var xOffset = this.margin[3] + dims.width / 2;
        var yOffset = this.margin[0] + dims.height / 2;
        this.translation = "translate(" + xOffset + ", " + yOffset + ")";
        this.outerRadius = Math.min(dims.width, dims.height);
        if (this.labels) {
            this.outerRadius /= 3;
        }
        else {
            this.outerRadius /= 2;
        }
        this.innerRadius = 0;
        if (this.doughnut) {
            this.innerRadius = this.outerRadius * 0.75;
        }
        this.domain = this.getDomain();
        this.data = this.results.sort(function (a, b) {
            return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
        });
        this.setColors();
    };
    PieChart.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieChart.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieChart.prototype.setColors = function () {
        this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "customColors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "labels", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "legend", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "explodeSlices", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "doughnut", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PieChart.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PieChart.prototype, "clickHandler", void 0);
    PieChart = __decorate([
        Component({
            selector: 'pie-chart',
            template: "\n    <chart\n      [colors]=\"colors\"\n      [legend]=\"legend\"\n      [view]=\"view\"\n      [legendData]=\"domain\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie chart\">\n        <svg:g pieSeries\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"data\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieChart);
    return PieChart;
}(BaseChart));

var PieGrid = (function (_super) {
    __extends(PieGrid, _super);
    function PieGrid() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
        this.clickHandler = new EventEmitter();
    }
    PieGrid.prototype.ngOnInit = function () {
        this.update();
    };
    PieGrid.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGrid.prototype.update = function () {
        _super.prototype.update.call(this);
        this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);
        this.domain = this.getDomain();
        this.data = gridLayout(this.dims, this.results, 150);
        this.transform = "translate(" + this.margin[3] + " , " + this.margin[0] + ")";
        this.series = this.getSeries();
        this.setColors();
    };
    PieGrid.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGrid.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var label = d.data.name;
            var value = d.data.value;
            var radius = d3.min([d.width, d.height]) / 2.1;
            var innerRadius = radius * 0.75;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale(label);
                }
            };
            return {
                transform: "translate(" + (d.x + d.width / 2) + " , " + (d.y + d.height / 2) + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                label: trimLabel(label),
                total: "Total: " + d3.format(".2f")(value),
                percent: d3.format(".1p")(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: 'other'
                        }
                    }]
            };
        });
    };
    PieGrid.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; });
    };
    PieGrid.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    PieGrid.prototype.setColors = function () {
        this.colorScale = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "customColors", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PieGrid.prototype, "clickHandler", void 0);
    PieGrid = __decorate([
        Component({
            selector: 'pie-grid',
            template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"view\" >\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid-chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n\n          <svg:g pieGridSeries\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (clickHandler)=\"click($event)\"\n          />\n\n          <svg:text\n            class=\"label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.percent}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\">\n            {{series.total}}\n          </svg:text>\n\n        </svg:g>\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieGrid);
    return PieGrid;
}(BaseChart));

var PieGridSeries = (function () {
    function PieGridSeries(element) {
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeries.prototype.ngOnInit = function () {
        this.update();
    };
    PieGridSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieGridSeries.prototype.update = function () {
        this.layout = d3.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
        this.loadAnimation();
    };
    PieGridSeries.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var genArcPath = d3.arc()
                .innerRadius(_this.innerRadius).outerRadius(_this.outerRadius)
                .startAngle(arc.startAngle).endAngle(arc.endAngle);
            return {
                class: 'arc ' + 'arc' + index,
                d: genArcPath(),
                cursor: other ? 'auto' : 'pointer',
                fill: _this.colors(label),
                opacity: other ? 0.4 : 1
            };
        });
    };
    PieGridSeries.prototype.loadAnimation = function () {
        var layout = d3.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        var data = layout(this.data);
        var node = d3.select(this.element).selectAll('.arc1').data([{
                startAngle: data[0].startAngle,
                endAngle: data[0].endAngle
            }]);
        var arc = this.calculateArc(this.innerRadius, this.outerRadius);
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieGridSeries.prototype.calculateArc = function (innerRadius, outerRadius) {
        return d3.arc()
            .innerRadius(innerRadius).outerRadius(outerRadius);
    };
    PieGridSeries.prototype.click = function (data) {
        this.clickHandler.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "innerRadius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "outerRadius", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PieGridSeries.prototype, "clickHandler", void 0);
    PieGridSeries = __decorate([
        Component({
            selector: 'g[pieGridSeries]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:path *ngFor=\"let arc of arcs\"\n        [attr.class]=\"arc.class\"\n        [attr.d]=\"arc.d\"\n        [style.cursor]=\"arc.cursor\"\n        [style.opacity]=\"arc.opacity\"\n        [attr.fill]=\"arc.fill\"\n        (click)=\"click(arc.data)\"\n      />\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], PieGridSeries);
    return PieGridSeries;
    var _a;
}());

var PieSeries = (function () {
    function PieSeries() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.clickHandler = new EventEmitter();
    }
    PieSeries.prototype.ngOnInit = function () {
        this.update();
    };
    PieSeries.prototype.ngOnChanges = function () {
        this.update();
    };
    PieSeries.prototype.update = function () {
        var pie = d3.pie()
            .value(function (d) { return d.value; })
            .sort(null);
        this.total = this.getTotal();
        var arcData = pie(this.series);
        this.max = d3.max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
    };
    PieSeries.prototype.getTotal = function () {
        return this.series
            .map(function (d) { return d.value; })
            .reduce(function (sum, val) { return sum + val; });
    };
    PieSeries.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeries.prototype.outerArc = function () {
        var factor = 1.5;
        return d3.arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeries.prototype.calculateLabelPositions = function (pieData) {
        var minDistance = 10;
        var chart = this;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = chart.outerArc().centroid(d);
            d.pos[0] = chart.outerRadius * (chart.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                if (b.pos[0] * a.pos[0] > 0) {
                    if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
                        labelPositions[j].pos[1] = b.pos[1] + minDistance;
                        j--;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeries.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeries.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieSeries.prototype.tooltipText = function (arc) {
        return this.label(arc) + ": " + arc.data.value;
    };
    PieSeries.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    PieSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "colors", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "series", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "innerRadius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "outerRadius", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "explodeSlices", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "showLabels", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Boolean)
    ], PieSeries.prototype, "gradient", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], PieSeries.prototype, "clickHandler", void 0);
    PieSeries = __decorate([
        Component({
            selector: 'g[pieSeries]',
            template: "\n    <svg:g *ngFor=\"let arc of data\">\n      <svg:g pieLabel\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"label(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n\n      <svg:g pieArc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [total]=\"total\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        (clickHandler)=\"click($event)\"\n        sw-popover\n        [popoverSpacing]=\"15\"\n        [popoverText]=\"tooltipText(arc)\"\n        [popoverGroup]=\"'charts'\"\n        [gradient]=\"gradient\"\n      ></svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], PieSeries);
    return PieSeries;
}());

var PieChartModule = (function () {
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                AdvancedPieChart,
                PieLabel,
                PieArc,
                PieChart,
                PieGrid,
                PieGridSeries,
                PieSeries
            ],
            exports: [
                AdvancedPieChart,
                PieLabel,
                PieArc,
                PieChart,
                PieGrid,
                PieGridSeries,
                PieSeries
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartModule);
    return PieChartModule;
}());

var TreeMapCell = (function () {
    function TreeMapCell(element) {
        this.clickHandler = new EventEmitter();
        this.element = element.nativeElement;
    }
    TreeMapCell.prototype.ngOnInit = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.loadAnimation();
    };
    TreeMapCell.prototype.loadAnimation = function () {
        var node = d3.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    TreeMapCell.prototype.animateToCurrentForm = function () {
        var node = d3.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    TreeMapCell.prototype.click = function () {
        this.clickHandler.emit(this.label);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "fill", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "x", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "y", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "width", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "height", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "label", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "value", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "valueType", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "clickHandler", void 0);
    TreeMapCell = __decorate([
        Component({
            selector: 'g[treeMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        (click)=\"click()\"\n      />\n\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        x=\"0\"\n        [attr.y]=\"height/2 - 15\"\n        [attr.width]=\"width\"\n        height=\"40\">\n        <xhtml:p>\n          <xhtml:b>{{label}}</xhtml:b>\n          <xhtml:br/>\n          {{formattedValue}}\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof ElementRef !== 'undefined' && ElementRef) === 'function' && _a) || Object])
    ], TreeMapCell);
    return TreeMapCell;
    var _a;
}());

var TreeMapCellSeries = (function () {
    function TreeMapCellSeries() {
        this.clickHandler = new EventEmitter();
    }
    TreeMapCellSeries.prototype.ngOnInit = function () {
        this.cells = this.getCells();
    };
    TreeMapCellSeries.prototype.getCells = function () {
        var _this = this;
        return this.data
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            return {
                x: d.x,
                y: d.y,
                width: d.dx,
                height: d.dy,
                fill: _this.colors(d.label),
                label: d.label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeries.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "data", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "dims", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "colors", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeries.prototype, "clickHandler", void 0);
    TreeMapCellSeries = __decorate([
        Component({
            selector: 'g[treeMapCellSeries]',
            template: "\n    <svg:g treeMapCell *ngFor=\"let c of cells\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (clickHandler)=\"click($event)\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapCellSeries);
    return TreeMapCellSeries;
}());

var TreeMap = (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new EventEmitter();
    }
    TreeMap.prototype.ngOnInit = function () {
        this.dims = calculateViewDimensions(this.view, this.margin, false, false, false, 12);
        var data = [];
        for (var i = 0; i < this.results.data.length; i++) {
            data[i] = {};
            data[i].value = this.results.data[i].value;
            data[i].valueType = this.results.data[i].valueType;
            data[i].label = this.results.data[i].label;
        }
        this.treemap = d3.treemap()
            .children(function (d) { return d; })
            .size([this.dims.width, this.dims.height])
            .sticky(true)
            .value(function (d) { return d.value; });
        this.data = this.treemap(data);
        this.colors = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
        this.transform = "translate(" + this.dims.xOffset + " , " + this.margin[0] + ")";
    };
    TreeMap.prototype.click = function (data) {
        this.clickHandler.emit(data);
    };
    TreeMap.prototype.setColors = function () {
    };
    TreeMap.prototype.update = function () {
    };
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "view", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "results", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "margin", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "scheme", void 0);
    __decorate([
        Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "customColors", void 0);
    __decorate([
        Output(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "clickHandler", void 0);
    TreeMap = __decorate([
        Component({
            selector: 'tree-map',
            template: "\n    <chart\n      legend=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"treemap\">\n        <svg:g treeMapCellSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMap);
    return TreeMap;
}(BaseChart));

var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    TreeMapModule = __decorate([
        NgModule({
            imports: [CommonModule],
            declarations: [
                TreeMapCell,
                TreeMapCellSeries,
                TreeMap
            ],
            exports: [
                TreeMapCell,
                TreeMapCellSeries,
                TreeMap
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapModule);
    return TreeMapModule;
}());

var NG2D3Module = (function () {
    function NG2D3Module() {
    }
    NG2D3Module = __decorate([
        NgModule({
            exports: [
                CommonModule,
                AreaChartModule,
                BarChartModule,
                HeatMapModule,
                LineChartModule,
                NumberCardModule,
                PieChartModule,
                TreeMapModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NG2D3Module);
    return NG2D3Module;
}());

export { NG2D3Module };
//# sourceMappingURL=ng2d3.es.js.map
