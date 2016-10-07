"use strict";
var rxjs_1 = require("rxjs");
var BaseChart = (function () {
    function BaseChart(chartElement, zone) {
        this.chartElement = chartElement;
        this.zone = zone;
    }
    BaseChart.prototype.bindResizeEvents = function (view) {
        var _this = this;
        this.view = view;
        this.zone.runOutsideAngular(function () {
            rxjs_1.Observable.fromEvent(window, 'load', null, null)
                .subscribe(function (e) {
                _this.setChartSizeBasedOnContainer();
            });
        });
        this.bindWindowResizeEvent();
    };
    BaseChart.prototype.update = function () {
        this.results = this.cloneData(this.results);
    };
    BaseChart.prototype.setChartSizeBasedOnContainer = function () {
        var _this = this;
        var hostElem = this.chartElement.nativeElement;
        var width = hostElem.parentNode.clientWidth;
        var height = hostElem.parentNode.clientHeight;
        console.log('container width', width);
        console.log('container width', hostElem.parentNode);
        console.log('container height', height);
        console.log('container height', hostElem.parentNode);
        setTimeout(function () {
            _this.view = [width, height];
            console.log('view', _this.view);
            _this.update();
        }, 0);
    };
    BaseChart.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        this.zone.runOutsideAngular(function () {
            rxjs_1.Observable.fromEvent(window, 'resize', null, null).debounceTime(100)
                .subscribe(function (e) {
                _this.setChartSizeBasedOnContainer();
            });
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