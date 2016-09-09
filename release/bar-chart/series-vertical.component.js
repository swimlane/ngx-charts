"use strict";
var core_1 = require('@angular/core');
var moment = require('moment');
var SeriesVertical = (function () {
    function SeriesVertical() {
        this.type = 'standard';
        this.scaleType = 'ordinal';
        this.clickHandler = new core_1.EventEmitter();
    }
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
                var secondDate = moment(firstDate).add(1, 'hours');
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeriesVertical.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesVertical.prototype, "clickHandler", void 0);
    SeriesVertical = __decorate([
        core_1.Component({
            selector: 'g[seriesVertical]',
            template: "\n    <svg:g bar *ngFor=\"let bar of bars\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (clickHandler)=\"click($event)\"\n      [gradient]=\"gradient\"\n\n      sw-popover\n      [popoverSpacing]=\"15\"\n      [popoverText]=\"bar.tooltipText\"\n      [popoverGroup]=\"'charts'\">\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesVertical);
    return SeriesVertical;
}());
exports.SeriesVertical = SeriesVertical;
//# sourceMappingURL=series-vertical.component.js.map