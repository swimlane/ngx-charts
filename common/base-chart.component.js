"use strict";
var rxjs_1 = require("rxjs");
var BaseChart = (function () {
    function BaseChart(chartElement, zone) {
        this.chartElement = chartElement;
        this.zone = zone;
    }
    BaseChart.prototype.bindResizeEvents = function (view) {
        this.view = view;
        this.bindWindowResizeEvent();
    };
    BaseChart.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChart.prototype.update = function () {
        this.results = this.cloneData(this.results);
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            this.width = dims.width;
            this.height = dims.height;
        }
    };
    BaseChart.prototype.getContainerDims = function () {
        var width = 0;
        var height = 0;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode != null) {
            width = hostElem.parentNode.clientWidth;
            height = hostElem.parentNode.clientHeight;
        }
        return { width: width, height: height };
    };
    BaseChart.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            var source = rxjs_1.Observable.fromEvent(window, 'resize', null, null);
            var subscription = source.debounceTime(200).subscribe(function (e) {
                _this.zone.run(function () { _this.update(); });
            });
            _this.zone.run(function () { _this.resizeSubscription = subscription; });
        });
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
exports.BaseChart = BaseChart;
//# sourceMappingURL=base-chart.component.js.map