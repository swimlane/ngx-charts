"use strict";
var core_1 = require('@angular/core');
var moment = require("moment");
var throttle_1 = require("../utils/throttle");
var d3_1 = require('../d3');
var Timeline = (function () {
    function Timeline(element) {
        this.margin = [10, 20, 70, 20];
        this.clickHandler = new core_1.EventEmitter();
        this.updateXDomain = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnInit = function () {
        this.dims = this.calculateDims();
        var offsetY = this.view[1] - 150;
        var results = this.results;
        results.series[0] = results.series[0].sort(function (a, b) {
            return results.d0Domain.indexOf(a.vals[0].label[0][0]) - results.d0Domain.indexOf(b.vals[0].label[0][0]);
        });
        var yScale = d3_1.default.scaleLinear()
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
            this.brush = d3_1.default.brushX(this.state.xScale)
                .on("brush", throttle_1.throttle(function () {
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
        d3_1.default.select(this.element)
            .select('.brush')
            .call(this.brush)
            .selectAll("rect")
            .attr("y", 0)
            .attr("height", height);
        d3_1.default.select(this.element)
            .selectAll('.background')
            .attr('width', width);
    };
    Timeline.prototype.calculateXScale = function () {
        var xScale;
        var domain = d3_1.default.extent(this.results.d0Domain, function (d) {
            return moment(d).toDate();
        });
        if (this.state.xScale) {
            xScale = this.state.xScale;
        }
        else {
            xScale = d3_1.default.scaleTime()
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
    ], Timeline.prototype, "margin", void 0);
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
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "clickHandler", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "updateXDomain", void 0);
    Timeline = __decorate([
        core_1.Component({
            selector: 'g[timeline]',
            template: "\n    <svg:g\n      [attr.transform]=\"transform\">\n\n      <svg:g xAxis\n        [xScale]=\"xScale\"\n        [dims]=\"dims\"\n        [showGridLines]=\"showGridLines\"\n      />\n\n      <svg:g class=\"x brush\">\n      </svg:g>\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Timeline);
    return Timeline;
}());
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.component.js.map