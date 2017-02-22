"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var d3_1 = require('../../d3');
var utils_1 = require('../../utils');
var Timeline = (function () {
    function Timeline(element, zone, cd, location) {
        this.zone = zone;
        this.cd = cd;
        this.location = location;
        this.height = 50;
        this.select = new core_1.EventEmitter();
        this.onDomainChange = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    Timeline.prototype.ngOnChanges = function (changes) {
        this.update();
        if (!this.initialized) {
            this.addBrush();
            this.initialized = true;
        }
    };
    Timeline.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.dims = _this.getDims();
            _this.height = _this.dims.height;
            var offsetY = _this.view[1] - _this.height;
            _this.xDomain = _this.getXDomain();
            _this.xScale = _this.getXScale();
            if (_this.brush) {
                _this.updateBrush();
            }
            _this.transform = "translate(0 , " + offsetY + ")";
            var pageUrl = _this.location.path();
            _this.filterId = 'filter' + utils_1.id().toString();
            _this.filter = "url(" + pageUrl + "#" + _this.filterId + ")";
            _this.cd.markForCheck();
        });
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
        if (this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush = d3_1.default.brushX()
            .extent([[0, 0], [width, height]])
            .on('brush end', function () {
            _this.zone.run(function () {
                var selection = d3_1.default.selection.event.selection || _this.xScale.range();
                var newDomain = selection.map(_this.xScale.invert);
                _this.onDomainChange.emit(newDomain);
                _this.cd.markForCheck();
            });
        });
        d3_1.default.select(this.element)
            .select('.brush')
            .call(this.brush);
    };
    Timeline.prototype.updateBrush = function () {
        var _this = this;
        if (!this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.zone.run(function () {
            _this.brush.extent([[0, 0], [width, height]]);
            d3_1.default.select(_this.element)
                .select('.brush')
                .call(_this.brush);
            // clear hardcoded properties so they can be defined by CSS
            d3_1.default.select(_this.element).select('.selection')
                .attr('fill', undefined)
                .attr('stroke', undefined)
                .attr('fill-opacity', undefined);
            _this.cd.markForCheck();
        });
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
                    selector: 'g[ngx-charts-timeline]',
                    template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\"\n        [attr.width]=\"view[0]\"\n        y=\"0\"\n        [attr.height]=\"height\"\n        class=\"brush-background\"\n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
                    styleUrls: ['./timeline.component.css'],
                    encapsulation: core_1.ViewEncapsulation.None,
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    Timeline.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: core_1.NgZone, },
        { type: core_1.ChangeDetectorRef, },
        { type: common_1.Location, },
    ]; };
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
        'select': [{ type: core_1.Output },],
        'onDomainChange': [{ type: core_1.Output },],
    };
    return Timeline;
}());
exports.Timeline = Timeline;
//# sourceMappingURL=timeline.component.js.map