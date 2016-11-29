"use strict";
var core_1 = require('@angular/core');
var moment = require('moment');
var d3_1 = require('../d3');
var id_1 = require("../utils/id");
var Timeline = (function () {
    function Timeline(element) {
        this.initialized = false;
        this.height = 50;
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
        this.height = this.dims.height;
        var offsetY = this.view[1] - this.height;
        this.xDomain = this.getXDomain();
        this.xScale = this.getXScale();
        if (this.brush) {
            this.updateBrush();
        }
        this.transform = "translate(0 , " + offsetY + ")";
        var pageUrl = window.location.href;
        this.filterId = 'filter' + id_1.id().toString();
        this.filter = "url(" + pageUrl + "#" + this.filterId + ")";
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
    Timeline.prototype.addBrush = function () {
        var _this = this;
        if (this.brush) {
            return;
        }
        var height = this.height;
        var width = this.view[0];
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
    Timeline.prototype.updateBrush = function () {
        if (!this.brush) {
            return;
        }
        var height = this.height;
        var width = this.view[0];
        this.brush.extent([[0, 0], [width, height]]);
        d3_1.default.select(this.element)
            .select('.brush')
            .call(this.brush);
        // clear hardcoded properties so they can be defined by CSS
        d3_1.default.select(this.element).select('.selection')
            .attr('fill', undefined)
            .attr('stroke', undefined)
            .attr('fill-opacity', undefined);
    };
    Timeline.prototype.getDims = function () {
        var width = this.view[0];
        var dims = {
            width: width,
            height: this.height
        };
        return dims;
    };
    Timeline.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[timeline]',
                    template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n\n      <svg:g [attr.filter]=\"filter\" class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n\n      <svg:g class=\"brush\">\n      </svg:g>\n\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    Timeline.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    Timeline.propDecorators = {
        'view': [{ type: core_1.Input },],
        'state': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'miniChart': [{ type: core_1.Input },],
        'autoScale': [{ type: core_1.Input },],
        'scaleType': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
        'onDomainChange': [{ type: core_1.Output },],
    };
    return Timeline;
}());
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.component.js.map