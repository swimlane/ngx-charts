"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('@angular/core');
var moment = require('moment');
var d3_1 = require('../d3');
var Timeline = (function () {
    function Timeline(element) {
        this.margin = [10, 20, 70, 20];
        this.initialized = false;
        this.clickHandler = new core_1.EventEmitter();
        this.onDomainChange = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function () {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        this.dims = this.getDims();
        var offsetY = this.view[1] - 150;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        this.transform = "translate(" + this.margin[3] + " , " + (this.margin[0] + offsetY) + ")";
    };
    Timeline.prototype.getXDomain = function () {
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
    Timeline.prototype.getYDomain = function () {
    };
    Timeline.prototype.getXScale = function () {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, this.dims.width])
                .domain(this.xDomain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, this.dims.width])
                .padding(0.1)
                .domain(this.xDomain);
        }
        return scale;
    };
    Timeline.prototype.getYScale = function () {
        d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush) {
            return;
        }
        var height = 150 - this.margin[0] - this.margin[2];
        var width = this.view[0];
        if (this.legend) {
            width = width * 9 / 12.0;
        }
        width = width - this.margin[1] - this.margin[3];
        this.brush = d3_1.default.brushX()
            .extent([[0, 0], [width, height]])
            .on("brush end", function () {
            var selection = d3_1.default.selection.event.selection || _this.xScale.range();
            var newDomain = selection.map(_this.xScale.invert);
            _this.onDomainChange.emit(newDomain);
        });
        d3_1.default.select(this.element)
            .select('.brush')
            .call(this.brush);
    };
    Timeline.prototype.getDims = function () {
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "customColors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "miniChart", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "scaleType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "clickHandler", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "onDomainChange", void 0);
    Timeline = __decorate([
        core_1.Component({
            selector: 'g[timeline]',
            template: "\n    <svg:g\n      [attr.transform]=\"transform\">\n\n      <svg:g xAxis\n        [xScale]=\"xScale\"\n        [dims]=\"dims\"\n        [showGridLines]=\"showGridLines\"\n      />\n\n      <svg:g class=\"brush\">\n      </svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Timeline);
    return Timeline;
}());
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.component.js.map