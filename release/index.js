/**
 * ngx-charts v"3.0.2" (https://github.com/swimlane/ngx-charts)
 * Copyright 2016
 * Licensed under MIT
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("d3-array"), require("d3-brush"), require("d3-color"), require("d3-force"), require("d3-format"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("moment"), require("rxjs/Rx"));
	else if(typeof define === 'function' && define.amd)
		define("ngx-charts", ["@angular/common", "@angular/core", "@angular/platform-browser", "d3-array", "d3-brush", "d3-color", "d3-force", "d3-format", "d3-hierarchy", "d3-interpolate", "d3-scale", "d3-selection", "d3-shape", "moment", "rxjs/Rx"], factory);
	else if(typeof exports === 'object')
		exports["ngx-charts"] = factory(require("@angular/common"), require("@angular/core"), require("@angular/platform-browser"), require("d3-array"), require("d3-brush"), require("d3-color"), require("d3-force"), require("d3-format"), require("d3-hierarchy"), require("d3-interpolate"), require("d3-scale"), require("d3-selection"), require("d3-shape"), require("moment"), require("rxjs/Rx"));
	else
		root["ngx-charts"] = factory(root["@angular/common"], root["@angular/core"], root["@angular/platform-browser"], root["d3-array"], root["d3-brush"], root["d3-color"], root["d3-force"], root["d3-format"], root["d3-hierarchy"], root["d3-interpolate"], root["d3-scale"], root["d3-selection"], root["d3-shape"], root["moment"], root["rxjs/Rx"]);
})(this, function(__WEBPACK_EXTERNAL_MODULE_2__, __WEBPACK_EXTERNAL_MODULE_0__, __WEBPACK_EXTERNAL_MODULE_3__, __WEBPACK_EXTERNAL_MODULE_4__, __WEBPACK_EXTERNAL_MODULE_5__, __WEBPACK_EXTERNAL_MODULE_6__, __WEBPACK_EXTERNAL_MODULE_7__, __WEBPACK_EXTERNAL_MODULE_8__, __WEBPACK_EXTERNAL_MODULE_9__, __WEBPACK_EXTERNAL_MODULE_10__, __WEBPACK_EXTERNAL_MODULE_11__, __WEBPACK_EXTERNAL_MODULE_12__, __WEBPACK_EXTERNAL_MODULE_13__, __WEBPACK_EXTERNAL_MODULE_1__, __WEBPACK_EXTERNAL_MODULE_14__) {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmory imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmory exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		Object.defineProperty(exports, name, {
/******/ 			configurable: false,
/******/ 			enumerable: true,
/******/ 			get: getter
/******/ 		});
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/index.ts");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/area-chart/area-chart-normalized.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var moment = __webpack_require__(1);
var id_1 = __webpack_require__("./src/utils/id.ts");
var AreaChartNormalizedComponent = (function (_super) {
    __extends(AreaChartNormalizedComponent, _super);
    function AreaChartNormalizedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.curve = d3_1.default.shape.curveLinear;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    AreaChartNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            if (_this.timeline) {
                _this.dims.height -= (_this.timelineHeight + _this.margin[2] + _this.timelinePadding);
            }
            _this.xDomain = _this.getXDomain();
            if (_this.filteredDomain) {
                _this.xDomain = _this.filteredDomain;
            }
            _this.yDomain = _this.getYDomain();
            _this.seriesDomain = _this.getSeriesDomain();
            _this.xScale = _this.getXScale(_this.xDomain, _this.dims.width);
            _this.yScale = _this.getYScale(_this.yDomain, _this.dims.height);
            var _loop_1 = function(i) {
                var val = _this.xSet[i];
                var d0 = 0;
                var total = 0;
                for (var _i = 0, _a = _this.results; _i < _a.length; _i++) {
                    var group = _a[_i];
                    var d = group.series.find(function (item) {
                        var a = item.name;
                        var b = val;
                        if (_this.scaleType === 'time') {
                            a = a.valueOf();
                            b = b.valueOf();
                        }
                        return a === b;
                    });
                    if (d) {
                        total += d.value;
                    }
                }
                for (var _b = 0, _c = _this.results; _b < _c.length; _b++) {
                    var group = _c[_b];
                    var d = group.series.find(function (item) {
                        var a = item.name;
                        var b = val;
                        if (_this.scaleType === 'time') {
                            a = a.valueOf();
                            b = b.valueOf();
                        }
                        return a === b;
                    });
                    if (d) {
                        d.d0 = d0;
                        d.d1 = d0 + d.value;
                        d0 += d.value;
                    }
                    else {
                        d = {
                            name: val,
                            value: 0,
                            d0: d0,
                            d1: d0
                        };
                        group.series.push(d);
                    }
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
            for (var i = 0; i < _this.xSet.length; i++) {
                _loop_1(i);
            }
            _this.updateTimeline();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
            var pageUrl = window.location.href;
            _this.clipPathId = 'clip' + id_1.id().toString();
            _this.clipPath = "url(" + pageUrl + "#" + _this.clipPathId + ")";
        });
    };
    AreaChartNormalizedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartNormalizedComponent.prototype.getXDomain = function () {
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
            domain = [new Date(min), new Date(max)];
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
        this.xSet = values;
        return domain;
    };
    AreaChartNormalizedComponent.prototype.getYDomain = function () {
        return [0, 100];
    };
    AreaChartNormalizedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartNormalizedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    AreaChartNormalizedComponent.prototype.getYScale = function (domain, height) {
        return d3_1.default.scaleLinear()
            .range([height, 0])
            .domain(domain);
    };
    AreaChartNormalizedComponent.prototype.getScaleType = function (values) {
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
    AreaChartNormalizedComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartNormalizedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartNormalizedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
    };
    AreaChartNormalizedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
    };
    AreaChartNormalizedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartNormalizedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartNormalizedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChartNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartNormalizedComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaChartNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AreaChartNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartNormalizedComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AreaChartNormalizedComponent.prototype, "hideCircles", null);
    AreaChartNormalizedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-area-chart-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [activeEntries]=\"activeEntries\"\n              [gradient]=\"gradient\"\n              normalized=\"true\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n          <svg:g ngx-charts-area-tooltip\n            [xSet]=\"xSet\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [results]=\"results\"\n            [height]=\"dims.height\"\n            [colors]=\"colors\"\n            [showPercentage]=\"true\"\n            (hover)=\"updateHoveredVertical($event)\"\n          />\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g ngx-charts-circle-ceries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [activeEntries]=\"activeEntries\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [visibleValue]=\"hoveredVertical\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            normalized=\"true\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartNormalizedComponent);
    return AreaChartNormalizedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.AreaChartNormalizedComponent = AreaChartNormalizedComponent;


/***/ },

/***/ "./src/area-chart/area-chart-stacked.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var moment = __webpack_require__(1);
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var AreaChartStackedComponent = (function (_super) {
    __extends(AreaChartStackedComponent, _super);
    function AreaChartStackedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.curve = d3_1.default.shape.curveLinear;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    AreaChartStackedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            if (_this.timeline) {
                _this.dims.height -= (_this.timelineHeight + _this.margin[2] + _this.timelinePadding);
            }
            _this.xDomain = _this.getXDomain();
            if (_this.filteredDomain) {
                _this.xDomain = _this.filteredDomain;
            }
            _this.yDomain = _this.getYDomain();
            _this.seriesDomain = _this.getSeriesDomain();
            _this.xScale = _this.getXScale(_this.xDomain, _this.dims.width);
            _this.yScale = _this.getYScale(_this.yDomain, _this.dims.height);
            var _loop_1 = function(i) {
                var val = _this.xSet[i];
                var d0 = 0;
                for (var _i = 0, _a = _this.results; _i < _a.length; _i++) {
                    var group = _a[_i];
                    var d = group.series.find(function (item) {
                        var a = item.name;
                        var b = val;
                        if (_this.scaleType === 'time') {
                            a = a.valueOf();
                            b = b.valueOf();
                        }
                        return a === b;
                    });
                    if (d) {
                        d.d0 = d0;
                        d.d1 = d0 + d.value;
                        d0 += d.value;
                    }
                    else {
                        d = {
                            name: val,
                            value: 0,
                            d0: d0,
                            d1: d0
                        };
                        group.series.push(d);
                    }
                }
            };
            for (var i = 0; i < _this.xSet.length; i++) {
                _loop_1(i);
            }
            _this.updateTimeline();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
            var pageUrl = window.location.href;
            _this.clipPathId = 'clip' + id_1.id().toString();
            _this.clipPath = "url(" + pageUrl + "#" + _this.clipPathId + ")";
        });
    };
    AreaChartStackedComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartStackedComponent.prototype.getXDomain = function () {
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
            domain = [new Date(min), new Date(max)];
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
        this.xSet = values;
        return domain;
    };
    AreaChartStackedComponent.prototype.getYDomain = function () {
        var _this = this;
        var domain = [];
        var _loop_2 = function(i) {
            var val = this_1.xSet[i];
            var sum = 0;
            for (var _i = 0, _a = this_1.results; _i < _a.length; _i++) {
                var group = _a[_i];
                var d = group.series.find(function (item) {
                    var a = item.name;
                    var b = val;
                    if (_this.scaleType === 'time') {
                        a = a.valueOf();
                        b = b.valueOf();
                    }
                    return a === b;
                });
                if (d) {
                    sum += d.value;
                }
            }
            domain.push(sum);
        };
        var this_1 = this;
        for (var i = 0; i < this.xSet.length; i++) {
            _loop_2(i);
        }
        var min = Math.min.apply(Math, [0].concat(domain));
        var max = Math.max.apply(Math, domain);
        return [min, max];
    };
    AreaChartStackedComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartStackedComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    AreaChartStackedComponent.prototype.getYScale = function (domain, height) {
        return d3_1.default.scaleLinear()
            .range([height, 0])
            .domain(domain);
    };
    AreaChartStackedComponent.prototype.getScaleType = function (values) {
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
    AreaChartStackedComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartStackedComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartStackedComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
    };
    AreaChartStackedComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
    };
    AreaChartStackedComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartStackedComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartStackedComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChartStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartStackedComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaChartStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AreaChartStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartStackedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartStackedComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AreaChartStackedComponent.prototype, "hideCircles", null);
    AreaChartStackedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-area-chart-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [activeEntries]=\"activeEntries\"\n              stacked=\"true\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n          <svg:g ngx-charts-area-tooltip\n            [xSet]=\"xSet\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [results]=\"results\"\n            [height]=\"dims.height\"\n            [colors]=\"colors\"\n            (hover)=\"updateHoveredVertical($event)\"\n          />\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-circle-ceries\n              type=\"stacked\"\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [activeEntries]=\"activeEntries\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [visibleValue]=\"hoveredVertical\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            stacked=\"true\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartStackedComponent);
    return AreaChartStackedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.AreaChartStackedComponent = AreaChartStackedComponent;


/***/ },

/***/ "./src/area-chart/area-chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var moment = __webpack_require__(1);
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var AreaChartComponent = (function (_super) {
    __extends(AreaChartComponent, _super);
    function AreaChartComponent() {
        _super.apply(this, arguments);
        this.showGridLines = true;
        this.curve = d3_1.default.shape.curveLinear;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    AreaChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            if (_this.timeline) {
                _this.dims.height -= (_this.timelineHeight + _this.margin[2] + _this.timelinePadding);
            }
            _this.xDomain = _this.getXDomain();
            if (_this.filteredDomain) {
                _this.xDomain = _this.filteredDomain;
            }
            _this.yDomain = _this.getYDomain();
            _this.seriesDomain = _this.getSeriesDomain();
            _this.xScale = _this.getXScale(_this.xDomain, _this.dims.width);
            _this.yScale = _this.getYScale(_this.yDomain, _this.dims.height);
            _this.updateTimeline();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + ", " + _this.margin[0] + ")";
            var pageUrl = window.location.href;
            _this.clipPathId = 'clip' + id_1.id().toString();
            _this.clipPath = "url(" + pageUrl + "#" + _this.clipPathId + ")";
        });
    };
    AreaChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    AreaChartComponent.prototype.getXDomain = function () {
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
        this.xSet = values;
        return domain;
    };
    AreaChartComponent.prototype.getYDomain = function () {
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
    AreaChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AreaChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    AreaChartComponent.prototype.getYScale = function (domain, height) {
        return d3_1.default.scaleLinear()
            .range([height, 0])
            .domain(domain);
    };
    AreaChartComponent.prototype.getScaleType = function (values) {
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
    AreaChartComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    AreaChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    AreaChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
    };
    AreaChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
    };
    AreaChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    AreaChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    AreaChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    AreaChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    AreaChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    AreaChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    AreaChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    AreaChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "state", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChartComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaChartComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], AreaChartComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AreaChartComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], AreaChartComponent.prototype, "hideCircles", null);
    AreaChartComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-area-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"area-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-area-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [gradient]=\"gradient\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n          <svg:g ngx-charts-area-tooltip\n            [xSet]=\"xSet\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [results]=\"results\"\n            [height]=\"dims.height\"\n            [colors]=\"colors\"\n            (hover)=\"updateHoveredVertical($event)\"\n          />\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g ngx-charts-circle-ceries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [activeEntries]=\"activeEntries\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [visibleValue]=\"hoveredVertical\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [legend]=\"legend\"\n        [scaleType]=\"scaleType\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-area-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [gradient]=\"gradient\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartComponent);
    return AreaChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.AreaChartComponent = AreaChartComponent;


/***/ },

/***/ "./src/area-chart/area-chart.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var area_chart_component_1 = __webpack_require__("./src/area-chart/area-chart.component.ts");
exports.AreaChartComponent = area_chart_component_1.AreaChartComponent;
var area_chart_normalized_component_1 = __webpack_require__("./src/area-chart/area-chart-normalized.component.ts");
exports.AreaChartNormalizedComponent = area_chart_normalized_component_1.AreaChartNormalizedComponent;
var area_chart_stacked_component_1 = __webpack_require__("./src/area-chart/area-chart-stacked.component.ts");
exports.AreaChartStackedComponent = area_chart_stacked_component_1.AreaChartStackedComponent;
var area_series_component_1 = __webpack_require__("./src/area-chart/area-series.component.ts");
exports.AreaSeriesComponent = area_series_component_1.AreaSeriesComponent;
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var AreaChartModule = (function () {
    function AreaChartModule() {
    }
    AreaChartModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                area_chart_component_1.AreaChartComponent,
                area_chart_normalized_component_1.AreaChartNormalizedComponent,
                area_chart_stacked_component_1.AreaChartStackedComponent,
                area_series_component_1.AreaSeriesComponent
            ],
            exports: [
                area_chart_component_1.AreaChartComponent,
                area_chart_normalized_component_1.AreaChartNormalizedComponent,
                area_chart_stacked_component_1.AreaChartStackedComponent,
                area_series_component_1.AreaSeriesComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], AreaChartModule);
    return AreaChartModule;
}());
exports.AreaChartModule = AreaChartModule;


/***/ },

/***/ "./src/area-chart/area-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var sort_1 = __webpack_require__("./src/utils/sort.ts");
var AreaSeriesComponent = (function () {
    function AreaSeriesComponent() {
        this.stacked = false;
        this.normalized = false;
        this.select = new core_1.EventEmitter();
    }
    AreaSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaSeriesComponent.prototype.update = function () {
        var _this = this;
        this.updateGradient();
        var area;
        var startingArea;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        if (this.stacked || this.normalized) {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function (d, i) { return _this.yScale(d.d0); })
                .y1(function (d, i) { return _this.yScale(d.d1); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        else {
            area = d3_1.default.area()
                .x(xProperty)
                .y0(function () { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale(d.value); });
            startingArea = d3_1.default.area()
                .x(xProperty)
                .y0(function (d) { return _this.yScale.range()[0]; })
                .y1(function (d) { return _this.yScale.range()[0]; });
        }
        area.curve(this.curve);
        startingArea.curve(this.curve);
        this.opacity = .8;
        var data = this.data.series;
        if (this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sort_1.sortByTime(data, 'name');
        }
        else {
            data = sort_1.sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        this.path = area(data);
        this.startingPath = startingArea(data);
    };
    AreaSeriesComponent.prototype.updateGradient = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            if (this.stacked || this.normalized) {
                var d0values = this.data.series.map(function (d) { return d.d0; });
                var d1values = this.data.series.map(function (d) { return d.d1; });
                var max = Math.max.apply(Math, d1values);
                var min = Math.min.apply(Math, d0values);
                this.gradientStops = this.colors.getLinearGradientStops(max, min);
            }
            else {
                var values = this.data.series.map(function (d) { return d.value; });
                var max = Math.max.apply(Math, values);
                this.gradientStops = this.colors.getLinearGradientStops(max);
            }
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
        }
    };
    AreaSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    AreaSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaSeriesComponent.prototype, "stacked", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaSeriesComponent.prototype, "normalized", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaSeriesComponent.prototype, "select", void 0);
    AreaSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-area-series]',
            template: "\n    <svg:g ngx-charts-area\n      class=\"area-series\"\n      [data]=\"data\"\n      [path]=\"path\"\n      [fill]=\"colors.getColor(data.name)\"\n      [stops]=\"gradientStops\"\n      [startingPath]=\"startingPath\"\n      [opacity]=\"opacity\"\n      [gradient]=\"gradient || hasGradient\"\n      [class.active]=\"isActive(data)\"\n      [class.inactive]=\"isInactive(data)\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AreaSeriesComponent);
    return AreaSeriesComponent;
}());
exports.AreaSeriesComponent = AreaSeriesComponent;


/***/ },

/***/ "./src/area-chart/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/area-chart/area-chart.module.ts"));
__export(__webpack_require__("./src/area-chart/area-chart.component.ts"));
__export(__webpack_require__("./src/area-chart/area-chart-normalized.component.ts"));
__export(__webpack_require__("./src/area-chart/area-chart-stacked.component.ts"));
__export(__webpack_require__("./src/area-chart/area-series.component.ts"));


/***/ },

/***/ "./src/bar-chart/bar-chart.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var bar_component_1 = __webpack_require__("./src/bar-chart/bar.component.ts");
exports.BarComponent = bar_component_1.BarComponent;
var bar_horizontal_component_1 = __webpack_require__("./src/bar-chart/bar-horizontal.component.ts");
exports.BarHorizontalComponent = bar_horizontal_component_1.BarHorizontalComponent;
var bar_horizontal_2d_component_1 = __webpack_require__("./src/bar-chart/bar-horizontal-2d.component.ts");
exports.BarHorizontal2DComponent = bar_horizontal_2d_component_1.BarHorizontal2DComponent;
var bar_horizontal_normalized_component_1 = __webpack_require__("./src/bar-chart/bar-horizontal-normalized.component.ts");
exports.BarHorizontalNormalizedComponent = bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent;
var bar_horizontal_stacked_component_1 = __webpack_require__("./src/bar-chart/bar-horizontal-stacked.component.ts");
exports.BarHorizontalStackedComponent = bar_horizontal_stacked_component_1.BarHorizontalStackedComponent;
var bar_vertical_component_1 = __webpack_require__("./src/bar-chart/bar-vertical.component.ts");
exports.BarVerticalComponent = bar_vertical_component_1.BarVerticalComponent;
var bar_vertical_2d_component_1 = __webpack_require__("./src/bar-chart/bar-vertical-2d.component.ts");
exports.BarVertical2DComponent = bar_vertical_2d_component_1.BarVertical2DComponent;
var bar_vertical_normalized_component_1 = __webpack_require__("./src/bar-chart/bar-vertical-normalized.component.ts");
exports.BarVerticalNormalizedComponent = bar_vertical_normalized_component_1.BarVerticalNormalizedComponent;
var bar_vertical_stacked_component_1 = __webpack_require__("./src/bar-chart/bar-vertical-stacked.component.ts");
exports.BarVerticalStackedComponent = bar_vertical_stacked_component_1.BarVerticalStackedComponent;
var series_horizontal_component_1 = __webpack_require__("./src/bar-chart/series-horizontal.component.ts");
exports.SeriesHorizontal = series_horizontal_component_1.SeriesHorizontal;
var series_vertical_component_1 = __webpack_require__("./src/bar-chart/series-vertical.component.ts");
exports.SeriesVerticalComponent = series_vertical_component_1.SeriesVerticalComponent;
var BarChartModule = (function () {
    function BarChartModule() {
    }
    BarChartModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                bar_component_1.BarComponent,
                bar_horizontal_component_1.BarHorizontalComponent,
                bar_horizontal_2d_component_1.BarHorizontal2DComponent,
                bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent,
                bar_horizontal_stacked_component_1.BarHorizontalStackedComponent,
                bar_vertical_component_1.BarVerticalComponent,
                bar_vertical_2d_component_1.BarVertical2DComponent,
                bar_vertical_normalized_component_1.BarVerticalNormalizedComponent,
                bar_vertical_stacked_component_1.BarVerticalStackedComponent,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVerticalComponent
            ],
            exports: [
                bar_component_1.BarComponent,
                bar_horizontal_component_1.BarHorizontalComponent,
                bar_horizontal_2d_component_1.BarHorizontal2DComponent,
                bar_horizontal_normalized_component_1.BarHorizontalNormalizedComponent,
                bar_horizontal_stacked_component_1.BarHorizontalStackedComponent,
                bar_vertical_component_1.BarVerticalComponent,
                bar_vertical_2d_component_1.BarVertical2DComponent,
                bar_vertical_normalized_component_1.BarVerticalNormalizedComponent,
                bar_vertical_stacked_component_1.BarVerticalStackedComponent,
                series_horizontal_component_1.SeriesHorizontal,
                series_vertical_component_1.SeriesVerticalComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarChartModule);
    return BarChartModule;
}());
exports.BarChartModule = BarChartModule;


/***/ },

/***/ "./src/bar-chart/bar-horizontal-2d.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarHorizontal2DComponent = (function (_super) {
    __extends(BarHorizontal2DComponent, _super);
    function BarHorizontal2DComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarHorizontal2DComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valuesDomain = _this.getValueDomain();
            _this.groupScale = _this.getGroupScale();
            _this.innerScale = _this.getInnerScale();
            _this.valueScale = _this.getValueScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarHorizontal2DComponent.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarHorizontal2DComponent.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarHorizontal2DComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valuesDomain);
    };
    BarHorizontal2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontal2DComponent.prototype.getInnerDomain = function () {
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
    BarHorizontal2DComponent.prototype.getValueDomain = function () {
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
    BarHorizontal2DComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.groupScale(group.name) + ")";
    };
    BarHorizontal2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontal2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontal2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontal2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontal2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontal2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontal2DComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontal2DComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontal2DComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal2DComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontal2DComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarHorizontal2DComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarHorizontal2DComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontal2DComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontal2DComponent.prototype, "deactivate", void 0);
    BarHorizontal2DComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-horizontal-2d',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-grid-panel-series\n          [xScale]=\"valueScale\"\n          [yScale]=\"groupScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"horizontal\">\n        </svg:g>\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            [xScale]=\"valueScale\"\n            [activeEntries]=\"activeEntries\"\n            [yScale]=\"innerScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontal2DComponent);
    return BarHorizontal2DComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarHorizontal2DComponent = BarHorizontal2DComponent;


/***/ },

/***/ "./src/bar-chart/bar-horizontal-normalized.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarHorizontalNormalizedComponent = (function (_super) {
    __extends(BarHorizontalNormalizedComponent, _super);
    function BarHorizontalNormalizedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarHorizontalNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarHorizontalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalNormalizedComponent.prototype.getInnerDomain = function () {
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
    BarHorizontalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarHorizontalNormalizedComponent.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalNormalizedComponent.prototype.getXScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalNormalizedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalNormalizedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarHorizontalNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarHorizontalNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalNormalizedComponent.prototype, "deactivate", void 0);
    BarHorizontalNormalizedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-horizontal-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalNormalizedComponent);
    return BarHorizontalNormalizedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarHorizontalNormalizedComponent = BarHorizontalNormalizedComponent;


/***/ },

/***/ "./src/bar-chart/bar-horizontal-stacked.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarHorizontalStackedComponent = (function (_super) {
    __extends(BarHorizontalStackedComponent, _super);
    function BarHorizontalStackedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarHorizontalStackedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarHorizontalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarHorizontalStackedComponent.prototype.getInnerDomain = function () {
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
    BarHorizontalStackedComponent.prototype.getValueDomain = function () {
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
    BarHorizontalStackedComponent.prototype.getYScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarHorizontalStackedComponent.prototype.getXScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    BarHorizontalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(0, " + this.yScale(group.name) + ")";
    };
    BarHorizontalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarHorizontalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarHorizontalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalStackedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarHorizontalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarHorizontalStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalStackedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalStackedComponent.prototype, "deactivate", void 0);
    BarHorizontalStackedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-horizontal-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-horizontal\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [activeEntries]=\"activeEntries\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalStackedComponent);
    return BarHorizontalStackedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarHorizontalStackedComponent = BarHorizontalStackedComponent;


/***/ },

/***/ "./src/bar-chart/bar-horizontal.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarHorizontalComponent = (function (_super) {
    __extends(BarHorizontalComponent, _super);
    function BarHorizontalComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarHorizontalComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarHorizontalComponent.prototype.getXScale = function () {
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.xDomain);
    };
    BarHorizontalComponent.prototype.getYScale = function () {
        var spacing = 0.2;
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(spacing)
            .domain(this.yDomain);
    };
    BarHorizontalComponent.prototype.getXDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarHorizontalComponent.prototype.getYDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarHorizontalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarHorizontalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.yDomain;
        }
        else {
            domain = this.xDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarHorizontalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.yDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.xDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarHorizontalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarHorizontalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarHorizontalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarHorizontalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarHorizontalComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarHorizontalComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarHorizontalComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarHorizontalComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarHorizontalComponent.prototype, "deactivate", void 0);
    BarHorizontalComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-horizontal',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-horizontal\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [activeEntries]=\"activeEntries\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], BarHorizontalComponent);
    return BarHorizontalComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarHorizontalComponent = BarHorizontalComponent;


/***/ },

/***/ "./src/bar-chart/bar-vertical-2d.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarVertical2DComponent = (function (_super) {
    __extends(BarVertical2DComponent, _super);
    function BarVertical2DComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.scaleType = 'ordinal';
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarVertical2DComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valuesDomain = _this.getValueDomain();
            _this.groupScale = _this.getGroupScale();
            _this.innerScale = _this.getInnerScale();
            _this.valueScale = _this.getValueScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVertical2DComponent.prototype.getGroupScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .paddingOuter(spacing / 2)
            .domain(this.groupDomain);
    };
    BarVertical2DComponent.prototype.getInnerScale = function () {
        var spacing = 0.2;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.groupScale.bandwidth()])
            .paddingInner(spacing)
            .domain(this.innerDomain);
    };
    BarVertical2DComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valuesDomain);
    };
    BarVertical2DComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVertical2DComponent.prototype.getInnerDomain = function () {
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
    BarVertical2DComponent.prototype.getValueDomain = function () {
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
    BarVertical2DComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.groupScale(group.name) + ", 0)";
    };
    BarVertical2DComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVertical2DComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVertical2DComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valuesDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVertical2DComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valuesDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVertical2DComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVertical2DComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVertical2DComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVertical2DComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVertical2DComponent.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical2DComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVertical2DComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarVertical2DComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarVertical2DComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVertical2DComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVertical2DComponent.prototype, "deactivate", void 0);
    BarVertical2DComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-vertical-2d',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-grid-panel-series\n          [xScale]=\"groupScale\"\n          [yScale]=\"valueScale\"\n          [data]=\"results\"\n          [dims]=\"dims\"\n          orient=\"vertical\">\n        </svg:g>\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"groupScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"valueScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\"\n          [activeEntries]=\"activeEntries\"\n          [xScale]=\"innerScale\"\n          [yScale]=\"valueScale\"\n          [colors]=\"colors\"\n          [series]=\"group.series\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event, group)\"\n          (activate)=\"onActivate($event, group)\"\n          (deactivate)=\"onDeactivate($event, group)\"\n        />\n        </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarVertical2DComponent);
    return BarVertical2DComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarVertical2DComponent = BarVertical2DComponent;


/***/ },

/***/ "./src/bar-chart/bar-vertical-normalized.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarVerticalNormalizedComponent = (function (_super) {
    __extends(BarVerticalNormalizedComponent, _super);
    function BarVerticalNormalizedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarVerticalNormalizedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVerticalNormalizedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalNormalizedComponent.prototype.getInnerDomain = function () {
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
    BarVerticalNormalizedComponent.prototype.getValueDomain = function () {
        return [0, 100];
    };
    BarVerticalNormalizedComponent.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalNormalizedComponent.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalNormalizedComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalNormalizedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalNormalizedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalNormalizedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalNormalizedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalNormalizedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalNormalizedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalNormalizedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalNormalizedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalNormalizedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalNormalizedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarVerticalNormalizedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarVerticalNormalizedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalNormalizedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalNormalizedComponent.prototype, "deactivate", void 0);
    BarVerticalNormalizedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-vertical-normalized',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-vertical\n            type=\"normalized\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalNormalizedComponent);
    return BarVerticalNormalizedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarVerticalNormalizedComponent = BarVerticalNormalizedComponent;


/***/ },

/***/ "./src/bar-chart/bar-vertical-stacked.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarVerticalStackedComponent = (function (_super) {
    __extends(BarVerticalStackedComponent, _super);
    function BarVerticalStackedComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarVerticalStackedComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.formatDates();
            _this.groupDomain = _this.getGroupDomain();
            _this.innerDomain = _this.getInnerDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVerticalStackedComponent.prototype.getGroupDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    BarVerticalStackedComponent.prototype.getInnerDomain = function () {
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
    BarVerticalStackedComponent.prototype.getValueDomain = function () {
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
    BarVerticalStackedComponent.prototype.getXScale = function () {
        var spacing = 0.1;
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.groupDomain);
    };
    BarVerticalStackedComponent.prototype.getYScale = function () {
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.valueDomain);
    };
    BarVerticalStackedComponent.prototype.groupTransform = function (group) {
        return "translate(" + this.xScale(group.name) + ", 0)";
    };
    BarVerticalStackedComponent.prototype.onClick = function (data, group) {
        if (group) {
            data.series = group.name;
        }
        this.select.emit(data);
    };
    BarVerticalStackedComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    BarVerticalStackedComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.innerDomain;
        }
        else {
            domain = this.valueDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalStackedComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.innerDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.valueDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalStackedComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalStackedComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalStackedComponent.prototype.onActivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalStackedComponent.prototype.onDeactivate = function (event, group) {
        var item = Object.assign({}, event);
        if (group) {
            item.series = group.name;
        }
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalStackedComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalStackedComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalStackedComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarVerticalStackedComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarVerticalStackedComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalStackedComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalStackedComponent.prototype, "deactivate", void 0);
    BarVerticalStackedComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-vertical-stacked',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g\n          *ngFor=\"let group of results; trackBy:trackBy\"\n          [@animationState]=\"'active'\"\n          [attr.transform]=\"groupTransform(group)\">\n          <svg:g ngx-charts-series-vertical\n            type=\"stacked\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [activeEntries]=\"activeEntries\"\n            [colors]=\"colors\"\n            [series]=\"group.series\"\n            [dims]=\"dims\"\n            [gradient]=\"gradient\"\n            (select)=\"onClick($event, group)\"\n            (activate)=\"onActivate($event, group)\"\n            (deactivate)=\"onDeactivate($event, group)\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalStackedComponent);
    return BarVerticalStackedComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarVerticalStackedComponent = BarVerticalStackedComponent;


/***/ },

/***/ "./src/bar-chart/bar-vertical.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarVerticalComponent = (function (_super) {
    __extends(BarVerticalComponent, _super);
    function BarVerticalComponent() {
        _super.apply(this, arguments);
        this.legend = false;
        this.showGridLines = true;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    BarVerticalComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    BarVerticalComponent.prototype.getXScale = function () {
        var spacing = 0.2;
        this.xDomain = this.getXDomain();
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(spacing)
            .domain(this.xDomain);
    };
    BarVerticalComponent.prototype.getYScale = function () {
        this.yDomain = this.getYDomain();
        return d3_1.default.scaleLinear()
            .range([this.dims.height, 0])
            .domain(this.yDomain);
    };
    BarVerticalComponent.prototype.getXDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    BarVerticalComponent.prototype.getYDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var min = Math.min.apply(Math, [0].concat(values));
        var max = Math.max.apply(Math, values);
        return [min, max];
    };
    BarVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    BarVerticalComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.xDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    BarVerticalComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.xDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    BarVerticalComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    BarVerticalComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    BarVerticalComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    BarVerticalComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value && d.series === item.series;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarVerticalComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarVerticalComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BarVerticalComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], BarVerticalComponent.prototype, "deactivate", void 0);
    BarVerticalComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-bar-vertical',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"bar-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g ngx-charts-series-vertical\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [series]=\"results\"\n          [dims]=\"dims\"\n          [gradient]=\"gradient\"\n          [activeEntries]=\"activeEntries\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n          (select)=\"onClick($event)\">\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], BarVerticalComponent);
    return BarVerticalComponent;
}(base_chart_component_1.BaseChartComponent));
exports.BarVerticalComponent = BarVerticalComponent;


/***/ },

/***/ "./src/bar-chart/bar.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var BarComponent = (function () {
    function BarComponent(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    BarComponent.prototype.update = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + id_1.id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.animateToCurrentForm();
    };
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(750)
            .attr('d', path);
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }];
    };
    BarComponent.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
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
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    BarComponent.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
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
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarComponent.prototype, "roundEdges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], BarComponent.prototype, "isActive", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BarComponent.prototype, "stops", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BarComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BarComponent.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], BarComponent.prototype, "onMouseLeave", null);
    BarComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-bar]',
            template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [class.active]=\"isActive\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], BarComponent);
    return BarComponent;
}());
exports.BarComponent = BarComponent;


/***/ },

/***/ "./src/bar-chart/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/bar-chart/bar-chart.module.ts"));
__export(__webpack_require__("./src/bar-chart/bar.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-horizontal.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-horizontal-2d.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-horizontal-normalized.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-horizontal-stacked.component.ts"));
__export(__webpack_require__("./src/bar-chart/series-horizontal.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-vertical.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-vertical-2d.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-vertical-normalized.component.ts"));
__export(__webpack_require__("./src/bar-chart/bar-vertical-stacked.component.ts"));
__export(__webpack_require__("./src/bar-chart/series-vertical.component.ts"));


/***/ },

/***/ "./src/bar-chart/series-horizontal.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var SeriesHorizontal = (function () {
    function SeriesHorizontal() {
        this.type = 'standard';
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    SeriesHorizontal.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesHorizontal.prototype.update = function () {
        var _this = this;
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = label_helper_1.formatLabel(label);
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                formattedLabel: formattedLabel
            };
            bar.height = _this.yScale.bandwidth();
            if (_this.type === 'standard') {
                bar.width = Math.abs(_this.xScale(value) - _this.xScale(0));
                if (value < 0) {
                    bar.x = _this.xScale(value);
                }
                else {
                    bar.x = _this.xScale(0);
                }
                bar.y = _this.yScale(label);
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.width = _this.xScale(offset1) - _this.xScale(offset0);
                bar.x = _this.xScale(offset0);
                bar.y = 0;
                bar.offset0 = offset0;
                bar.offset1 = offset1;
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
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            bar.tooltipText = "\n        <span class=\"tooltip-label\">" + formattedLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
    };
    SeriesHorizontal.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesHorizontal.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    SeriesHorizontal.prototype.click = function (data) {
        this.select.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeriesHorizontal.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SeriesHorizontal.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesHorizontal.prototype, "deactivate", void 0);
    SeriesHorizontal = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-series-horizontal]',
            template: "\n    <svg:g ngx-charts-bar \n      *ngFor=\"let bar of bars; trackBy:trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'horizontal'\"\n      [roundEdges]=\"bar.roundEdges\"\n      (select)=\"click($event)\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"bar.tooltipText\">\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesHorizontal);
    return SeriesHorizontal;
}());
exports.SeriesHorizontal = SeriesHorizontal;


/***/ },

/***/ "./src/bar-chart/series-vertical.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var SeriesVerticalComponent = (function () {
    function SeriesVerticalComponent() {
        this.type = 'standard';
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    SeriesVerticalComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    SeriesVerticalComponent.prototype.update = function () {
        var _this = this;
        var width;
        if (this.series.length) {
            width = this.xScale.bandwidth();
        }
        var d0 = 0;
        var total;
        if (this.type === 'normalized') {
            total = this.series.map(function (d) { return d.value; }).reduce(function (sum, d) { return sum + d; }, 0);
        }
        this.bars = this.series.map(function (d, index) {
            var value = d.value;
            var label = d.name;
            var formattedLabel = label_helper_1.formatLabel(label);
            var roundEdges = _this.type === 'standard';
            var bar = {
                value: value,
                label: label,
                roundEdges: roundEdges,
                data: d,
                width: width,
                formattedLabel: formattedLabel,
                height: 0,
                x: 0,
                y: 0
            };
            if (_this.type === 'standard') {
                bar.height = Math.abs(_this.yScale(value) - _this.yScale(0));
                bar.x = _this.xScale(label);
                if (value < 0) {
                    bar.y = _this.yScale(0);
                }
                else {
                    bar.y = _this.yScale(value);
                }
            }
            else if (_this.type === 'stacked') {
                var offset0 = d0;
                var offset1 = offset0 + value;
                d0 += value;
                bar.height = _this.yScale(offset0) - _this.yScale(offset1);
                bar.x = 0;
                bar.y = _this.yScale(offset1);
                bar.offset0 = offset0;
                bar.offset1 = offset1;
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
                bar.offset0 = offset0;
                bar.offset1 = offset1;
                value = (offset1 - offset0).toFixed(2) + '%';
            }
            if (_this.colors.scaleType === 'ordinal') {
                bar.color = _this.colors.getColor(label);
            }
            else {
                if (_this.type === 'standard') {
                    bar.color = _this.colors.getColor(value);
                    bar.gradientStops = _this.colors.getLinearGradientStops(value);
                }
                else {
                    bar.color = _this.colors.getColor(bar.offset1);
                    bar.gradientStops = _this.colors.getLinearGradientStops(bar.offset1, bar.offset0);
                }
            }
            bar.tooltipText = "\n        <span class=\"tooltip-label\">" + formattedLabel + "</span>\n        <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n      ";
            return bar;
        });
    };
    SeriesVerticalComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    SeriesVerticalComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    SeriesVerticalComponent.prototype.trackBy = function (index, bar) {
        return bar.label;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], SeriesVerticalComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SeriesVerticalComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], SeriesVerticalComponent.prototype, "deactivate", void 0);
    SeriesVerticalComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-series-vertical]',
            template: "\n    <svg:g ngx-charts-bar *ngFor=\"let bar of bars; trackBy: trackBy\"\n      [@animationState]=\"'active'\"\n      [width]=\"bar.width\"\n      [height]=\"bar.height\"\n      [x]=\"bar.x\"\n      [y]=\"bar.y\"\n      [fill]=\"bar.color\"\n      [stops]=\"bar.gradientStops\"\n      [data]=\"bar.data\"\n      [orientation]=\"'vertical'\"\n      [roundEdges]=\"bar.roundEdges\"\n      [gradient]=\"gradient\"\n      [isActive]=\"isActive(bar.data)\"\n      (select)=\"onClick($event)\"\n      (activate)=\"activate.emit($event)\"\n      (deactivate)=\"deactivate.emit($event)\"\n      ngx-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"bar.tooltipText\">\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('* => void', [
                        core_1.style({
                            opacity: 1,
                            transform: '*',
                        }),
                        core_1.animate(500, core_1.style({ opacity: 0, transform: 'scale(0)' }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], SeriesVerticalComponent);
    return SeriesVerticalComponent;
}());
exports.SeriesVerticalComponent = SeriesVerticalComponent;


/***/ },

/***/ "./src/common/area-tooltip.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var AreaTooltip = (function () {
    function AreaTooltip(renderer) {
        this.renderer = renderer;
        this.anchorOpacity = new Array();
        this.showPercentage = false;
        this.hover = new core_1.EventEmitter();
    }
    AreaTooltip.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AreaTooltip.prototype.update = function () {
        this.tooltipAreas = this.getTooltipAreas();
    };
    AreaTooltip.prototype.getTooltipAreas = function () {
        var _this = this;
        var uniqueSet = this.getUniqueValues(this.xSet);
        uniqueSet = uniqueSet.sort(function (a, b) {
            return _this.xScale(a) - _this.xScale(b);
        });
        var results = [];
        for (var i = 0; i < uniqueSet.length; i++) {
            var val = uniqueSet[i];
            var ob = {};
            ob.tooltipAnchor = this.xScale(val);
            if (i === 0) {
                ob.x0 = this.xScale(val);
            }
            else {
                ob.x0 = (this.xScale(uniqueSet[i - 1]) + this.xScale(uniqueSet[i])) / 2;
            }
            if (i === uniqueSet.length - 1) {
                ob.x1 = this.xScale(uniqueSet[i]);
            }
            else {
                ob.x1 = (this.xScale(uniqueSet[i]) + this.xScale(uniqueSet[i + 1])) / 2;
            }
            ob.width = ob.x1 - ob.x0;
            ob.value = val;
            ob.values = this.getValues(val);
            results.push(ob);
            this.anchorOpacity[i] = 0;
        }
        return results;
    };
    AreaTooltip.prototype.getValues = function (xVal) {
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
                    color: color
                });
            }
        }
        return results;
    };
    AreaTooltip.prototype.getUniqueValues = function (array) {
        var results = [];
        var _loop_1 = function(i) {
            var val = array[i];
            var exists = results.find(function (v) {
                return v.toString() === val.toString();
            });
            if (!exists) {
                results.push(val);
            }
        };
        for (var i = 0; i < array.length; i++) {
            _loop_1(i);
        }
        return results;
    };
    AreaTooltip.prototype.showTooltip = function (index) {
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
        var event = new MouseEvent('mouseenter', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0.7;
        this.hover.emit(this.tooltipAreas[index]);
    };
    AreaTooltip.prototype.hideTooltip = function (index) {
        var tooltipAnchor = this.tooltips.toArray()[index].nativeElement.children[1];
        var event = new MouseEvent('mouseleave', { bubbles: false });
        this.renderer.invokeElementMethod(tooltipAnchor, 'dispatchEvent', [event]);
        this.anchorOpacity[index] = 0;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "xSet", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaTooltip.prototype, "showPercentage", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "hover", void 0);
    __decorate([
        core_1.ViewChildren('tooltips'), 
        __metadata('design:type', Object)
    ], AreaTooltip.prototype, "tooltips", void 0);
    AreaTooltip = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-area-tooltip]',
            template: "\n    <svg:g\n      #tooltips\n      *ngFor=\"let tooltipArea of tooltipAreas; let i = index\">\n      <svg:rect\n        class=\"tooltip-area\"\n        [attr.x]=\"tooltipArea.x0\"\n        y=\"0\"\n        [attr.width]=\"tooltipArea.width\"\n        [attr.height]=\"height\"\n        style=\"fill: rgb(255, 0, 0); opacity: 0; cursor: 'auto';\"\n        (mouseenter)=\"showTooltip(i)\"\n        (mouseleave)=\"hideTooltip(i)\"\n      />\n      <xhtml:template #tooltipTemplate>\n        <xhtml:div class=\"area-tooltip-container\">\n          <xhtml:div\n            *ngFor=\"let tooltipItem of tooltipArea.values\"\n            class=\"tooltip-item\">\n            <span\n              class=\"tooltip-item-color\"\n              [style.background-color]=\"tooltipItem.color\">\n            </span>\n            {{tooltipItem.series}}: {{tooltipItem.value.toLocaleString()}}\n          </xhtml:div>\n        </xhtml:div>\n      </xhtml:template>\n      <svg:rect\n        class=\"tooltip-anchor\"\n        [attr.x]=\"tooltipArea.tooltipAnchor\"\n        y=\"0\"\n        [attr.width]=\"1\"\n        [attr.height]=\"height\"\n        style=\"fill: rgb(255, 255, 255);\"\n        [style.opacity]=\"anchorOpacity[i]\"\n        [style.pointer-events]=\"'none'\"\n        ngx-tooltip\n        [tooltipPlacement]=\"'right'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipSpacing]=\"5\"\n        [tooltipTemplate]=\"tooltipTemplate\"\n      />\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.Renderer])
    ], AreaTooltip);
    return AreaTooltip;
}());
exports.AreaTooltip = AreaTooltip;


/***/ },

/***/ "./src/common/area.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var AreaComponent = (function () {
    function AreaComponent(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.select = new core_1.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + id_1.id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.animateToCurrentForm();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }];
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "startingPath", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "opacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "endOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "activeLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AreaComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AreaComponent.prototype, "stops", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], AreaComponent.prototype, "select", void 0);
    AreaComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AreaComponent);
    return AreaComponent;
}());
exports.AreaComponent = AreaComponent;


/***/ },

/***/ "./src/common/axes/axes.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var axis_label_component_1 = __webpack_require__("./src/common/axes/axis-label.component.ts");
var x_axis_component_1 = __webpack_require__("./src/common/axes/x-axis.component.ts");
var x_axis_ticks_component_1 = __webpack_require__("./src/common/axes/x-axis-ticks.component.ts");
var y_axis_component_1 = __webpack_require__("./src/common/axes/y-axis.component.ts");
var y_axis_ticks_component_1 = __webpack_require__("./src/common/axes/y-axis-ticks.component.ts");
var common_1 = __webpack_require__(2);
var AxesModule = (function () {
    function AxesModule() {
    }
    AxesModule = __decorate([
        core_1.NgModule({
            imports: [common_1.CommonModule],
            declarations: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent],
            exports: [axis_label_component_1.AxisLabelComponent, x_axis_component_1.XAxisComponent, x_axis_ticks_component_1.XAxisTicksComponent, y_axis_component_1.YAxisComponent, y_axis_ticks_component_1.YAxisTicksComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AxesModule);
    return AxesModule;
}());
exports.AxesModule = AxesModule;


/***/ },

/***/ "./src/common/axes/axis-label.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var AxisLabelComponent = (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
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
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = "rotate(270)";
                break;
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabelComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabelComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabelComponent.prototype, "offset", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabelComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AxisLabelComponent.prototype, "height", void 0);
    AxisLabelComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-axis-label]',
            template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], AxisLabelComponent);
    return AxisLabelComponent;
}());
exports.AxisLabelComponent = AxisLabelComponent;


/***/ },

/***/ "./src/common/axes/ticks.helper.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
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
exports.reduceTicks = reduceTicks;


/***/ },

/***/ "./src/common/axes/x-axis-ticks.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var ticks_helper_1 = __webpack_require__("./src/common/axes/ticks.helper.ts");
var XAxisTicksComponent = (function () {
    function XAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.verticalSpacing = 20;
        this.rotateLabels = false;
        this.innerTickSize = 6;
        this.outerTickSize = 6;
        this.tickPadding = 3;
        this.textAnchor = 'middle';
        this.maxTicksLength = 0;
        this.maxAllowedLength = 16;
        this.height = 0;
        this.trimLabel = trim_label_helper_1.trimLabel;
    }
    XAxisTicksComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisTicksComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.updateDims = function () {
        var _this = this;
        var height = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().height, 10);
        if (height !== this.height) {
            this.height = height;
            this.dimensionsChanged.emit({ height: height });
            setTimeout(function () { return _this.updateDims(); });
        }
    };
    XAxisTicksComponent.prototype.update = function () {
        var _this = this;
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
                if (d.constructor.name === 'Date') {
                    return d.toLocaleDateString();
                }
                return d.toLocaleString();
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
        else {
            this.textAnchor = 'middle';
        }
        setTimeout(function () { return _this.updateDims(); });
    };
    XAxisTicksComponent.prototype.getRotationAngle = function (ticks) {
        var angle = 0;
        for (var i = 0; i < ticks.length; i++) {
            var tick = ticks[i].toString();
            if (tick.length > this.maxTicksLength) {
                this.maxTicksLength = tick.length;
            }
        }
        var len = Math.min(this.maxTicksLength, this.maxAllowedLength);
        var charWidth = 8; // need to measure this
        var wordWidth = len * charWidth;
        var baseWidth = wordWidth;
        var maxBaseWidth = Math.floor(this.width / ticks.length);
        // calculate optimal angle
        while (baseWidth > maxBaseWidth && angle > -90) {
            angle -= 30;
            baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
        }
        return angle;
    };
    XAxisTicksComponent.prototype.getTicks = function () {
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
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    XAxisTicksComponent.prototype.getMaxTicks = function () {
        var tickWidth = 20;
        return Math.floor(this.width / tickWidth);
    };
    XAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    XAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(0," + (-this.verticalSpacing - 5) + ")";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "tickArguments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "gridLineHeight", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "width", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], XAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        core_1.ViewChild('ticksel'), 
        __metadata('design:type', core_1.ElementRef)
    ], XAxisTicksComponent.prototype, "ticksElement", void 0);
    XAxisTicksComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-x-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"tickTransform(tick)\">\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.text-anchor]=\"textAnchor\"\n          [attr.transform]=\"textTransform\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"tickTransform(tick)\">\n      <svg:g *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          class=\"gridline-path gridline-path-vertical\"\n          [attr.y1]=\"-gridLineHeight\"\n          y2=\"0\" />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], XAxisTicksComponent);
    return XAxisTicksComponent;
}());
exports.XAxisTicksComponent = XAxisTicksComponent;


/***/ },

/***/ "./src/common/axes/x-axis.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var x_axis_ticks_component_1 = __webpack_require__("./src/common/axes/x-axis-ticks.component.ts");
var XAxisComponent = (function () {
    function XAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.xAxisClassName = 'x axis';
        this.xOrient = 'bottom';
        this.labelOffset = 80;
        this.fill = 'none';
        this.stroke = 'stroke';
        this.tickStroke = '#ccc';
        this.strokeWidth = 'none';
        this.xAxisOffset = 5;
    }
    XAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    XAxisComponent.prototype.update = function () {
        this.transform = "translate(0," + (this.xAxisOffset + this.dims.height) + ")";
        if (typeof this.xAxisTickCount !== 'undefined') {
            this.tickArguments = [this.xAxisTickCount];
        }
    };
    XAxisComponent.prototype.emitTicksHeight = function (_a) {
        var _this = this;
        var height = _a.height;
        var newLabelOffset = height + 25 + 5;
        if (newLabelOffset !== this.labelOffset) {
            this.labelOffset = newLabelOffset;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ height: height });
            }, 0);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "xAxisTickInterval", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], XAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        core_1.ViewChild(x_axis_ticks_component_1.XAxisTicksComponent), 
        __metadata('design:type', x_axis_ticks_component_1.XAxisTicksComponent)
    ], XAxisComponent.prototype, "ticksComponent", void 0);
    XAxisComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-x-axis]',
            template: "\n    <svg:g\n      [attr.class]=\"xAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-x-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"xScale\"\n        [orient]=\"xOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineHeight]=\"dims.height\"\n        [width]=\"dims.width\"\n        (dimensionsChanged)=\"emitTicksHeight($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"'bottom'\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], XAxisComponent);
    return XAxisComponent;
}());
exports.XAxisComponent = XAxisComponent;


/***/ },

/***/ "./src/common/axes/y-axis-ticks.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var ticks_helper_1 = __webpack_require__("./src/common/axes/ticks.helper.ts");
var YAxisTicksComponent = (function () {
    function YAxisTicksComponent() {
        this.tickArguments = [5];
        this.tickStroke = '#ccc';
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.innerTickSize = 6;
        this.tickPadding = 3;
        this.verticalSpacing = 20;
        this.textAnchor = 'middle';
        this.width = 0;
        this.outerTickSize = 6;
        this.rotateLabels = false;
        this.trimLabel = trim_label_helper_1.trimLabel;
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
        setTimeout(function () { return _this.updateDims(); });
    };
    YAxisTicksComponent.prototype.getTicks = function () {
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
            ticks = ticks_helper_1.reduceTicks(ticks, maxTicks);
        }
        return ticks;
    };
    YAxisTicksComponent.prototype.getMaxTicks = function () {
        var tickHeight = 20;
        return Math.floor(this.height / tickHeight);
    };
    YAxisTicksComponent.prototype.tickTransform = function (tick) {
        return 'translate(' + this.adjustedScale(tick) + ',' + this.verticalSpacing + ')';
    };
    YAxisTicksComponent.prototype.gridLineTransform = function () {
        return "translate(5,0)";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "scale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "orient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "tickArguments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "tickValues", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "tickStroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "gridLineWidth", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "height", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YAxisTicksComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        core_1.ViewChild('ticksel'), 
        __metadata('design:type', core_1.ElementRef)
    ], YAxisTicksComponent.prototype, "ticksElement", void 0);
    YAxisTicksComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-y-axis-ticks]',
            template: "\n    <svg:g #ticksel>\n      <svg:g *ngFor=\"let tick of ticks\" class=\"tick\"\n        [attr.transform]=\"transform(tick)\" >\n        <title>{{tickFormat(tick)}}</title>\n        <svg:text\n          stroke-width=\"0.01\"\n          [attr.dy]=\"dy\"\n          [attr.x]=\"x1\"\n          [attr.y]=\"y1\"\n          [attr.text-anchor]=\"textAnchor\"\n          [style.font-size]=\"'12px'\">\n          {{trimLabel(tickFormat(tick))}}\n        </svg:text>\n      </svg:g>\n    </svg:g>\n    <svg:g *ngFor=\"let tick of ticks\"\n      [attr.transform]=\"transform(tick)\">\n      <svg:g\n        *ngIf=\"showGridLines\"\n        [attr.transform]=\"gridLineTransform()\">\n        <svg:line\n          class=\"gridline-path gridline-path-horizontal\"\n          x1=\"0\"\n          [attr.x2]=\"gridLineWidth\" />\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], YAxisTicksComponent);
    return YAxisTicksComponent;
}());
exports.YAxisTicksComponent = YAxisTicksComponent;


/***/ },

/***/ "./src/common/axes/y-axis.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var y_axis_ticks_component_1 = __webpack_require__("./src/common/axes/y-axis-ticks.component.ts");
var YAxisComponent = (function () {
    function YAxisComponent() {
        this.showGridLines = false;
        this.dimensionsChanged = new core_1.EventEmitter();
        this.yAxisClassName = 'y axis';
        this.yAxisOffset = -5;
        this.yOrient = 'left';
        this.labelOffset = 80;
        this.fill = 'none';
        this.stroke = '#CCC';
        this.tickStroke = '#CCC';
        this.strokeWidth = 1;
    }
    YAxisComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    YAxisComponent.prototype.update = function () {
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
    };
    YAxisComponent.prototype.emitTicksWidth = function (_a) {
        var _this = this;
        var width = _a.width;
        if (width !== this.labelOffset) {
            this.labelOffset = width;
            setTimeout(function () {
                _this.dimensionsChanged.emit({ width: width });
            }, 0);
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "tickFormatting", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "showLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "labelText", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "yAxisTickInterval", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], YAxisComponent.prototype, "dimensionsChanged", void 0);
    __decorate([
        core_1.ViewChild(y_axis_ticks_component_1.YAxisTicksComponent), 
        __metadata('design:type', y_axis_ticks_component_1.YAxisTicksComponent)
    ], YAxisComponent.prototype, "ticksComponent", void 0);
    YAxisComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-y-axis]',
            template: "\n    <svg:g\n      [attr.class]=\"yAxisClassName\"\n      [attr.transform]=\"transform\">\n      <svg:g ngx-charts-y-axis-ticks\n        [tickFormatting]=\"tickFormatting\"\n        [tickArguments]=\"tickArguments\"\n        [tickStroke]=\"tickStroke\"\n        [scale]=\"yScale\"\n        [orient]=\"yOrient\"\n        [showGridLines]=\"showGridLines\"\n        [gridLineWidth]=\"dims.width\"\n        [height]=\"dims.height\"\n        (dimensionsChanged)=\"emitTicksWidth($event)\"\n      />\n\n      <svg:g ngx-charts-axis-label\n        *ngIf=\"showLabel\"\n        [label]=\"labelText\"\n        [offset]=\"labelOffset\"\n        [orient]=\"yOrient\"\n        [height]=\"dims.height\"\n        [width]=\"dims.width\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], YAxisComponent);
    return YAxisComponent;
}());
exports.YAxisComponent = YAxisComponent;


/***/ },

/***/ "./src/common/base-chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var Rx_1 = __webpack_require__(14);
var BaseChartComponent = (function () {
    function BaseChartComponent(chartElement, zone, cd) {
        this.chartElement = chartElement;
        this.zone = zone;
        this.cd = cd;
        this.schemeType = 'ordinal';
        this.select = new core_1.EventEmitter();
    }
    BaseChartComponent.prototype.ngAfterViewInit = function () {
        this.bindWindowResizeEvent();
    };
    BaseChartComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    BaseChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    BaseChartComponent.prototype.unbindEvents = function () {
        if (this.resizeSubscription) {
            this.resizeSubscription.unsubscribe();
        }
    };
    BaseChartComponent.prototype.update = function () {
        if (this.results) {
            this.results = this.cloneData(this.results);
        }
        if (this.view) {
            this.width = this.view[0];
            this.height = this.view[1];
        }
        else {
            var dims = this.getContainerDims();
            this.width = dims.width;
            this.height = dims.height;
        }
        if (this.cd) {
            this.cd.markForCheck();
        }
    };
    BaseChartComponent.prototype.getContainerDims = function () {
        var width = 0;
        var height = 0;
        var hostElem = this.chartElement.nativeElement;
        if (hostElem.parentNode != null) {
            //Get the container dimensions
            width = hostElem.parentNode.clientWidth;
            height = hostElem.parentNode.clientHeight;
        }
        return { width: width, height: height };
    };
    BaseChartComponent.prototype.bindWindowResizeEvent = function () {
        var _this = this;
        this.zone.run(function () {
            var source = Rx_1.Observable.fromEvent(window, 'resize', null, null);
            var subscription = source.debounceTime(200).subscribe(function (e) {
                _this.update();
                if (_this.cd) {
                    _this.cd.markForCheck();
                }
            });
            _this.resizeSubscription = subscription;
        });
    };
    /**
     * Clones the data into a new object
     *
     * @private
     * @param {any} data
     * @returns {*}
     *
     * @memberOf BaseChart
     */
    BaseChartComponent.prototype.cloneData = function (data) {
        var results = [];
        for (var _i = 0, data_1 = data; _i < data_1.length; _i++) {
            var item = data_1[_i];
            var copy = {
                name: item['name']
            };
            if (item['value'] !== undefined) {
                copy['value'] = item['value'];
            }
            if (item['series'] !== undefined) {
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
    // converts all date objects that appear as name into formatted date strings
    BaseChartComponent.prototype.formatDates = function () {
        for (var i = 0; i < this.results.length; i++) {
            var g = this.results[i];
            if (g.name instanceof Date) {
                g.name = g.name.toLocaleDateString();
            }
            if (g.series) {
                for (var j = 0; j < g.series.length; j++) {
                    var d = g.series[j];
                    if (d.name instanceof Date) {
                        d.name = d.name.toLocaleDateString();
                    }
                }
            }
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaseChartComponent.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], BaseChartComponent.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaseChartComponent.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], BaseChartComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], BaseChartComponent.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], BaseChartComponent.prototype, "select", void 0);
    BaseChartComponent = __decorate([
        core_1.Component({
            selector: 'base-chart',
            template: ""
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone, core_1.ChangeDetectorRef])
    ], BaseChartComponent);
    return BaseChartComponent;
}());
exports.BaseChartComponent = BaseChartComponent;


/***/ },

/***/ "./src/common/chart-common.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_component_1 = __webpack_require__("./src/common/charts/chart.component.ts");
var legend_1 = __webpack_require__("./src/common/legend/index.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var axes_module_1 = __webpack_require__("./src/common/axes/axes.module.ts");
var tooltip_1 = __webpack_require__("./src/common/tooltip/index.ts");
var circle_series_component_1 = __webpack_require__("./src/common/circle-series.component.ts");
var circle_component_1 = __webpack_require__("./src/common/circle.component.ts");
var grid_panel_component_1 = __webpack_require__("./src/common/grid-panel.component.ts");
var grid_panel_series_component_1 = __webpack_require__("./src/common/grid-panel-series.component.ts");
var svg_linear_gradient_component_1 = __webpack_require__("./src/common/svg-linear-gradient.component.ts");
var svg_radial_gradient_component_1 = __webpack_require__("./src/common/svg-radial-gradient.component.ts");
var timeline_component_1 = __webpack_require__("./src/common/timeline.component.ts");
var common_1 = __webpack_require__(2);
var area_component_1 = __webpack_require__("./src/common/area.component.ts");
var area_tooltip_component_1 = __webpack_require__("./src/common/area-tooltip.component.ts");
var count_1 = __webpack_require__("./src/common/count/index.ts");
var COMPONENTS = [
    area_component_1.AreaComponent,
    base_chart_component_1.BaseChartComponent,
    count_1.CountUpDirective,
    area_tooltip_component_1.AreaTooltip,
    chart_component_1.ChartComponent,
    legend_1.LegendComponent,
    legend_1.LegendEntryComponent,
    legend_1.ScaleLegendComponent,
    circle_component_1.CircleComponent,
    circle_series_component_1.CircleSeriesComponent,
    grid_panel_component_1.GridPanelComponent,
    grid_panel_series_component_1.GridPanelSeriesComponent,
    svg_linear_gradient_component_1.SvgLinearGradientComponent,
    svg_radial_gradient_component_1.SvgRadialGradientComponent,
    timeline_component_1.Timeline,
    legend_1.AdvancedLegendComponent
];
var ChartCommonModule = (function () {
    function ChartCommonModule() {
    }
    ChartCommonModule = __decorate([
        core_1.NgModule({
            imports: [
                common_1.CommonModule,
                axes_module_1.AxesModule,
                tooltip_1.TooltipModule
            ],
            declarations: COMPONENTS.slice(),
            exports: [
                common_1.CommonModule,
                axes_module_1.AxesModule,
                tooltip_1.TooltipModule
            ].concat(COMPONENTS)
        }), 
        __metadata('design:paramtypes', [])
    ], ChartCommonModule);
    return ChartCommonModule;
}());
exports.ChartCommonModule = ChartCommonModule;


/***/ },

/***/ "./src/common/charts/chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__("./src/services/index.ts");
var ChartComponent = (function () {
    function ChartComponent(vcr, injectionService) {
        this.vcr = vcr;
        this.injectionService = injectionService;
        this.showLegend = false;
        this.legendTitle = 'Legend';
        this.legendLabelClick = new core_1.EventEmitter();
        this.legendLabelActivate = new core_1.EventEmitter();
        this.legendLabelDeactivate = new core_1.EventEmitter();
        this.injectionService.setRootViewContainer(vcr);
    }
    ChartComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    ChartComponent.prototype.update = function () {
        var legendColumns = 0;
        if (this.showLegend) {
            this.legendType = this.getLegendType();
            if (this.legendType === 'scaleLegend') {
                legendColumns = 1;
            }
            else {
                legendColumns = 2;
            }
        }
        var chartColumns = 12 - legendColumns;
        this.chartWidth = this.view[0] * chartColumns / 12.0;
        this.legendWidth = this.view[0] * legendColumns / 12.0;
    };
    ChartComponent.prototype.getLegendType = function () {
        if (this.legendOptions.scaleType === 'linear') {
            return 'scaleLegend';
        }
        else {
            return 'legend';
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "showLegend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "legendOptions", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "legendData", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "legendType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "legendTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ChartComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ChartComponent.prototype, "legendLabelClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ChartComponent.prototype, "legendLabelActivate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ChartComponent.prototype, "legendLabelDeactivate", void 0);
    ChartComponent = __decorate([
        core_1.Component({
            providers: [services_1.InjectionService],
            selector: 'ngx-charts-chart',
            template: "\n    <div \n      [style.width.px]=\"view[0]\"\n      [@animationState]=\"'active'\">\n      <svg\n        class=\"ngx-charts\"\n        [attr.width]=\"chartWidth\"\n        [attr.height]=\"view[1]\">\n        <ng-content></ng-content>\n      </svg>\n      <ngx-charts-scale-legend\n        *ngIf=\"showLegend && legendType === 'scaleLegend'\"\n        class=\"chart-legend\"\n        [valueRange]=\"legendOptions.domain\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\">\n      </ngx-charts-scale-legend>\n      <ngx-charts-legend\n        *ngIf=\"showLegend && legendType === 'legend'\"\n        class=\"chart-legend\"\n        [data]=\"legendOptions.domain\"\n        [title]=\"legendTitle\"\n        [colors]=\"legendOptions.colors\"\n        [height]=\"view[1]\"\n        [width]=\"legendWidth\"\n        [activeEntries]=\"activeEntries\"\n        (labelClick)=\"legendLabelClick.emit($event)\"\n        (labelActivate)=\"legendLabelActivate.emit($event)\"\n        (labelDeactivate)=\"legendLabelDeactivate.emit($event)\">\n      </ngx-charts-legend>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('void => *', [
                        core_1.style({ opacity: 0 }),
                        core_1.animate('500ms 100ms', core_1.style({ opacity: 1 }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ViewContainerRef, services_1.InjectionService])
    ], ChartComponent);
    return ChartComponent;
}());
exports.ChartComponent = ChartComponent;


/***/ },

/***/ "./src/common/circle-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var moment = __webpack_require__(1);
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var CircleSeriesComponent = (function () {
    function CircleSeriesComponent() {
        this.type = 'standard';
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    CircleSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CircleSeriesComponent.prototype.update = function () {
        this.circles = this.getCircles();
    };
    CircleSeriesComponent.prototype.getCircles = function () {
        var _this = this;
        var seriesName = this.data.name;
        var pageUrl = window.location.href;
        return this.data.series.map(function (d, i) {
            var value = d.value;
            var label = d.name;
            var tooltipLabel = label_helper_1.formatLabel(label);
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
                var opacity = 0;
                if (label && _this.visibleValue && label.toString() === _this.visibleValue.toString()) {
                    opacity = 1;
                }
                var gradientId = 'grad' + id_1.id().toString();
                var gradientFill = "url(" + pageUrl + "#" + gradientId + ")";
                var color = void 0;
                if (_this.colors.scaleType === 'linear') {
                    if (_this.type === 'standard') {
                        color = _this.colors.getColor(value);
                    }
                    else {
                        color = _this.colors.getColor(d.d1);
                    }
                }
                else {
                    color = _this.colors.getColor(seriesName);
                }
                return {
                    classNames: [("circle-data-" + i)],
                    value: value,
                    label: label,
                    cx: cx,
                    cy: cy,
                    radius: radius,
                    height: height,
                    tooltipLabel: tooltipLabel,
                    color: color,
                    opacity: opacity,
                    seriesName: seriesName,
                    barVisible: false,
                    gradientId: gradientId,
                    gradientFill: gradientFill,
                    gradientStops: _this.getGradientStops(color)
                };
            }
        }).filter(function (circle) { return circle !== undefined; });
    };
    CircleSeriesComponent.prototype.getTooltipText = function (_a) {
        var tooltipLabel = _a.tooltipLabel, value = _a.value, seriesName = _a.seriesName;
        return "\n      <span class=\"tooltip-label\">" + seriesName + " \u2022 " + tooltipLabel + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    CircleSeriesComponent.prototype.getGradientStops = function (color) {
        return [
            {
                offset: 0,
                color: color,
                opacity: 0.2
            },
            {
                offset: 100,
                color: color,
                opacity: 1
            }];
    };
    CircleSeriesComponent.prototype.onClick = function (value, label) {
        this.select.emit({
            name: label,
            value: value
        });
    };
    CircleSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    CircleSeriesComponent.prototype.isVisible = function (circle) {
        if (this.activeEntries.length > 0) {
            return this.isActive({ name: circle.seriesName });
        }
        return circle.opacity !== 0;
    };
    CircleSeriesComponent.prototype.activateCircle = function (circle) {
        circle.barVisible = true;
        this.activate.emit({ name: this.data.name });
    };
    CircleSeriesComponent.prototype.deactivateCircle = function (circle) {
        circle.barVisible = false;
        this.deactivate.emit({ name: this.data.name });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "visibleValue", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], CircleSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleSeriesComponent.prototype, "deactivate", void 0);
    CircleSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-circle-ceries]',
            template: "\n    <svg:g *ngFor=\"let circle of circles\">\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient\n          [color]=\"color\"\n          orientation=\"vertical\"\n          [name]=\"circle.gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        *ngIf=\"circle.barVisible && type === 'standard'\"\n        [attr.x]=\"circle.cx - circle.radius\"\n        [attr.y]=\"circle.cy\"\n        [attr.width]=\"circle.radius * 2\"\n        [attr.height]=\"circle.height\"\n        [attr.fill]=\"circle.gradientFill\"\n        class=\"tooltip-bar\"\n      />\n      <svg:g ngx-charts-circle\n        *ngIf=\"isVisible(circle)\"\n        class=\"circle\"\n        [cx]=\"circle.cx\"\n        [cy]=\"circle.cy\"\n        [r]=\"circle.radius\"\n        [fill]=\"circle.color\"\n        [class.active]=\"isActive({name: circle.seriesName})\"\n        [pointerEvents]=\"circle.value === 0 ? 'none': 'all'\"\n        [data]=\"circle.value\"\n        [classNames]=\"circle.classNames\"\n        (select)=\"onClick($event, circle.label)\"\n        (activate)=\"activateCircle(circle)\"\n        (deactivate)=\"deactivateCircle(circle)\"\n        ngx-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"getTooltipText(circle)\"\n      />\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], CircleSeriesComponent);
    return CircleSeriesComponent;
}());
exports.CircleSeriesComponent = CircleSeriesComponent;


/***/ },

/***/ "./src/common/circle.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var CircleComponent = (function () {
    function CircleComponent() {
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    CircleComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    CircleComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    CircleComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    CircleComponent.prototype.ngOnChanges = function (changes) {
        this.classNames = this.classNames.join(' ') + 'circle';
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "cx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "cy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "r", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "classNames", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "circleOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "pointerEvents", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CircleComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CircleComponent.prototype, "onClick", null);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CircleComponent.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], CircleComponent.prototype, "onMouseLeave", null);
    CircleComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-circle]',
            template: "\n    <svg:circle\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      [attr.fill]=\"fill\"\n      [attr.stroke]=\"stroke\"\n      [attr.opacity]=\"circleOpacity\"\n      [attr.class]=\"classNames\"\n      [attr.pointer-events]=\"pointerEvents\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], CircleComponent);
    return CircleComponent;
}());
exports.CircleComponent = CircleComponent;


/***/ },

/***/ "./src/common/color.helper.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var d3_1 = __webpack_require__("./src/d3.ts");
var color_sets_1 = __webpack_require__("./src/utils/color-sets.ts");
var ColorHelper = (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof (scheme) === 'string') {
            scheme = color_sets_1.colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.scale = this.generateColorScheme(scheme, type, domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof (scheme) === 'string') {
            scheme = color_sets_1.colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = d3_1.default.scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = d3_1.default.scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            colorScale = d3_1.default.scaleLinear()
                .domain(d3_1.default.range(0, 1, 1.0 / (scheme.domain.length - 1)))
                .range(scheme.domain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (this.scaleType === 'linear') {
            var valueScale = d3_1.default.scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return (this.scale(valueScale(value)));
        }
        else {
            var formattedValue_1 = value.toString();
            var found = undefined; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        if (!start) {
            start = this.domain[0];
        }
        var valueScale = d3_1.default.scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = d3_1.default.scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 0;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: 0,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset >= endVal) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        stops.push({
            color: endColor,
            offset: endVal,
            opacity: 1
        });
        // normalize the offsets into percentages
        for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
            var s = stops_1[_i];
            s.offset = Math.floor(((s.offset - startVal) / (endVal - startVal)) * 100);
        }
        return stops;
    };
    return ColorHelper;
}());
exports.ColorHelper = ColorHelper;


/***/ },

/***/ "./src/common/count/count.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var count_helper_1 = __webpack_require__("./src/common/count/count.helper.ts");
/**
 * Count up component
 *
 * Loosely inspired by:
 *  - https://github.com/izupet/angular2-counto
 *  - https://inorganik.github.io/countUp.js/
 *
 * @export
 * @class CountUpDirective
 */
var CountUpDirective = (function () {
    function CountUpDirective(cd, zone, element) {
        this.cd = cd;
        this.zone = zone;
        this.countDuration = 1;
        this.countPrefix = '';
        this.countSuffix = '';
        this.countChange = new core_1.EventEmitter();
        this.countFinish = new core_1.EventEmitter();
        this.value = '';
        this._countDecimals = 0;
        this._countTo = 0;
        this._countFrom = 0;
        this.nativeElement = element.nativeElement;
    }
    Object.defineProperty(CountUpDirective.prototype, "countDecimals", {
        get: function () {
            if (this._countDecimals)
                return this._countDecimals;
            return count_helper_1.decimalChecker(this.countTo);
        },
        set: function (val) {
            this._countDecimals = val;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countTo", {
        get: function () {
            return this._countTo;
        },
        set: function (val) {
            this._countTo = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(CountUpDirective.prototype, "countFrom", {
        get: function () {
            return this._countFrom;
        },
        set: function (val) {
            this._countFrom = parseFloat(val);
            this.start();
        },
        enumerable: true,
        configurable: true
    });
    CountUpDirective.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CountUpDirective.prototype.start = function () {
        var _this = this;
        cancelAnimationFrame(this.animationReq);
        var callback = function (_a) {
            var value = _a.value, progress = _a.progress, finished = _a.finished;
            _this.zone.run(function () {
                _this.value = "" + _this.countPrefix + value.toLocaleString() + _this.countSuffix;
                _this.cd.markForCheck();
                if (!finished)
                    _this.countChange.emit({ value: value, progress: progress });
                if (finished)
                    _this.countFinish.emit({ value: value, progress: progress });
            });
        };
        this.animationReq = count_helper_1.count(this.countFrom, this.countTo, this.countDecimals, this.countDuration, callback);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], CountUpDirective.prototype, "countDuration", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CountUpDirective.prototype, "countPrefix", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], CountUpDirective.prototype, "countSuffix", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number), 
        __metadata('design:paramtypes', [Number])
    ], CountUpDirective.prototype, "countDecimals", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CountUpDirective.prototype, "countTo", null);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object), 
        __metadata('design:paramtypes', [Object])
    ], CountUpDirective.prototype, "countFrom", null);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CountUpDirective.prototype, "countChange", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CountUpDirective.prototype, "countFinish", void 0);
    CountUpDirective = __decorate([
        core_1.Component({
            selector: '[ngx-charts-count-up]',
            template: "{{value}}"
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.NgZone, core_1.ElementRef])
    ], CountUpDirective);
    return CountUpDirective;
}());
exports.CountUpDirective = CountUpDirective;


/***/ },

/***/ "./src/common/count/count.helper.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
// Robert Penner's easeOutExpo
function easeOutExpo(t, b, c, d) {
    return c * (-Math.pow(2, -10 * t / d) + 1) * 1024 / 1023 + b;
}
/**
 * Counts from a number to the end incrementally.
 *
 * @export
 * @param {any} countFrom
 * @param {any} countTo
 * @param {any} countDecimals
 * @param {any} countDuration
 * @param {any} callback
 * @returns
 */
function count(countFrom, countTo, countDecimals, countDuration, callback) {
    var startVal = Number(countFrom);
    var endVal = Number(countTo);
    var countDown = (startVal > endVal);
    var decimals = Math.max(0, countDecimals);
    var dec = Math.pow(10, decimals);
    var duration = Number(countDuration) * 1000;
    var startTime;
    function runCount(timestamp) {
        var frameVal;
        var progress = timestamp - startTime;
        if (countDown) {
            frameVal = startVal - easeOutExpo(progress, 0, startVal - endVal, duration);
        }
        else {
            frameVal = easeOutExpo(progress, startVal, endVal - startVal, duration);
        }
        if (countDown) {
            frameVal = (frameVal < endVal) ? endVal : frameVal;
        }
        else {
            frameVal = (frameVal > endVal) ? endVal : frameVal;
        }
        frameVal = Math.round(frameVal * dec) / dec;
        var tick = progress < duration;
        callback({
            value: frameVal,
            progress: progress,
            timestamp: timestamp,
            finished: !tick
        });
        if (tick) {
            return requestAnimationFrame(function (val) { return runCount(val); });
        }
    }
    return requestAnimationFrame(function (timestamp) {
        startTime = timestamp;
        return runCount(timestamp);
    });
}
exports.count = count;
/**
 * Determine decimals places
 *
 * @export
 * @param {any} countTo
 * @returns
 */
function decimalChecker(countTo) {
    var endVal = Number(countTo);
    if (endVal % 1 !== 0 && Math.abs(endVal) <= 10) {
        return 2;
    }
    return 0;
}
exports.decimalChecker = decimalChecker;


/***/ },

/***/ "./src/common/count/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/common/count/count.directive.ts"));
__export(__webpack_require__("./src/common/count/count.helper.ts"));


/***/ },

/***/ "./src/common/grid-layout.helper.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var d3_1 = __webpack_require__("./src/d3.ts");
function gridLayout(dims, data, minWidth) {
    var rows = 1;
    var xScale = d3_1.default.scaleBand();
    var yScale = d3_1.default.scaleBand();
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
exports.gridLayout = gridLayout;
function getTotal(results) {
    return results
        .map(function (d) { return d.value; })
        .reduce(function (sum, val) { return sum + val; }, 0);
}


/***/ },

/***/ "./src/common/grid-panel-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var GridPanelSeriesComponent = (function () {
    function GridPanelSeriesComponent() {
    }
    GridPanelSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    GridPanelSeriesComponent.prototype.update = function () {
        this.gridPanels = this.getGridPanels();
    };
    GridPanelSeriesComponent.prototype.getGridPanels = function () {
        var _this = this;
        return this.data.map(function (d, i) {
            var offset, width, height, x, y, className;
            className = 'odd';
            if (_this.orient === 'vertical') {
                var position = _this.xScale(d.name);
                var positionIndex = Number.parseInt((position / _this.xScale.step()).toString());
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.xScale.bandwidth() * _this.xScale.paddingInner();
                width = _this.xScale.bandwidth() + offset;
                height = _this.dims.height;
                x = _this.xScale(d.name) - offset / 2;
                y = 0;
            }
            else if (_this.orient === 'horizontal') {
                var position = _this.yScale(d.name);
                var positionIndex = Number.parseInt((position / _this.yScale.step()).toString());
                if (positionIndex % 2 === 1) {
                    className = 'even';
                }
                offset = _this.yScale.bandwidth() * _this.yScale.paddingInner();
                width = _this.dims.width;
                height = _this.yScale.bandwidth() + offset;
                x = 0;
                y = _this.yScale(d.name) - offset / 2;
            }
            return {
                name: d.name,
                class: className,
                height: height,
                width: width,
                x: x,
                y: y
            };
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeriesComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelSeriesComponent.prototype, "orient", void 0);
    GridPanelSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-grid-panel-series]',
            template: "\n    <svg:g ngx-charts-grid-panel *ngFor=\"let gridPanel of gridPanels\"\n      [height]=\"gridPanel.height\"\n      [width]=\"gridPanel.width\"\n      [x]=\"gridPanel.x\"\n      [y]=\"gridPanel.y\"\n      [class.grid-panel]=\"true\"\n      [class.odd]=\"gridPanel.class === 'odd'\"\n      [class.even]=\"gridPanel.class === 'even'\">\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanelSeriesComponent);
    return GridPanelSeriesComponent;
}());
exports.GridPanelSeriesComponent = GridPanelSeriesComponent;


/***/ },

/***/ "./src/common/grid-panel.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var GridPanelComponent = (function () {
    function GridPanelComponent() {
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GridPanelComponent.prototype, "y", void 0);
    GridPanelComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-grid-panel]',
            template: "\n    <svg:rect\n      [attr.height]=\"height\"\n      [attr.width]=\"width\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      stroke=\"none\"\n      class=\"gridpanel\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], GridPanelComponent);
    return GridPanelComponent;
}());
exports.GridPanelComponent = GridPanelComponent;


/***/ },

/***/ "./src/common/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/common/chart-common.module.ts"));
__export(__webpack_require__("./src/common/legend/index.ts"));
__export(__webpack_require__("./src/common/tooltip/index.ts"));
__export(__webpack_require__("./src/common/count/index.ts"));
__export(__webpack_require__("./src/common/color.helper.ts"));
__export(__webpack_require__("./src/common/area.component.ts"));
__export(__webpack_require__("./src/common/area-tooltip.component.ts"));
__export(__webpack_require__("./src/common/base-chart.component.ts"));
__export(__webpack_require__("./src/common/circle.component.ts"));
__export(__webpack_require__("./src/common/circle-series.component.ts"));
__export(__webpack_require__("./src/common/grid-layout.helper.ts"));
__export(__webpack_require__("./src/common/grid-panel.component.ts"));
__export(__webpack_require__("./src/common/grid-panel-series.component.ts"));
__export(__webpack_require__("./src/common/svg-linear-gradient.component.ts"));
__export(__webpack_require__("./src/common/svg-radial-gradient.component.ts"));
__export(__webpack_require__("./src/common/tick-format.helper.ts"));
__export(__webpack_require__("./src/common/timeline.component.ts"));
__export(__webpack_require__("./src/common/trim-label.helper.ts"));
__export(__webpack_require__("./src/common/view-dimensions.helper.ts"));
__export(__webpack_require__("./src/common/label.helper.ts"));


/***/ },

/***/ "./src/common/label.helper.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Formats a label given a date, number or string.
 *
 * @export
 * @param {*} label
 * @returns {string}
 */
function formatLabel(label) {
    if (label instanceof Date) {
        label = label.toLocaleDateString();
    }
    else {
        label = label.toLocaleString();
    }
    return label;
}
exports.formatLabel = formatLabel;


/***/ },

/***/ "./src/common/legend/advanced-legend.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var AdvancedLegendComponent = (function () {
    function AdvancedLegendComponent() {
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.legendItems = [];
        this.totalLabel = 'total';
    }
    AdvancedLegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AdvancedLegendComponent.prototype.getTotal = function () {
        return this.data
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    AdvancedLegendComponent.prototype.update = function () {
        this.total = this.getTotal();
        this.roundedTotal = this.total;
        this.legendItems = this.getLegendItems();
    };
    AdvancedLegendComponent.prototype.getLegendItems = function () {
        var _this = this;
        return this.data.map(function (d, index) {
            var label = label_helper_1.formatLabel(d.name);
            var value = d.value;
            var percentage = value / _this.total * 100;
            var color = _this.colors.getColor(label);
            return {
                value: value,
                color: color,
                label: trim_label_helper_1.trimLabel(label, 20),
                originalLabel: d.name,
                percentage: percentage
            };
        });
    };
    AdvancedLegendComponent.prototype.trackBy = function (item) {
        return item.formattedLabel;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], AdvancedLegendComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedLegendComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], AdvancedLegendComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdvancedLegendComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdvancedLegendComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdvancedLegendComponent.prototype, "deactivate", void 0);
    AdvancedLegendComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-advanced-legend',
            template: "\n    <div class=\"advanced-pie-legend\"\n      [style.width.px]=\"width\">\n      <div\n        class=\"total-value\"\n        ngx-charts-count-up\n        [countTo]=\"roundedTotal\">\n      </div>\n      <div class=\"total-label\">\n        {{totalLabel}}\n      </div>\n      <div class=\"legend-items-container\">\n        <div class=\"legend-items\">\n          <div\n            *ngFor=\"let legendItem of legendItems; trackBy:trackBy\"\n            tabindex=\"-1\"\n            class=\"legend-item\"\n            (mouseenter)=\"activate.emit(legendItem.label)\"\n            (mouseleave)=\"deactivate.emit(legendItem.label)\"\n            (click)=\"select.emit({ name: legendItem.label, value: legendItem.value })\">\n            <div\n              class=\"item-color\"\n              [style.background]=\"legendItem.color\">\n            </div>\n            <div\n              class=\"item-value\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.value\">\n            </div>\n            <div class=\"item-label\">{{legendItem.label}}</div>\n            <div\n              class=\"item-percent\"\n              ngx-charts-count-up\n              [countTo]=\"legendItem.percentage\"\n              [countSuffix]=\"'%'\">\n            </div>\n          </div>\n        </div>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AdvancedLegendComponent);
    return AdvancedLegendComponent;
}());
exports.AdvancedLegendComponent = AdvancedLegendComponent;


/***/ },

/***/ "./src/common/legend/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/common/legend/legend.component.ts"));
__export(__webpack_require__("./src/common/legend/scale-legend.component.ts"));
__export(__webpack_require__("./src/common/legend/legend-entry.component.ts"));
__export(__webpack_require__("./src/common/legend/advanced-legend.component.ts"));


/***/ },

/***/ "./src/common/legend/legend-entry.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var LegendEntryComponent = (function () {
    function LegendEntryComponent() {
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.toggle = new core_1.EventEmitter();
    }
    Object.defineProperty(LegendEntryComponent.prototype, "trimmedLabel", {
        get: function () {
            return this.formattedLabel || '(empty)';
        },
        enumerable: true,
        configurable: true
    });
    LegendEntryComponent.prototype.onMouseEnter = function () {
        this.activate.emit({ name: this.label });
    };
    LegendEntryComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit({ name: this.label });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LegendEntryComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendEntryComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LegendEntryComponent.prototype, "formattedLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LegendEntryComponent.prototype, "isActive", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendEntryComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendEntryComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendEntryComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendEntryComponent.prototype, "toggle", void 0);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LegendEntryComponent.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LegendEntryComponent.prototype, "onMouseLeave", null);
    LegendEntryComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-legend-entry',
            template: "\n    <span \n      [title]=\"formattedLabel\"\n      tabindex=\"-1\"\n      [class.active]=\"isActive\"\n      (click)=\"select.emit(formattedLabel)\">\n      <span\n        class=\"legend-label-color\"\n        [style.background-color]=\"color\"\n        (click)=\"toggle.emit(formattedLabel)\">\n      </span>\n      <span class=\"legend-label-text\">\n        {{trimmedLabel}}\n      </span>\n    </span>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], LegendEntryComponent);
    return LegendEntryComponent;
}());
exports.LegendEntryComponent = LegendEntryComponent;


/***/ },

/***/ "./src/common/legend/legend.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var LegendComponent = (function () {
    function LegendComponent(cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.labelClick = new core_1.EventEmitter();
        this.labelActivate = new core_1.EventEmitter();
        this.labelDeactivate = new core_1.EventEmitter();
        this.legendEntries = [];
    }
    LegendComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LegendComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.cd.markForCheck();
            _this.legendEntries = _this.getLegendEntries();
        });
    };
    LegendComponent.prototype.getLegendEntries = function () {
        var items = [];
        var _loop_1 = function(label) {
            var formattedLabel = label_helper_1.formatLabel(label);
            var idx = items.findIndex(function (i) {
                return i.label === formattedLabel;
            });
            if (idx === -1) {
                items.push({
                    label: label,
                    formattedLabel: formattedLabel,
                    color: this_1.colors.getColor(label)
                });
            }
        };
        var this_1 = this;
        for (var _i = 0, _a = this.data; _i < _a.length; _i++) {
            var label = _a[_i];
            _loop_1(label);
        }
        return items;
    };
    LegendComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.label === d.name;
        });
        return item !== undefined;
    };
    LegendComponent.prototype.activate = function (item) {
        var _this = this;
        this.zone.run(function () {
            _this.labelActivate.emit(item);
        });
    };
    LegendComponent.prototype.deactivate = function (item) {
        var _this = this;
        this.zone.run(function () {
            _this.labelDeactivate.emit(item);
        });
    };
    LegendComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "title", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LegendComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendComponent.prototype, "labelClick", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendComponent.prototype, "labelActivate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LegendComponent.prototype, "labelDeactivate", void 0);
    LegendComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-legend',
            template: "\n    <div [style.width.px]=\"width\">\n      <header class=\"legend-title\">\n        <span class=\"legend-icon icon-eye\"></span>\n        <span class=\"legend-title-text\">{{title}}</span>\n      </header>\n      <div class=\"legend-wrap\">\n        <ul class=\"legend-labels\"\n          [style.max-height.px]=\"height - 45\">\n          <li\n            *ngFor=\"let entry of legendEntries; trackBy: trackBy\"\n            class=\"legend-label\">\n            <ngx-charts-legend-entry\n              [label]=\"entry.label\"\n              [formattedLabel]=\"entry.formattedLabel\"\n              [color]=\"entry.color\"\n              [isActive]=\"isActive(entry)\"\n              (select)=\"labelClick.emit($event)\"\n              (activate)=\"activate($event)\"\n              (deactivate)=\"deactivate($event)\">\n            </ngx-charts-legend-entry>\n          </li>\n        </ul>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ChangeDetectorRef, core_1.NgZone])
    ], LegendComponent);
    return LegendComponent;
}());
exports.LegendComponent = LegendComponent;


/***/ },

/***/ "./src/common/legend/scale-legend.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var platform_browser_1 = __webpack_require__(3);
var ScaleLegendComponent = (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegendComponent.prototype, "valueRange", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegendComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegendComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ScaleLegendComponent.prototype, "width", void 0);
    ScaleLegendComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-scale-legend',
            template: "\n    <div\n      class=\"scale-legend\"\n      [style.height.px]=\"height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div \n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [platform_browser_1.DomSanitizer])
    ], ScaleLegendComponent);
    return ScaleLegendComponent;
}());
exports.ScaleLegendComponent = ScaleLegendComponent;


/***/ },

/***/ "./src/common/svg-linear-gradient.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var SvgLinearGradientComponent = (function () {
    function SvgLinearGradientComponent() {
        this.orientation = 'vertical';
    }
    SvgLinearGradientComponent.prototype.ngOnChanges = function (changes) {
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradientComponent.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradientComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgLinearGradientComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], SvgLinearGradientComponent.prototype, "stops", void 0);
    SvgLinearGradientComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-svg-linear-gradient]',
            template: "\n    <svg:linearGradient\n      [id]=\"name\"\n      [attr.x1]=\"x1\"\n      [attr.y1]=\"y1\"\n      [attr.x2]=\"x2\"\n      [attr.y2]=\"y2\">\n      <svg:stop *ngFor=\"let stop of stops\"\n        [attr.offset]=\"stop.offset + '%'\"\n        [style.stop-color]=\"stop.color\"\n        [style.stop-opacity]=\"stop.opacity\"\n      />     \n    </svg:linearGradient>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SvgLinearGradientComponent);
    return SvgLinearGradientComponent;
}());
exports.SvgLinearGradientComponent = SvgLinearGradientComponent;


/***/ },

/***/ "./src/common/svg-radial-gradient.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var SvgRadialGradientComponent = (function () {
    function SvgRadialGradientComponent() {
        this.endOpacity = 1;
        this.cx = 0;
        this.cy = 0;
    }
    SvgRadialGradientComponent.prototype.ngOnChanges = function (changes) {
        this.r = "30%";
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradientComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradientComponent.prototype, "name", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradientComponent.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], SvgRadialGradientComponent.prototype, "endOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SvgRadialGradientComponent.prototype, "cx", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], SvgRadialGradientComponent.prototype, "cy", void 0);
    SvgRadialGradientComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-svg-radial-gradient]',
            template: "\n    <svg:radialGradient\n      [id]=\"name\"\n      [attr.cx]=\"cx\"\n      [attr.cy]=\"cy\"\n      [attr.r]=\"r\"\n      gradientUnits=\"userSpaceOnUse\">\n      <svg:stop\n        offset=\"0%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"startOpacity\"\n      />\n      <svg:stop\n        offset=\"100%\"\n        [style.stop-color]=\"color\"\n        [style.stop-opacity]=\"endOpacity\"\n      />\n    </svg:radialGradient>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], SvgRadialGradientComponent);
    return SvgRadialGradientComponent;
}());
exports.SvgRadialGradientComponent = SvgRadialGradientComponent;


/***/ },

/***/ "./src/common/tick-format.helper.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var moment = __webpack_require__(1);
function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            return moment(label).format("MM/DD/YYYY");
        }
        return label.toString();
    };
}
exports.tickFormat = tickFormat;


/***/ },

/***/ "./src/common/timeline.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var moment = __webpack_require__(1);
var d3_1 = __webpack_require__("./src/d3.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var Timeline = (function () {
    function Timeline(element, zone, cd) {
        this.zone = zone;
        this.cd = cd;
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
            var pageUrl = window.location.href;
            _this.filterId = 'filter' + id_1.id().toString();
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
        if (this.brush)
            return;
        var height = this.height;
        var width = this.view[0];
        this.brush = d3_1.default.brushX()
            .extent([[0, 0], [width, height]])
            .on("brush end", function () {
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
        core_1.Input(), 
        __metadata('design:type', Number)
    ], Timeline.prototype, "height", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Timeline.prototype, "onDomainChange", void 0);
    Timeline = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-timeline]',
            template: "\n    <svg:g\n      class=\"timeline\"\n      [attr.transform]=\"transform\">\n      <svg:filter [attr.id]=\"filterId\">\n        <svg:feColorMatrix in=\"SourceGraphic\"\n            type=\"matrix\"\n            values=\"0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0.3333 0.3333 0.3333 0 0 0 0 0 1 0\" />\n      </svg:filter>\n      <svg:g class=\"embedded-chart\">\n        <ng-content></ng-content>\n      </svg:g>\n      <svg:rect x=\"0\" \n        [attr.width]=\"view[0]\" \n        y=\"0\" \n        [attr.height]=\"height\" \n        class=\"brush-background\" \n      />\n      <svg:g class=\"brush\"></svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.NgZone, core_1.ChangeDetectorRef])
    ], Timeline);
    return Timeline;
}());
exports.Timeline = Timeline;


/***/ },

/***/ "./src/common/tooltip/alignment.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (AlignmentTypes) {
    AlignmentTypes[AlignmentTypes["left"] = 'left'] = "left";
    AlignmentTypes[AlignmentTypes["center"] = 'center'] = "center";
    AlignmentTypes[AlignmentTypes["right"] = 'right'] = "right";
})(exports.AlignmentTypes || (exports.AlignmentTypes = {}));
var AlignmentTypes = exports.AlignmentTypes;


/***/ },

/***/ "./src/common/tooltip/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/common/tooltip/tooltip.module.ts"));
__export(__webpack_require__("./src/common/tooltip/tooltip.service.ts"));
__export(__webpack_require__("./src/common/tooltip/tooltip.component.ts"));
__export(__webpack_require__("./src/common/tooltip/tooltip.directive.ts"));
__export(__webpack_require__("./src/common/tooltip/style.type.ts"));
__export(__webpack_require__("./src/common/tooltip/alignment.type.ts"));
__export(__webpack_require__("./src/common/tooltip/show.type.ts"));


/***/ },

/***/ "./src/common/tooltip/position/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/common/tooltip/position/placement.type.ts"));
__export(__webpack_require__("./src/common/tooltip/position/position.ts"));


/***/ },

/***/ "./src/common/tooltip/position/placement.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (PlacementTypes) {
    PlacementTypes[PlacementTypes["top"] = 'top'] = "top";
    PlacementTypes[PlacementTypes["bottom"] = 'bottom'] = "bottom";
    PlacementTypes[PlacementTypes["left"] = 'left'] = "left";
    PlacementTypes[PlacementTypes["right"] = 'right'] = "right";
})(exports.PlacementTypes || (exports.PlacementTypes = {}));
var PlacementTypes = exports.PlacementTypes;


/***/ },

/***/ "./src/common/tooltip/position/position.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var placement_type_1 = __webpack_require__("./src/common/tooltip/position/placement.type.ts");
var caretOffset = 7;
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
/**
 * Position helper for the popover directive.
 *
 * @export
 * @class PositionHelper
 */
var PositionHelper = (function () {
    function PositionHelper() {
    }
    /**
     * Calculate vertical alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.height > window.innerHeight) {
            result = window.innerHeight - popoverDimensions.height;
        }
        return result;
    };
    /**
     * Calculate vertical caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateVerticalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'top') {
            result = elDimensions.height / 2 - caretDimensions.height / 2 + caretOffset;
        }
        if (alignment === 'bottom') {
            result = popoverDimensions.height - elDimensions.height / 2 - caretDimensions.height / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.height / 2 - caretDimensions.height / 2;
        }
        var popoverPosition = verticalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.height > window.innerHeight) {
            result += (popoverPosition + popoverDimensions.height - window.innerHeight);
        }
        return result;
    };
    /**
     * Calculate horz alignment position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalAlignment = function (elDimensions, popoverDimensions, alignment) {
        var result = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (result + popoverDimensions.width > window.innerWidth) {
            result = window.innerWidth - popoverDimensions.width;
        }
        return result;
    };
    /**
     * Calculate horz caret position
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {number}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.calculateHorizontalCaret = function (elDimensions, popoverDimensions, caretDimensions, alignment) {
        var result;
        if (alignment === 'left') {
            result = elDimensions.width / 2 - caretDimensions.width / 2 + caretOffset;
        }
        if (alignment === 'right') {
            result = popoverDimensions.width - elDimensions.width / 2 - caretDimensions.width / 2 - caretOffset;
        }
        if (alignment === 'center') {
            result = popoverDimensions.width / 2 - caretDimensions.width / 2;
        }
        var popoverPosition = horizontalPosition(elDimensions, popoverDimensions, alignment);
        if (popoverPosition + popoverDimensions.width > window.innerWidth) {
            result += (popoverPosition + popoverDimensions.width - window.innerWidth);
        }
        return result;
    };
    /**
     * Checks if the element's position should be flipped
     *
     * @static
     * @param {any} elDimensions
     * @param {any} popoverDimensions
     * @param {any} placement
     * @param {any} alignment
     * @param {any} spacing
     * @returns {boolean}
     *
     * @memberOf PositionHelper
     */
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
            if (elDimensions.top - popoverDimensions.height - spacing < 0) {
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
    /**
     * Position caret
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} caretDimensions
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionCaret = function (placement, elmDim, hostDim, caretDimensions, alignment) {
        var top = 0;
        var left = 0;
        if (placement === placement_type_1.PlacementTypes.right) {
            left = -7;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.left) {
            left = elmDim.width;
            top = PositionHelper.calculateVerticalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.top) {
            top = elmDim.height;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.bottom) {
            top = -7;
            left = PositionHelper.calculateHorizontalCaret(hostDim, elmDim, caretDimensions, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Position content
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.positionContent = function (placement, elmDim, hostDim, spacing, alignment) {
        var top = 0;
        var left = 0;
        if (placement === placement_type_1.PlacementTypes.right) {
            left = hostDim.left + hostDim.width + spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.left) {
            left = hostDim.left - elmDim.width - spacing;
            top = PositionHelper.calculateVerticalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.top) {
            top = hostDim.top - elmDim.height - spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        else if (placement === placement_type_1.PlacementTypes.bottom) {
            top = hostDim.top + hostDim.height + spacing;
            left = PositionHelper.calculateHorizontalAlignment(hostDim, elmDim, alignment);
        }
        return { top: top, left: left };
    };
    /**
     * Determine placement based on flip
     *
     * @static
     * @param {any} placement
     * @param {any} elmDim
     * @param {any} hostDim
     * @param {any} spacing
     * @param {any} alignment
     * @returns {*}
     *
     * @memberOf PositionHelper
     */
    PositionHelper.determinePlacement = function (placement, elmDim, hostDim, spacing, alignment) {
        var shouldFlip = PositionHelper.shouldFlip(hostDim, elmDim, placement, alignment, spacing);
        if (shouldFlip) {
            if (placement === placement_type_1.PlacementTypes.right) {
                return placement_type_1.PlacementTypes.left;
            }
            else if (placement === placement_type_1.PlacementTypes.left) {
                return placement_type_1.PlacementTypes.right;
            }
            else if (placement === placement_type_1.PlacementTypes.top) {
                return placement_type_1.PlacementTypes.bottom;
            }
            else if (placement === placement_type_1.PlacementTypes.bottom) {
                return placement_type_1.PlacementTypes.top;
            }
        }
        return placement;
    };
    return PositionHelper;
}());
exports.PositionHelper = PositionHelper;


/***/ },

/***/ "./src/common/tooltip/show.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (ShowTypes) {
    ShowTypes[ShowTypes["all"] = 'all'] = "all";
    ShowTypes[ShowTypes["focus"] = 'focus'] = "focus";
    ShowTypes[ShowTypes["mouseover"] = 'mouseover'] = "mouseover";
})(exports.ShowTypes || (exports.ShowTypes = {}));
var ShowTypes = exports.ShowTypes;


/***/ },

/***/ "./src/common/tooltip/style.type.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
(function (StyleTypes) {
    StyleTypes[StyleTypes["popover"] = 'popover'] = "popover";
    StyleTypes[StyleTypes["tooltip"] = 'tooltip'] = "tooltip";
})(exports.StyleTypes || (exports.StyleTypes = {}));
var StyleTypes = exports.StyleTypes;


/***/ },

/***/ "./src/common/tooltip/tooltip.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var throttle_1 = __webpack_require__("./src/utils/throttle.ts");
var position_1 = __webpack_require__("./src/common/tooltip/position/index.ts");
var style_type_1 = __webpack_require__("./src/common/tooltip/style.type.ts");
var alignment_type_1 = __webpack_require__("./src/common/tooltip/alignment.type.ts");
var TooltipContentComponent = (function () {
    function TooltipContentComponent(element, renderer) {
        this.element = element;
        this.renderer = renderer;
    }
    Object.defineProperty(TooltipContentComponent.prototype, "cssClasses", {
        get: function () {
            var clz = 'ngx-tooltip-content';
            clz += " position-" + this.placement;
            clz += " type-" + this.type;
            clz += " " + this.cssClass;
            return clz;
        },
        enumerable: true,
        configurable: true
    });
    TooltipContentComponent.prototype.ngAfterViewInit = function () {
        setTimeout(this.position.bind(this));
    };
    TooltipContentComponent.prototype.position = function () {
        var _this = this;
        var nativeElm = this.element.nativeElement;
        var hostDim = this.host.nativeElement.getBoundingClientRect();
        // if no dims were found, never show
        if (!hostDim.height && !hostDim.width)
            return;
        var elmDim = nativeElm.getBoundingClientRect();
        this.checkFlip(hostDim, elmDim);
        this.positionContent(nativeElm, hostDim, elmDim);
        if (this.showCaret) {
            this.positionCaret(hostDim, elmDim);
        }
        // animate its entry
        setTimeout(function () { return _this.renderer.setElementClass(nativeElm, 'animate', true); }, 1);
    };
    TooltipContentComponent.prototype.positionContent = function (nativeElm, hostDim, elmDim) {
        var _a = position_1.PositionHelper.positionContent(this.placement, elmDim, hostDim, this.spacing, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(nativeElm, 'top', top + "px");
        this.renderer.setElementStyle(nativeElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.positionCaret = function (hostDim, elmDim) {
        var caretElm = this.caretElm.nativeElement;
        var caretDimensions = caretElm.getBoundingClientRect();
        var _a = position_1.PositionHelper.positionCaret(this.placement, elmDim, hostDim, caretDimensions, this.alignment), top = _a.top, left = _a.left;
        this.renderer.setElementStyle(caretElm, 'top', top + "px");
        this.renderer.setElementStyle(caretElm, 'left', left + "px");
    };
    TooltipContentComponent.prototype.checkFlip = function (hostDim, elmDim) {
        this.placement = position_1.PositionHelper.determinePlacement(this.placement, elmDim, hostDim, this.spacing, this.alignment);
    };
    TooltipContentComponent.prototype.onWindowResize = function () {
        this.position();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TooltipContentComponent.prototype, "host", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipContentComponent.prototype, "showCaret", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipContentComponent.prototype, "type", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipContentComponent.prototype, "placement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipContentComponent.prototype, "alignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipContentComponent.prototype, "spacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipContentComponent.prototype, "cssClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipContentComponent.prototype, "title", void 0);
    __decorate([
        core_1.ViewChild('caretElm'), 
        __metadata('design:type', Object)
    ], TooltipContentComponent.prototype, "caretElm", void 0);
    __decorate([
        core_1.HostBinding('class'), 
        __metadata('design:type', String)
    ], TooltipContentComponent.prototype, "cssClasses", null);
    __decorate([
        core_1.HostListener('window:resize'),
        throttle_1.throttleable(100), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipContentComponent.prototype, "onWindowResize", null);
    TooltipContentComponent = __decorate([
        core_1.Component({
            selector: 'ngx-tooltip-content',
            template: "\n    <div>\n      <span\n        #caretElm\n        [hidden]=\"!showCaret\"\n        class=\"tooltip-caret position-{{this.placement}}\">\n      </span>\n      <div class=\"tooltip-content\">\n        <span *ngIf=\"!title\">\n          <template\n            [ngTemplateOutlet]=\"template\"\n            [ngOutletContext]=\"{ model: context }\">\n          </template>\n        </span>\n        <span\n          *ngIf=\"title\"\n          [innerHTML]=\"title\">\n        </span>\n      </div>\n    </div>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.Renderer])
    ], TooltipContentComponent);
    return TooltipContentComponent;
}());
exports.TooltipContentComponent = TooltipContentComponent;


/***/ },

/***/ "./src/common/tooltip/tooltip.directive.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var position_1 = __webpack_require__("./src/common/tooltip/position/index.ts");
var style_type_1 = __webpack_require__("./src/common/tooltip/style.type.ts");
var alignment_type_1 = __webpack_require__("./src/common/tooltip/alignment.type.ts");
var show_type_1 = __webpack_require__("./src/common/tooltip/show.type.ts");
var tooltip_service_1 = __webpack_require__("./src/common/tooltip/tooltip.service.ts");
var TooltipDirective = (function () {
    function TooltipDirective(tooltipService, viewContainerRef, renderer, element) {
        this.tooltipService = tooltipService;
        this.viewContainerRef = viewContainerRef;
        this.renderer = renderer;
        this.element = element;
        this.tooltipCssClass = '';
        this.tooltipTitle = '';
        this.tooltipAppendToBody = true;
        this.tooltipSpacing = 10;
        this.tooltipDisabled = false;
        this.tooltipShowCaret = true;
        this.tooltipPlacement = position_1.PlacementTypes.top;
        this.tooltipAlignment = alignment_type_1.AlignmentTypes.center;
        this.tooltipType = style_type_1.StyleTypes.popover;
        this.tooltipCloseOnClickOutside = true;
        this.tooltipCloseOnMouseLeave = true;
        this.tooltipHideTimeout = 300;
        this.tooltipShowTimeout = 100;
        this.tooltipShowEvent = show_type_1.ShowTypes.all;
        this.show = new core_1.EventEmitter();
        this.hide = new core_1.EventEmitter();
    }
    Object.defineProperty(TooltipDirective.prototype, "listensForFocus", {
        get: function () {
            return this.tooltipShowEvent === show_type_1.ShowTypes.all ||
                this.tooltipShowEvent === show_type_1.ShowTypes.focus;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TooltipDirective.prototype, "listensForHover", {
        get: function () {
            return this.tooltipShowEvent === show_type_1.ShowTypes.all ||
                this.tooltipShowEvent === show_type_1.ShowTypes.mouseover;
        },
        enumerable: true,
        configurable: true
    });
    TooltipDirective.prototype.ngOnDestroy = function () {
        this.hideTooltip(true);
    };
    TooltipDirective.prototype.onFocus = function () {
        if (this.listensForFocus) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onBlur = function () {
        if (this.listensForFocus) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.onMouseEnter = function () {
        if (this.listensForHover) {
            this.showTooltip();
        }
    };
    TooltipDirective.prototype.onMouseLeave = function (target) {
        if (this.listensForHover && this.tooltipCloseOnMouseLeave) {
            clearTimeout(this.timeout);
            if (this.component) {
                var contentDom = this.component.instance.element.nativeElement;
                var contains = contentDom.contains(target);
                if (contains)
                    return;
            }
            this.hideTooltip();
        }
    };
    TooltipDirective.prototype.onMouseClick = function () {
        if (this.listensForHover) {
            this.hideTooltip(true);
        }
    };
    TooltipDirective.prototype.showTooltip = function (immediate) {
        var _this = this;
        if (this.component || this.tooltipDisabled)
            return;
        var time = immediate ? 0 : this.tooltipShowTimeout;
        clearTimeout(this.timeout);
        this.timeout = setTimeout(function () {
            _this.tooltipService.destroyAll();
            var options = _this.createBoundOptions();
            _this.component = _this.tooltipService.create(options);
            // add a tiny timeout to avoid event re-triggers
            setTimeout(function () {
                _this.addHideListeners(_this.component.instance.element.nativeElement);
            }, 10);
            _this.show.emit(true);
        }, time);
    };
    TooltipDirective.prototype.addHideListeners = function (tooltip) {
        var _this = this;
        // on mouse enter, cancel the hide triggered by the leave
        this.mouseEnterContentEvent = this.renderer.listen(tooltip, 'mouseenter', function () {
            clearTimeout(_this.timeout);
        });
        // content mouse leave listener
        if (this.tooltipCloseOnMouseLeave) {
            this.mouseLeaveContentEvent = this.renderer.listen(tooltip, 'mouseleave', function () {
                _this.hideTooltip();
            });
        }
        // content close on click outside
        if (this.tooltipCloseOnClickOutside) {
            this.documentClickEvent = this.renderer.listen(document, 'click', function (event) {
                var contains = tooltip.contains(event.target);
                if (!contains)
                    _this.hideTooltip();
            });
        }
    };
    TooltipDirective.prototype.hideTooltip = function (immediate) {
        var _this = this;
        if (!this.component)
            return;
        var destroyFn = function () {
            // remove events
            if (_this.mouseLeaveContentEvent)
                _this.mouseLeaveContentEvent();
            if (_this.mouseEnterContentEvent)
                _this.mouseEnterContentEvent();
            if (_this.documentClickEvent)
                _this.documentClickEvent();
            // emit events
            _this.hide.emit(true);
            // destroy component
            _this.tooltipService.destroy(_this.component);
            _this.component = undefined;
        };
        clearTimeout(this.timeout);
        if (!immediate) {
            this.timeout = setTimeout(destroyFn, this.tooltipHideTimeout);
        }
        else {
            destroyFn();
        }
    };
    TooltipDirective.prototype.createBoundOptions = function () {
        return {
            title: this.tooltipTitle,
            template: this.tooltipTemplate,
            host: this.viewContainerRef.element,
            placement: this.tooltipPlacement,
            alignment: this.tooltipAlignment,
            type: this.tooltipType,
            showCaret: this.tooltipShowCaret,
            cssClass: this.tooltipCssClass,
            spacing: this.tooltipSpacing,
            context: this.tooltipContext
        };
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltipCssClass", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], TooltipDirective.prototype, "tooltipTitle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipAppendToBody", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipSpacing", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipDisabled", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipShowCaret", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipPlacement", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipAlignment", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnClickOutside", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], TooltipDirective.prototype, "tooltipCloseOnMouseLeave", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipHideTimeout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipShowTimeout", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "tooltipTemplate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], TooltipDirective.prototype, "tooltipShowEvent", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "tooltipContext", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "show", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TooltipDirective.prototype, "hide", void 0);
    __decorate([
        core_1.HostListener('focusin'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onFocus", null);
    __decorate([
        core_1.HostListener('blur'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onBlur", null);
    __decorate([
        core_1.HostListener('mouseenter'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseEnter", null);
    __decorate([
        core_1.HostListener('mouseleave', ['$event.target']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object]), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseLeave", null);
    __decorate([
        core_1.HostListener('click'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], TooltipDirective.prototype, "onMouseClick", null);
    TooltipDirective = __decorate([
        core_1.Directive({ selector: '[ngx-tooltip]' }), 
        __metadata('design:paramtypes', [tooltip_service_1.TooltipService, core_1.ViewContainerRef, core_1.Renderer, core_1.ElementRef])
    ], TooltipDirective);
    return TooltipDirective;
}());
exports.TooltipDirective = TooltipDirective;


/***/ },

/***/ "./src/common/tooltip/tooltip.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var common_1 = __webpack_require__(2);
var tooltip_directive_1 = __webpack_require__("./src/common/tooltip/tooltip.directive.ts");
var tooltip_component_1 = __webpack_require__("./src/common/tooltip/tooltip.component.ts");
var tooltip_service_1 = __webpack_require__("./src/common/tooltip/tooltip.service.ts");
var services_1 = __webpack_require__("./src/services/index.ts");
var TooltipModule = (function () {
    function TooltipModule() {
    }
    TooltipModule = __decorate([
        core_1.NgModule({
            declarations: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
            providers: [services_1.InjectionService, tooltip_service_1.TooltipService],
            exports: [tooltip_component_1.TooltipContentComponent, tooltip_directive_1.TooltipDirective],
            imports: [common_1.CommonModule],
            entryComponents: [tooltip_component_1.TooltipContentComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], TooltipModule);
    return TooltipModule;
}());
exports.TooltipModule = TooltipModule;


/***/ },

/***/ "./src/common/tooltip/tooltip.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var services_1 = __webpack_require__("./src/services/index.ts");
var _1 = __webpack_require__("./src/common/tooltip/index.ts");
var TooltipService = (function (_super) {
    __extends(TooltipService, _super);
    function TooltipService(injectionService) {
        _super.call(this, injectionService);
        this.type = _1.TooltipContentComponent;
    }
    TooltipService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [services_1.InjectionService])
    ], TooltipService);
    return TooltipService;
}(services_1.InjectionRegistery));
exports.TooltipService = TooltipService;


/***/ },

/***/ "./src/common/trim-label.helper.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
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
exports.trimLabel = trimLabel;


/***/ },

/***/ "./src/common/view-dimensions.helper.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
function calculateViewDimensions(_a) {
    var width = _a.width, height = _a.height, margins = _a.margins, _b = _a.showXAxis, showXAxis = _b === void 0 ? false : _b, _c = _a.showYAxis, showYAxis = _c === void 0 ? false : _c, _d = _a.xAxisHeight, xAxisHeight = _d === void 0 ? 0 : _d, _e = _a.yAxisWidth, yAxisWidth = _e === void 0 ? 0 : _e, _f = _a.showXLabel, showXLabel = _f === void 0 ? false : _f, _g = _a.showYLabel, showYLabel = _g === void 0 ? false : _g, _h = _a.showLegend, showLegend = _h === void 0 ? false : _h, _j = _a.legendType, legendType = _j === void 0 ? 'ordinal' : _j, _k = _a.columns, columns = _k === void 0 ? 12 : _k;
    var xOffset = margins[3];
    var chartWidth = width;
    var chartHeight = height - margins[0] - margins[2];
    if (showLegend) {
        if (legendType === 'ordinal') {
            columns -= 2;
        }
        else {
            columns -= 1;
        }
    }
    chartWidth = chartWidth * columns / 12;
    chartWidth = chartWidth - margins[1] - margins[3];
    if (showXAxis) {
        chartHeight -= 5;
        chartHeight -= xAxisHeight;
        if (showXLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartHeight -= offset;
        }
    }
    if (showYAxis) {
        chartWidth -= 5;
        chartWidth -= yAxisWidth;
        xOffset += yAxisWidth;
        xOffset += 10;
        if (showYLabel) {
            // text height + spacing between axis label and tick labels
            var offset = 25 + 5;
            chartWidth -= offset;
            xOffset += offset;
        }
    }
    chartWidth = Math.max(0, chartWidth);
    chartHeight = Math.max(0, chartHeight);
    return {
        width: chartWidth,
        height: chartHeight,
        xOffset: xOffset
    };
}
exports.calculateViewDimensions = calculateViewDimensions;


/***/ },

/***/ "./src/d3.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
/// <reference path="../node_modules/awesome-typescript-loader/lib/runtime.d.ts" />
"use strict";
var array = __webpack_require__(4);
var brush = __webpack_require__(5);
var color = __webpack_require__(6);
var force = __webpack_require__(7);
var format = __webpack_require__(8);
var interpolate = __webpack_require__(10);
var scales = __webpack_require__(11);
var selection = __webpack_require__(12);
var shape = __webpack_require__(13);
var hierarchy = __webpack_require__(9);
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    arc: shape.arc,
    area: shape.area,
    brush: brush.brush,
    brushX: brush.brushX,
    brushY: brush.brushY,
    event: selection.event,
    extent: array.extent,
    forceCollide: force.forceCollide,
    forceLink: force.forceLink,
    forceManyBody: force.forceManyBody,
    forceSimulation: force.forceSimulation,
    forceX: force.forceX,
    forceY: force.forceY,
    format: format.format,
    interpolate: interpolate.interpolate,
    line: shape.line,
    max: array.max,
    min: array.min,
    mouse: selection.mouse,
    pie: shape.pie,
    range: array.range,
    rgb: color.rgb,
    selection: selection,
    select: selection.select,
    selectAll: selection.selectAll,
    scaleBand: scales.scaleBand,
    scaleLinear: scales.scaleLinear,
    scaleOrdinal: scales.scaleOrdinal,
    scalePoint: scales.scalePoint,
    scaleQuantile: scales.scaleQuantile,
    scaleTime: scales.scaleTime,
    shape: shape,
    treemap: hierarchy.treemap,
    stratify: hierarchy.stratify
};


/***/ },

/***/ "./src/force-directed-graph/force-directed-graph.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var chart_component_1 = __webpack_require__("./src/common/charts/chart.component.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var ForceDirectedGraphComponent = (function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent() {
        _super.apply(this, arguments);
        this.force = d3_1.default.forceSimulation()
            .force("charge", d3_1.default.forceManyBody())
            .force("collide", d3_1.default.forceCollide(5))
            .force("x", d3_1.default.forceX())
            .force("y", d3_1.default.forceY());
        this.forceLink = d3_1.default.forceLink().id(function (node) { return node.value; });
        this.groupResultsBy = function (node) { return node.value; };
        this.nodes = [];
        this.links = [];
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [0, 0, 0, 0];
        this.results = [];
    }
    ForceDirectedGraphComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            // center graph
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showLegend: _this.legend,
            });
            _this.seriesDomain = _this.getSeriesDomain();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + (_this.dims.xOffset + _this.dims.width / 2) + ", " + (_this.margin[0] + _this.dims.height / 2) + ")";
            if (_this.force) {
                _this.force.nodes(_this.nodes)
                    .force("link", _this.forceLink.links(_this.links))
                    .alpha(0.5).restart();
            }
        });
    };
    ForceDirectedGraphComponent.prototype.onClick = function (data, node) {
        this.select.emit(data);
    };
    ForceDirectedGraphComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    ForceDirectedGraphComponent.prototype.getSeriesDomain = function () {
        var _this = this;
        return this.nodes.map(function (d) { return _this.groupResultsBy(d); })
            .reduce(function (nodes, node) { return nodes.includes(node) ? nodes : nodes.concat([node]); }, [])
            .sort();
    };
    ForceDirectedGraphComponent.prototype.trackLinkBy = function (index, link) {
        return link.index;
    };
    ForceDirectedGraphComponent.prototype.trackNodeBy = function (index, node) {
        return node.value;
    };
    ForceDirectedGraphComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
    };
    ForceDirectedGraphComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.seriesDomain,
            colors: this.colors
        };
    };
    // Easier to use Angular2 event management than use d3.drag
    ForceDirectedGraphComponent.prototype.onDragStart = function (node, $event) {
        this.force.alphaTarget(0.3).restart();
        this.draggingNode = node;
        this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDrag = function ($event) {
        if (!this.draggingNode)
            return;
        this.draggingNode.fx = $event.x - this.draggingStart.x;
        this.draggingNode.fy = $event.y - this.draggingStart.y;
    };
    ForceDirectedGraphComponent.prototype.onDragEnd = function (node, $event) {
        if (!this.draggingNode)
            return;
        this.force.alphaTarget(0);
        this.draggingNode.fx = undefined;
        this.draggingNode.fy = undefined;
        this.draggingNode = undefined;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ForceDirectedGraphComponent.prototype, "force", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], ForceDirectedGraphComponent.prototype, "forceLink", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Function)
    ], ForceDirectedGraphComponent.prototype, "groupResultsBy", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], ForceDirectedGraphComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ForceDirectedGraphComponent.prototype, "nodes", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ForceDirectedGraphComponent.prototype, "links", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], ForceDirectedGraphComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ForceDirectedGraphComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], ForceDirectedGraphComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.ContentChild('linkTemplate'), 
        __metadata('design:type', core_1.TemplateRef)
    ], ForceDirectedGraphComponent.prototype, "linkTemplate", void 0);
    __decorate([
        core_1.ContentChild('nodeTemplate'), 
        __metadata('design:type', core_1.TemplateRef)
    ], ForceDirectedGraphComponent.prototype, "nodeTemplate", void 0);
    __decorate([
        core_1.ViewChild(chart_component_1.ChartComponent, { read: core_1.ElementRef }), 
        __metadata('design:type', core_1.ElementRef)
    ], ForceDirectedGraphComponent.prototype, "chart", void 0);
    __decorate([
        core_1.HostListener('document:mousemove', ['$event']), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], ForceDirectedGraphComponent.prototype, "onDrag", null);
    __decorate([
        core_1.HostListener('document:mouseup'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', [Object, MouseEvent]), 
        __metadata('design:returntype', void 0)
    ], ForceDirectedGraphComponent.prototype, "onDragEnd", null);
    ForceDirectedGraphComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-force-directed-graph',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy:trackLinkBy\">\n            <template *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngOutletContext]=\"{ $implicit: link }\">\n            </template>\n            <svg:line *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\" class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g *ngFor=\"let node of nodes; trackBy:trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors.getColor(groupResultsBy(node))\"\n            [attr.stroke]=\"colors.getColor(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({name: node.value})\"\n            ngx-tooltip\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"node.value\">\n            <template *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngOutletContext]=\"{ $implicit: node }\">\n            </template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], ForceDirectedGraphComponent);
    return ForceDirectedGraphComponent;
}(base_chart_component_1.BaseChartComponent));
exports.ForceDirectedGraphComponent = ForceDirectedGraphComponent;


/***/ },

/***/ "./src/force-directed-graph/force-directed-graph.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var force_directed_graph_component_1 = __webpack_require__("./src/force-directed-graph/force-directed-graph.component.ts");
exports.ForceDirectedGraphComponent = force_directed_graph_component_1.ForceDirectedGraphComponent;
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var ForceDirectedGraphModule = (function () {
    function ForceDirectedGraphModule() {
    }
    ForceDirectedGraphModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                force_directed_graph_component_1.ForceDirectedGraphComponent,
            ],
            exports: [
                force_directed_graph_component_1.ForceDirectedGraphComponent,
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], ForceDirectedGraphModule);
    return ForceDirectedGraphModule;
}());
exports.ForceDirectedGraphModule = ForceDirectedGraphModule;


/***/ },

/***/ "./src/force-directed-graph/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/force-directed-graph/force-directed-graph.module.ts"));
__export(__webpack_require__("./src/force-directed-graph/force-directed-graph.component.ts"));


/***/ },

/***/ "./src/gauge/gauge-arc.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var GaugeArcComponent = (function () {
    function GaugeArcComponent() {
        this.select = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeArcComponent.prototype, "backgroundArc", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeArcComponent.prototype, "valueArc", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', color_helper_1.ColorHelper)
    ], GaugeArcComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], GaugeArcComponent.prototype, "select", void 0);
    GaugeArcComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-gauge-arc]',
            template: "\n    <svg:g ngx-charts-pie-arc\n        class=\"background-arc\"\n        [startAngle]=\"0\"\n        [endAngle]=\"backgroundArc.endAngle\"\n        [innerRadius]=\"backgroundArc.innerRadius\"\n        [outerRadius]=\"backgroundArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [data]=\"backgroundArc.data\"\n        [animate]=\"false\"\n        [pointerEvents]=\"false\">\n    </svg:g>\n    <svg:g ngx-charts-pie-arc\n        [startAngle]=\"0\"\n        [endAngle]=\"valueArc.endAngle\"\n        [innerRadius]=\"valueArc.innerRadius\"\n        [outerRadius]=\"valueArc.outerRadius\"\n        [cornerRadius]=\"cornerRadius\"\n        [fill]=\"colors.getColor(valueArc.data.value)\"\n        [data]=\"valueArc.data\"\n        [animate]=\"true\"\n        (select)=\"select.emit($event)\">\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeArcComponent);
    return GaugeArcComponent;
}());
exports.GaugeArcComponent = GaugeArcComponent;


/***/ },

/***/ "./src/gauge/gauge-axis.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var GaugeAxisComponent = (function () {
    function GaugeAxisComponent() {
        this.rotate = '';
    }
    GaugeAxisComponent.prototype.ngOnChanges = function () {
        this.update();
    };
    GaugeAxisComponent.prototype.update = function () {
        this.rotationAngle = -90 + this.startAngle;
        this.rotate = "rotate(" + this.rotationAngle + ")";
        this.ticks = this.getTicks();
    };
    GaugeAxisComponent.prototype.getTicks = function () {
        var bigTickSegment = this.angleSpan / this.bigSegments;
        var smallTickSegment = bigTickSegment / (this.smallSegments);
        var tickLength = 20;
        var ticks = {
            big: [],
            small: []
        };
        var startDistance = this.radius + 10;
        var textDist = startDistance + tickLength + 10;
        for (var i = 0; i <= this.bigSegments; i++) {
            var angleDeg = i * bigTickSegment;
            var angle = angleDeg * Math.PI / 180;
            var textAnchor = this.getTextAnchor(angleDeg);
            ticks.big.push({
                line: this.getTickPath(startDistance, tickLength, angle),
                textAnchor: textAnchor,
                text: Number.parseInt(this.valueScale.invert(angleDeg).toString()).toLocaleString(),
                textTransform: "translate(" + textDist * Math.cos(angle) + ", " + textDist * Math.sin(angle) + ") rotate(" + -this.rotationAngle + ")"
            });
            if (i === this.bigSegments) {
                continue;
            }
            for (var j = 1; j <= this.smallSegments; j++) {
                var smallAngleDeg = angleDeg + j * smallTickSegment;
                var smallAngle = smallAngleDeg * Math.PI / 180;
                ticks.small.push({
                    line: this.getTickPath(startDistance, tickLength / 2, smallAngle)
                });
            }
        }
        return ticks;
    };
    GaugeAxisComponent.prototype.getTextAnchor = function (angle) {
        // [0, 45] = 'middle';
        // [46, 135] = 'start';
        // [136, 225] = 'middle';
        // [226, 315] = 'end';
        angle = (this.startAngle + angle) % 360;
        var textAnchor = 'middle';
        if (angle > 45 && angle <= 135) {
            textAnchor = 'start';
        }
        else if (angle > 225 && angle <= 315) {
            textAnchor = 'end';
        }
        return textAnchor;
    };
    GaugeAxisComponent.prototype.getTickPath = function (startDistance, tickLength, angle) {
        var y1 = startDistance * Math.sin(angle);
        var y2 = (startDistance + tickLength) * Math.sin(angle);
        var x1 = startDistance * Math.cos(angle);
        var x2 = (startDistance + tickLength) * Math.cos(angle);
        var points = [{ x: x1, y: y1 }, { x: x2, y: y2 }];
        var line = d3_1.default.line().x(function (d) { return d.x; }).y(function (d) { return d.y; });
        return line(points);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "bigSegments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "smallSegments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeAxisComponent.prototype, "angleSpan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeAxisComponent.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "radius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], GaugeAxisComponent.prototype, "valueScale", void 0);
    GaugeAxisComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-gauge-axis]',
            template: "\n    <svg:g [attr.transform]=\"rotate\">\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.big\"\n            class=\"gauge-tick gauge-tick-large\">\n            <svg:text\n                [style.textAnchor]=\"tick.textAnchor\"\n                [attr.transform]=\"tick.textTransform\"\n                alignment-baseline=\"central\">\n                {{tick.text}}\n            </svg:text>\n        </svg:g>\n        <svg:g *ngFor=\"let tick of ticks.small\"            \n            class=\"gauge-tick gauge-tick-small\">\n            <svg:path [attr.d]=\"tick.line\" />\n        </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeAxisComponent);
    return GaugeAxisComponent;
}());
exports.GaugeAxisComponent = GaugeAxisComponent;


/***/ },

/***/ "./src/gauge/gauge.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var GaugeComponent = (function (_super) {
    __extends(GaugeComponent, _super);
    function GaugeComponent() {
        _super.apply(this, arguments);
        this.min = 0;
        this.max = 100;
        this.bigSegments = 10;
        this.smallSegments = 5;
        this.showAxis = true;
        this.startAngle = -120;
        this.angleSpan = 240;
        this.schemeType = 'ordinal';
        this.resizeScale = 1;
        this.rotation = '';
        this.textTransform = '';
        this.cornerRadius = 10;
    }
    GaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () { return _this.scaleText(); });
    };
    GaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (!_this.showAxis) {
                _this.margin = [10, 20, 10, 20];
            }
            else {
                _this.margin = [60, 100, 60, 100];
            }
            // make the starting angle positive
            if (_this.startAngle < 0) {
                _this.startAngle = (_this.startAngle % 360) + 360;
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.valueScale = _this.getValueScale();
            _this.displayValue = _this.getDisplayValue();
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2;
            _this.arcs = _this.getArcs();
            _this.setColors();
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            _this.rotation = "rotate(" + _this.startAngle + ")";
            _this.scaleText();
        });
    };
    GaugeComponent.prototype.getArcs = function () {
        var arcs = [];
        var availableRadius = this.outerRadius * 0.7;
        var radiusPerArc = Math.min(availableRadius / this.results.length, 10);
        var arcWidth = radiusPerArc * 0.7;
        this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
        this.cornerRadius = Math.floor(arcWidth / 2);
        var i = 0;
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var d = _a[_i];
            var outerRadius = this.outerRadius - (i * radiusPerArc);
            var innerRadius = outerRadius - arcWidth;
            var backgroundArc = {
                endAngle: this.angleSpan * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: this.max,
                    name: d.name
                }
            };
            var valueArc = {
                endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
                innerRadius: innerRadius,
                outerRadius: outerRadius,
                data: {
                    value: d.value,
                    name: d.name
                }
            };
            var arc = {
                backgroundArc: backgroundArc,
                valueArc: valueArc
            };
            arcs.push(arc);
            i++;
        }
        return arcs;
    };
    GaugeComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    GaugeComponent.prototype.getValueDomain = function () {
        var values = this.results.map(function (d) { return d.value; });
        var dataMin = Math.min.apply(Math, values);
        var dataMax = Math.max.apply(Math, values);
        if (this.min !== undefined) {
            this.min = Math.min(this.min, dataMin);
        }
        else {
            this.min = dataMin;
        }
        if (this.max !== undefined) {
            this.max = Math.max(this.max, dataMax);
        }
        else {
            this.max = dataMax;
        }
        return [this.min, this.max];
    };
    GaugeComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.angleSpan])
            .domain(this.valueDomain);
    };
    GaugeComponent.prototype.getDisplayValue = function () {
        var value = this.results.map(function (d) { return d.value; }).reduce(function (a, b) { return a + b; }, 0);
        return value.toLocaleString();
    };
    GaugeComponent.prototype.scaleText = function () {
        var _this = this;
        var width = this.textEl.nativeElement.getBoundingClientRect().width;
        if (width === 0)
            return;
        var oldScale = this.resizeScale;
        var availableSpace = this.textRadius;
        this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
        if (this.resizeScale !== oldScale) {
            this.textTransform = "scale(" + this.resizeScale + ", " + this.resizeScale + ")";
            this.cd.markForCheck();
            setTimeout(function () { _this.scaleText(); });
        }
    };
    GaugeComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    GaugeComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GaugeComponent.prototype, "units", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "bigSegments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "smallSegments", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], GaugeComponent.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], GaugeComponent.prototype, "showAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], GaugeComponent.prototype, "angleSpan", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], GaugeComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.ViewChild('textEl'), 
        __metadata('design:type', core_1.ElementRef)
    ], GaugeComponent.prototype, "textEl", void 0);
    GaugeComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-gauge',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"gauge chart\">\n        <svg:g *ngFor=\"let arc of arcs\" [attr.transform]=\"rotation\">\n          <svg:g ngx-charts-gauge-arc\n            [backgroundArc]=\"arc.backgroundArc\"\n            [valueArc]=\"arc.valueArc\"\n            [cornerRadius]=\"cornerRadius\"\n            [colors]=\"colors\"\n            (select)=\"onClick($event)\">\n          </svg:g>\n        </svg:g>\n\n        <svg:g ngx-charts-gauge-axis\n          *ngIf=\"showAxis\"\n          [bigSegments]=\"bigSegments\"\n          [smallSegments]=\"smallSegments\"\n          [min]=\"min\"\n          [max]=\"max\"\n          [radius]=\"outerRadius\"\n          [angleSpan]=\"angleSpan\"\n          [valueScale]=\"valueScale\"\n          [startAngle]=\"startAngle\">\n        </svg:g>\n\n        <svg:text #textEl\n            [style.textAnchor]=\"'middle'\"\n            [attr.transform]=\"textTransform\"\n            alignment-baseline=\"central\">\n          <tspan x=\"0\" dy=\"0\">{{displayValue}}</tspan>\n          <tspan x=\"0\" dy=\"1.2em\">{{units}}</tspan>\n        </svg:text>\n        \n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeComponent);
    return GaugeComponent;
}(base_chart_component_1.BaseChartComponent));
exports.GaugeComponent = GaugeComponent;


/***/ },

/***/ "./src/gauge/gauge.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var linear_gauge_component_1 = __webpack_require__("./src/gauge/linear-gauge.component.ts");
exports.LinearGaugeComponent = linear_gauge_component_1.LinearGaugeComponent;
var gauge_component_1 = __webpack_require__("./src/gauge/gauge.component.ts");
exports.GaugeComponent = gauge_component_1.GaugeComponent;
var gauge_arc_component_1 = __webpack_require__("./src/gauge/gauge-arc.component.ts");
exports.GaugeArcComponent = gauge_arc_component_1.GaugeArcComponent;
var gauge_axis_component_1 = __webpack_require__("./src/gauge/gauge-axis.component.ts");
exports.GaugeAxisComponent = gauge_axis_component_1.GaugeAxisComponent;
var pie_chart_module_1 = __webpack_require__("./src/pie-chart/pie-chart.module.ts");
var bar_chart_module_1 = __webpack_require__("./src/bar-chart/bar-chart.module.ts");
var GaugeModule = (function () {
    function GaugeModule() {
    }
    GaugeModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule, pie_chart_module_1.PieChartModule, bar_chart_module_1.BarChartModule],
            declarations: [
                linear_gauge_component_1.LinearGaugeComponent,
                gauge_component_1.GaugeComponent,
                gauge_arc_component_1.GaugeArcComponent,
                gauge_axis_component_1.GaugeAxisComponent
            ],
            exports: [
                linear_gauge_component_1.LinearGaugeComponent,
                gauge_component_1.GaugeComponent,
                gauge_arc_component_1.GaugeArcComponent,
                gauge_axis_component_1.GaugeAxisComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], GaugeModule);
    return GaugeModule;
}());
exports.GaugeModule = GaugeModule;


/***/ },

/***/ "./src/gauge/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/gauge/gauge.module.ts"));
__export(__webpack_require__("./src/gauge/gauge.component.ts"));


/***/ },

/***/ "./src/gauge/linear-gauge.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var LinearGaugeComponent = (function (_super) {
    __extends(LinearGaugeComponent, _super);
    function LinearGaugeComponent() {
        _super.apply(this, arguments);
        this.min = 0;
        this.max = 100;
        this.value = 0;
        this.margin = [10, 20, 10, 20];
        this.valueResizeScale = 1;
        this.unitsResizeScale = 1;
        this.valueTextTransform = '';
        this.valueTranslate = '';
        this.unitsTextTransform = '';
        this.unitsTranslate = '';
    }
    LinearGaugeComponent.prototype.ngAfterViewInit = function () {
        var _this = this;
        _super.prototype.ngAfterViewInit.call(this);
        setTimeout(function () {
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.hasPreviousValue = _this.previousValue !== undefined;
            _this.max = Math.max(_this.max, _this.value);
            _this.min = Math.min(_this.min, _this.value);
            if (_this.hasPreviousValue) {
                _this.max = Math.max(_this.max, _this.previousValue);
                _this.min = Math.min(_this.min, _this.previousValue);
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.valueDomain = _this.getValueDomain();
            _this.valueScale = _this.getValueScale();
            _this.displayValue = _this.getDisplayValue();
            _this.setColors();
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.transform = "translate(" + xOffset + ", " + yOffset + ")";
            _this.transformLine = "translate(" + (_this.margin[3] + _this.valueScale(_this.previousValue)) + ", " + yOffset + ")";
            _this.valueTranslate = "translate(0, -15)";
            _this.unitsTranslate = "translate(0, 15)";
            _this.scaleText('value');
            _this.scaleText('units');
        });
    };
    LinearGaugeComponent.prototype.getValueDomain = function () {
        return [this.min, this.max];
    };
    LinearGaugeComponent.prototype.getValueScale = function () {
        return d3_1.default.scaleLinear()
            .range([0, this.dims.width])
            .domain(this.valueDomain);
    };
    LinearGaugeComponent.prototype.getDisplayValue = function () {
        return this.value.toLocaleString();
    };
    LinearGaugeComponent.prototype.scaleText = function (element) {
        var _this = this;
        var el;
        var resizeScale;
        if (element === 'value') {
            el = this.valueTextEl;
            resizeScale = this.valueResizeScale;
        }
        else {
            el = this.unitsTextEl;
            resizeScale = this.unitsResizeScale;
        }
        var _a = el.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0)
            return;
        var oldScale = resizeScale;
        var availableWidth = this.dims.width;
        var availableHeight = Math.max(this.dims.height / 2 - 15, 0);
        var resizeScaleWidth = Math.floor((availableWidth / (width / resizeScale)) * 100) / 100;
        var resizeScaleHeight = Math.floor((availableHeight / (height / resizeScale)) * 100) / 100;
        resizeScale = Math.min(resizeScaleHeight, resizeScaleWidth);
        if (resizeScale !== oldScale) {
            if (element === 'value') {
                this.valueResizeScale = resizeScale;
                this.valueTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            else {
                this.unitsResizeScale = resizeScale;
                this.unitsTextTransform = "scale(" + resizeScale + ", " + resizeScale + ")";
            }
            this.cd.markForCheck();
            setTimeout(function () { _this.scaleText(element); });
        }
    };
    LinearGaugeComponent.prototype.onClick = function () {
        this.select.emit({
            name: 'Value',
            value: this.value
        });
    };
    LinearGaugeComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LinearGaugeComponent.prototype, "min", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LinearGaugeComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], LinearGaugeComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LinearGaugeComponent.prototype, "units", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LinearGaugeComponent.prototype, "previousValue", void 0);
    __decorate([
        core_1.ViewChild('valueTextEl'), 
        __metadata('design:type', core_1.ElementRef)
    ], LinearGaugeComponent.prototype, "valueTextEl", void 0);
    __decorate([
        core_1.ViewChild('unitsTextEl'), 
        __metadata('design:type', core_1.ElementRef)
    ], LinearGaugeComponent.prototype, "unitsTextEl", void 0);
    LinearGaugeComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-linear-gauge',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\"\n      (click)=\"onClick()\">\n      <svg:g class=\"linear-gauge chart\">\n        <svg:g ngx-charts-bar \n          class=\"background-bar\"\n          [width]=\"dims.width\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\">\n        </svg:g>\n        <svg:g ngx-charts-bar \n          [width]=\"valueScale(value)\"\n          [height]=\"3\"\n          [x]=\"margin[3]\"\n          [y]=\"dims.height / 2 + margin[0] - 2\"\n          [fill]=\"colors.getColor(units)\"\n          [data]=\"{}\"\n          [orientation]=\"'horizontal'\"\n          [roundEdges]=\"true\">\n        </svg:g>\n\n        <svg:line \n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"5\" \n          x2=\"0\"\n          y2=\"15\"\n          [attr.stroke]=\"colors.getColor(units)\"          \n        />\n\n        <svg:line \n          *ngIf=\"hasPreviousValue\"\n          [attr.transform]=\"transformLine\"\n          x1=\"0\"\n          y1=\"-5\" \n          x2=\"0\"\n          y2=\"-15\"\n          [attr.stroke]=\"colors.getColor(units)\"          \n        />\n        \n        <svg:g [attr.transform]=\"transform\">        \n          <svg:g [attr.transform]=\"valueTranslate\">\n            <svg:text #valueTextEl\n              class=\"value\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"valueTextTransform\"          \n              alignment-baseline=\"after-edge\">\n              {{displayValue}}\n            </svg:text>        \n          </svg:g>\n          \n          <svg:g [attr.transform]=\"unitsTranslate\">\n            <svg:text #unitsTextEl\n              class=\"units\"\n              [style.textAnchor]=\"'middle'\"\n              [attr.transform]=\"unitsTextTransform\"          \n              alignment-baseline=\"before-edge\">\n              {{units}}\n            </svg:text>        \n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], LinearGaugeComponent);
    return LinearGaugeComponent;
}(base_chart_component_1.BaseChartComponent));
exports.LinearGaugeComponent = LinearGaugeComponent;


/***/ },

/***/ "./src/heat-map/heat-map-cell-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var HeatCellSeriesComponent = (function () {
    function HeatCellSeriesComponent() {
        this.select = new core_1.EventEmitter();
    }
    HeatCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    HeatCellSeriesComponent.prototype.update = function () {
        this.cells = this.getCells();
    };
    HeatCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        var cells = [];
        this.data.map(function (row) {
            row.series.map(function (cell) {
                var value = cell.value;
                var label = cell.name;
                var tooltipLabel = label;
                if (tooltipLabel.constructor.name === 'Date') {
                    tooltipLabel = tooltipLabel.toLocaleDateString();
                }
                cells.push({
                    x: _this.xScale(row.name),
                    y: _this.yScale(cell.name),
                    width: _this.xScale.bandwidth(),
                    height: _this.yScale.bandwidth(),
                    fill: _this.colors.getColor(value),
                    data: value,
                    label: label,
                    series: row.name
                });
            });
        });
        return cells;
    };
    HeatCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, data = _a.data, series = _a.series;
        return "\n      <span class=\"tooltip-label\">" + series + " \u2022 " + label + "</span>\n      <span class=\"tooltip-val\">" + data.toLocaleString() + "</span>\n    ";
    };
    HeatCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.tooltipText;
    };
    HeatCellSeriesComponent.prototype.onClick = function (value, label, series) {
        this.select.emit({
            name: label,
            value: value,
            series: series
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatCellSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatCellSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatCellSeriesComponent.prototype, "select", void 0);
    HeatCellSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-heat-map-cell-series]',
            template: "\n    <svg:g \n      ngx-charts-heat-map-cell \n      *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event, c.label, c.series)\"\n      [gradient]=\"gradient\"\n      ngx-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"getTooltipText(c)\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], HeatCellSeriesComponent);
    return HeatCellSeriesComponent;
}());
exports.HeatCellSeriesComponent = HeatCellSeriesComponent;


/***/ },

/***/ "./src/heat-map/heat-map-cell.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var HeatMapCellComponent = (function () {
    function HeatMapCellComponent(element) {
        this.gradient = false;
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = window.location.href;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id_1.id().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        this.loadAnimation();
    };
    HeatMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatMapCellComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatMapCellComponent.prototype, "select", void 0);
    HeatMapCellComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-heat-map-cell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"circle.gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HeatMapCellComponent);
    return HeatMapCellComponent;
}());
exports.HeatMapCellComponent = HeatMapCellComponent;


/***/ },

/***/ "./src/heat-map/heat-map.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var HeatMapComponent = (function (_super) {
    __extends(HeatMapComponent, _super);
    function HeatMapComponent() {
        _super.apply(this, arguments);
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
    }
    HeatMapComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: 'linear'
            });
            _this.formatDates();
            _this.xDomain = _this.getXDomain();
            _this.yDomain = _this.getYDomain();
            _this.valueDomain = _this.getValueDomain();
            _this.xScale = _this.getXScale();
            _this.yScale = _this.getYScale();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
            _this.rects = _this.getRects();
        });
    };
    HeatMapComponent.prototype.getXDomain = function () {
        var domain = [];
        for (var _i = 0, _a = this.results; _i < _a.length; _i++) {
            var group = _a[_i];
            if (!domain.includes(group.name)) {
                domain.push(group.name);
            }
        }
        return domain;
    };
    HeatMapComponent.prototype.getYDomain = function () {
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
    HeatMapComponent.prototype.getValueDomain = function () {
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
    HeatMapComponent.prototype.getXScale = function () {
        return d3_1.default.scaleBand()
            .rangeRound([0, this.dims.width])
            .paddingInner(0.1)
            .domain(this.xDomain);
    };
    HeatMapComponent.prototype.getYScale = function () {
        return d3_1.default.scaleBand()
            .rangeRound([this.dims.height, 0])
            .paddingInner(0.1)
            .domain(this.yDomain);
    };
    HeatMapComponent.prototype.getRects = function () {
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
    HeatMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    HeatMapComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'linear', this.valueDomain);
    };
    HeatMapComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'linear',
            domain: this.valueDomain,
            colors: this.colors.scale
        };
    };
    HeatMapComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    HeatMapComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatMapComponent.prototype, "gradient", void 0);
    HeatMapComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-heat-map',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"heat-map chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:rect *ngFor=\"let rect of rects\"\n          [attr.x]=\"rect.x\"\n          [attr.y]=\"rect.y\"\n          [attr.rx]=\"rect.rx\"\n          [attr.width]=\"rect.width\"\n          [attr.height]=\"rect.height\"\n          [attr.fill]=\"rect.fill\"\n        />\n        <svg:g ngx-charts-heat-map-cell-series\n          [xScale]=\"xScale\"\n          [yScale]=\"yScale\"\n          [colors]=\"colors\"\n          [data]=\"results\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMapComponent);
    return HeatMapComponent;
}(base_chart_component_1.BaseChartComponent));
exports.HeatMapComponent = HeatMapComponent;


/***/ },

/***/ "./src/heat-map/heat-map.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var heat_map_cell_component_1 = __webpack_require__("./src/heat-map/heat-map-cell.component.ts");
exports.HeatMapCellComponent = heat_map_cell_component_1.HeatMapCellComponent;
var heat_map_cell_series_component_1 = __webpack_require__("./src/heat-map/heat-map-cell-series.component.ts");
exports.HeatCellSeriesComponent = heat_map_cell_series_component_1.HeatCellSeriesComponent;
var heat_map_component_1 = __webpack_require__("./src/heat-map/heat-map.component.ts");
exports.HeatMapComponent = heat_map_component_1.HeatMapComponent;
var HeatMapModule = (function () {
    function HeatMapModule() {
    }
    HeatMapModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                heat_map_cell_component_1.HeatMapCellComponent,
                heat_map_cell_series_component_1.HeatCellSeriesComponent,
                heat_map_component_1.HeatMapComponent
            ],
            exports: [
                heat_map_cell_component_1.HeatMapCellComponent,
                heat_map_cell_series_component_1.HeatCellSeriesComponent,
                heat_map_component_1.HeatMapComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], HeatMapModule);
    return HeatMapModule;
}());
exports.HeatMapModule = HeatMapModule;


/***/ },

/***/ "./src/heat-map/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/heat-map/heat-map.module.ts"));
__export(__webpack_require__("./src/heat-map/heat-map.component.ts"));
__export(__webpack_require__("./src/heat-map/heat-map-cell.component.ts"));
__export(__webpack_require__("./src/heat-map/heat-map-cell-series.component.ts"));


/***/ },

/***/ "./src/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/ngx-charts.module.ts"));
__export(__webpack_require__("./src/common/index.ts"));
__export(__webpack_require__("./src/area-chart/index.ts"));
__export(__webpack_require__("./src/bar-chart/index.ts"));
__export(__webpack_require__("./src/force-directed-graph/index.ts"));
__export(__webpack_require__("./src/heat-map/index.ts"));
__export(__webpack_require__("./src/line-chart/index.ts"));
__export(__webpack_require__("./src/number-card/index.ts"));
__export(__webpack_require__("./src/pie-chart/index.ts"));
__export(__webpack_require__("./src/tree-map/index.ts"));
__export(__webpack_require__("./src/gauge/index.ts"));


/***/ },

/***/ "./src/line-chart/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/line-chart/line-chart.module.ts"));
__export(__webpack_require__("./src/line-chart/line-chart.component.ts"));
__export(__webpack_require__("./src/line-chart/line.component.ts"));
__export(__webpack_require__("./src/line-chart/line-series.component.ts"));


/***/ },

/***/ "./src/line-chart/line-chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var moment = __webpack_require__(1);
var LineChartComponent = (function (_super) {
    __extends(LineChartComponent, _super);
    function LineChartComponent() {
        _super.apply(this, arguments);
        this.showGridLines = true;
        this.curve = d3_1.default.shape.curveLinear;
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [10, 20, 10, 20];
        this.xAxisHeight = 0;
        this.yAxisWidth = 0;
        this.timelineHeight = 50;
        this.timelinePadding = 10;
    }
    LineChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showXAxis: _this.xAxis,
                showYAxis: _this.yAxis,
                xAxisHeight: _this.xAxisHeight,
                yAxisWidth: _this.yAxisWidth,
                showXLabel: _this.showXAxisLabel,
                showYLabel: _this.showYAxisLabel,
                showLegend: _this.legend,
                legendType: _this.schemeType
            });
            if (_this.timeline) {
                _this.dims.height -= (_this.timelineHeight + _this.margin[2] + _this.timelinePadding);
            }
            _this.xDomain = _this.getXDomain();
            if (_this.filteredDomain) {
                _this.xDomain = _this.filteredDomain;
            }
            _this.yDomain = _this.getYDomain();
            _this.seriesDomain = _this.getSeriesDomain();
            _this.xScale = _this.getXScale(_this.xDomain, _this.dims.width);
            _this.yScale = _this.getYScale(_this.yDomain, _this.dims.height);
            _this.updateTimeline();
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
            var pageUrl = window.location.href;
            _this.clipPathId = 'clip' + id_1.id().toString();
            _this.clipPath = "url(" + pageUrl + "#" + _this.clipPathId + ")";
        });
    };
    LineChartComponent.prototype.updateTimeline = function () {
        if (this.timeline) {
            this.timelineWidth = this.width;
            if (this.legend) {
                this.timelineWidth = this.dims.width;
            }
            this.timelineXDomain = this.getXDomain();
            this.timelineXScale = this.getXScale(this.timelineXDomain, this.timelineWidth);
            this.timelineYScale = this.getYScale(this.yDomain, this.timelineHeight);
            this.timelineTransform = "translate(" + this.dims.xOffset + ", " + -this.margin[2] + ")";
        }
    };
    LineChartComponent.prototype.getXDomain = function () {
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
        this.xSet = values;
        return domain;
    };
    LineChartComponent.prototype.getYDomain = function () {
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
    LineChartComponent.prototype.getSeriesDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    LineChartComponent.prototype.getXScale = function (domain, width) {
        var scale;
        if (this.scaleType === 'time') {
            scale = d3_1.default.scaleTime()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'linear') {
            scale = d3_1.default.scaleLinear()
                .range([0, width])
                .domain(domain);
        }
        else if (this.scaleType === 'ordinal') {
            scale = d3_1.default.scalePoint()
                .range([0, width])
                .padding(0.1)
                .domain(domain);
        }
        return scale;
    };
    LineChartComponent.prototype.getYScale = function (domain, height) {
        return d3_1.default.scaleLinear()
            .range([height, 0])
            .domain(domain);
    };
    LineChartComponent.prototype.getScaleType = function (values) {
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
        if (date)
            return 'time';
        if (number)
            return 'linear';
        return 'ordinal';
    };
    LineChartComponent.prototype.isDate = function (value) {
        if (value instanceof Date) {
            return true;
        }
        return false;
    };
    LineChartComponent.prototype.updateDomain = function (domain) {
        this.filteredDomain = domain;
        this.xDomain = this.filteredDomain;
        this.xScale = this.getXScale(this.xDomain, this.dims.width);
    };
    LineChartComponent.prototype.updateHoveredVertical = function (item) {
        this.hoveredVertical = item.value;
    };
    LineChartComponent.prototype.hideCircles = function () {
        this.hoveredVertical = null;
    };
    LineChartComponent.prototype.onClick = function (data, series) {
        if (series) {
            data.series = series.name;
        }
        this.select.emit(data);
    };
    LineChartComponent.prototype.trackBy = function (index, item) {
        return item.name;
    };
    LineChartComponent.prototype.setColors = function () {
        var domain;
        if (this.schemeType === 'ordinal') {
            domain = this.seriesDomain;
        }
        else {
            domain = this.yDomain;
        }
        this.colors = new color_helper_1.ColorHelper(this.scheme, this.schemeType, domain, this.customColors);
    };
    LineChartComponent.prototype.getLegendOptions = function () {
        var opts = {
            scaleType: this.schemeType,
            colors: undefined,
            domain: []
        };
        if (opts.scaleType === 'ordinal') {
            opts.domain = this.seriesDomain;
            opts.colors = this.colors;
        }
        else {
            opts.domain = this.yDomain;
            opts.colors = this.colors.scale;
        }
        return opts;
    };
    LineChartComponent.prototype.updateYAxisWidth = function (_a) {
        var width = _a.width;
        this.yAxisWidth = width;
        this.update();
    };
    LineChartComponent.prototype.updateXAxisHeight = function (_a) {
        var height = _a.height;
        this.xAxisHeight = height;
        this.update();
    };
    LineChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    LineChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "xAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "yAxis", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "showXAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "showYAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "xAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "yAxisLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "autoScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "timeline", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LineChartComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], LineChartComponent.prototype, "showGridLines", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineChartComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], LineChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LineChartComponent.prototype, "schemeType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LineChartComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], LineChartComponent.prototype, "deactivate", void 0);
    __decorate([
        core_1.HostListener('mouseleave'), 
        __metadata('design:type', Function), 
        __metadata('design:paramtypes', []), 
        __metadata('design:returntype', void 0)
    ], LineChartComponent.prototype, "hideCircles", null);
    LineChartComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-line-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:defs>\n        <svg:clipPath [attr.id]=\"clipPathId\">\n          <svg:rect\n            [attr.width]=\"dims.width + 10\"\n            [attr.height]=\"dims.height + 10\"\n            [attr.transform]=\"'translate(-5, -5)'\"/>\n        </svg:clipPath>\n      </svg:defs>\n      <svg:g [attr.transform]=\"transform\" class=\"line-chart chart\">\n        <svg:g ngx-charts-x-axis\n          *ngIf=\"xAxis\"\n          [xScale]=\"xScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showXAxisLabel\"\n          [labelText]=\"xAxisLabel\"\n          (dimensionsChanged)=\"updateXAxisHeight($event)\">\n        </svg:g>\n        <svg:g ngx-charts-y-axis\n          *ngIf=\"yAxis\"\n          [yScale]=\"yScale\"\n          [dims]=\"dims\"\n          [showGridLines]=\"showGridLines\"\n          [showLabel]=\"showYAxisLabel\"\n          [labelText]=\"yAxisLabel\"\n          (dimensionsChanged)=\"updateYAxisWidth($event)\">\n        </svg:g>\n        <svg:g [attr.clip-path]=\"clipPath\">\n          <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n            <svg:g ngx-charts-line-series\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [activeEntries]=\"activeEntries\"\n              [scaleType]=\"scaleType\"\n              [curve]=\"curve\"\n            />\n          </svg:g>\n          <svg:g ngx-charts-area-tooltip\n            [xSet]=\"xSet\"\n            [xScale]=\"xScale\"\n            [yScale]=\"yScale\"\n            [results]=\"results\"\n            [height]=\"dims.height\"\n            [colors]=\"colors\"\n            (hover)=\"updateHoveredVertical($event)\"\n          />\n          <svg:g *ngFor=\"let series of results\">\n            <svg:g ngx-charts-circle-ceries\n              [xScale]=\"xScale\"\n              [yScale]=\"yScale\"\n              [colors]=\"colors\"\n              [data]=\"series\"\n              [scaleType]=\"scaleType\"\n              [visibleValue]=\"hoveredVertical\"\n              [activeEntries]=\"activeEntries\"\n              (select)=\"onClick($event, series)\"\n              (activate)=\"onActivate($event)\"\n              (deactivate)=\"onDeactivate($event)\"\n            />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n      <svg:g ngx-charts-timeline\n        *ngIf=\"timeline && scaleType === 'time'\"\n        [attr.transform]=\"timelineTransform\"\n        [results]=\"results\"\n        [view]=\"[timelineWidth, height]\"\n        [height]=\"timelineHeight\"\n        [scheme]=\"scheme\"\n        [customColors]=\"customColors\"\n        [scaleType]=\"scaleType\"\n        [legend]=\"legend\"\n        (onDomainChange)=\"updateDomain($event)\">\n        <svg:g *ngFor=\"let series of results; trackBy:trackBy\">\n          <svg:g ngx-charts-line-series\n            [xScale]=\"timelineXScale\"\n            [yScale]=\"timelineYScale\"\n            [colors]=\"colors\"\n            [data]=\"series\"\n            [scaleType]=\"scaleType\"\n            [curve]=\"curve\"\n          />\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartComponent);
    return LineChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.LineChartComponent = LineChartComponent;


/***/ },

/***/ "./src/line-chart/line-chart.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var line_component_1 = __webpack_require__("./src/line-chart/line.component.ts");
exports.LineComponent = line_component_1.LineComponent;
var line_chart_component_1 = __webpack_require__("./src/line-chart/line-chart.component.ts");
exports.LineChartComponent = line_chart_component_1.LineChartComponent;
var line_series_component_1 = __webpack_require__("./src/line-chart/line-series.component.ts");
exports.LineSeriesComponent = line_series_component_1.LineSeriesComponent;
var LineChartModule = (function () {
    function LineChartModule() {
    }
    LineChartModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                line_component_1.LineComponent,
                line_chart_component_1.LineChartComponent,
                line_series_component_1.LineSeriesComponent
            ],
            exports: [
                line_component_1.LineComponent,
                line_chart_component_1.LineChartComponent,
                line_series_component_1.LineSeriesComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], LineChartModule);
    return LineChartModule;
}());
exports.LineChartModule = LineChartModule;


/***/ },

/***/ "./src/line-chart/line-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var moment = __webpack_require__(1);
var id_1 = __webpack_require__("./src/utils/id.ts");
var sort_1 = __webpack_require__("./src/utils/sort.ts");
var LineSeriesComponent = (function () {
    function LineSeriesComponent() {
    }
    LineSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    LineSeriesComponent.prototype.update = function () {
        this.updateGradients();
        var line = this.getLineGenerator();
        var area = this.getAreaGenerator();
        var data = this.sortData(this.data.series);
        this.path = line(data) || '';
        this.areaPath = area(data) || '';
    };
    LineSeriesComponent.prototype.getLineGenerator = function () {
        var _this = this;
        return d3_1.default.line()
            .x(function (d) {
            var label = d.name;
            var value;
            if (_this.scaleType === 'time') {
                value = _this.xScale(moment(label).toDate());
            }
            else if (_this.scaleType === 'linear') {
                value = _this.xScale(Number(label));
            }
            else {
                value = _this.xScale(label);
            }
            return value;
        })
            .y(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.getAreaGenerator = function () {
        var _this = this;
        var xProperty = function (d) {
            var label = d.name;
            return _this.xScale(label);
        };
        return d3_1.default.area()
            .x(xProperty)
            .y0(function () { return _this.yScale.range()[0]; })
            .y1(function (d) { return _this.yScale(d.value); })
            .curve(this.curve);
    };
    LineSeriesComponent.prototype.sortData = function (data) {
        if (this.scaleType === 'linear') {
            data = sort_1.sortLinear(data, 'name');
        }
        else if (this.scaleType === 'time') {
            data = sort_1.sortByTime(data, 'name');
        }
        else {
            data = sort_1.sortByDomain(data, 'name', 'asc', this.xScale.domain());
        }
        return data;
    };
    LineSeriesComponent.prototype.updateGradients = function () {
        if (this.colors.scaleType === 'linear') {
            this.hasGradient = true;
            var pageUrl = window.location.href;
            this.gradientId = 'grad' + id_1.id().toString();
            this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
            var values = this.data.series.map(function (d) { return d.value; });
            var max = Math.max.apply(Math, values);
            var min = Math.min.apply(Math, values);
            this.gradientStops = this.colors.getLinearGradientStops(max, min);
            this.areaGradientStops = this.colors.getLinearGradientStops(max);
        }
        else {
            this.hasGradient = false;
            this.gradientStops = undefined;
            this.areaGradientStops = undefined;
        }
    };
    LineSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item !== undefined;
    };
    LineSeriesComponent.prototype.isInactive = function (entry) {
        if (!this.activeEntries || this.activeEntries.length === 0)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name;
        });
        return item === undefined;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeriesComponent.prototype, "xScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeriesComponent.prototype, "yScale", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineSeriesComponent.prototype, "scaleType", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', String)
    ], LineSeriesComponent.prototype, "curve", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], LineSeriesComponent.prototype, "activeEntries", void 0);
    LineSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-line-series]',
            template: "\n    <svg:g>\n      <defs>\n        <svg:g ngx-charts-svg-linear-gradient ng-if=\"hasGradient\"\n          [color]=\"colors.getColor(data.name)\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:g ngx-charts-area\n        class=\"line-highlight\"\n        [data]=\"data\"\n        [path]=\"areaPath\"\n        [fill]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [opacity]=\"0.25\"\n        [startOpacity]=\"0\"\n        [gradient]=\"true\"\n        [stops]=\"areaGradientStops\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />    \n      <svg:g ngx-charts-line\n        class=\"line-series\"\n        [data]=\"data\"\n        [path]=\"path\"\n        [stroke]=\"hasGradient ? gradientUrl : colors.getColor(data.name)\"\n        [class.active]=\"isActive(data)\"\n        [class.inactive]=\"isInactive(data)\"\n      />\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], LineSeriesComponent);
    return LineSeriesComponent;
}());
exports.LineSeriesComponent = LineSeriesComponent;


/***/ },

/***/ "./src/line-chart/line.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var LineComponent = (function () {
    function LineComponent(element) {
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineComponent.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineComponent.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], LineComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], LineComponent.prototype, "select", void 0);
    LineComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-line]',
            template: "\n    <svg:path\n      [@animationState]=\"'active'\"\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
            animations: [
                core_1.trigger('animationState', [
                    core_1.transition('void => *', [
                        core_1.style({
                            strokeDasharray: 2000,
                            strokeDashoffset: 2000,
                        }),
                        core_1.animate(1000, core_1.style({
                            strokeDashoffset: 0
                        }))
                    ])
                ])
            ]
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], LineComponent);
    return LineComponent;
}());
exports.LineComponent = LineComponent;


/***/ },

/***/ "./src/ngx-charts.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var area_chart_module_1 = __webpack_require__("./src/area-chart/area-chart.module.ts");
var bar_chart_module_1 = __webpack_require__("./src/bar-chart/bar-chart.module.ts");
var force_directed_graph_module_1 = __webpack_require__("./src/force-directed-graph/force-directed-graph.module.ts");
var heat_map_module_1 = __webpack_require__("./src/heat-map/heat-map.module.ts");
var line_chart_module_1 = __webpack_require__("./src/line-chart/line-chart.module.ts");
var number_card_module_1 = __webpack_require__("./src/number-card/number-card.module.ts");
var pie_chart_module_1 = __webpack_require__("./src/pie-chart/pie-chart.module.ts");
var tree_map_module_1 = __webpack_require__("./src/tree-map/tree-map.module.ts");
var gauge_module_1 = __webpack_require__("./src/gauge/gauge.module.ts");
var NgxChartsModule = (function () {
    function NgxChartsModule() {
    }
    NgxChartsModule = __decorate([
        core_1.NgModule({
            exports: [
                chart_common_module_1.ChartCommonModule,
                area_chart_module_1.AreaChartModule,
                bar_chart_module_1.BarChartModule,
                force_directed_graph_module_1.ForceDirectedGraphModule,
                heat_map_module_1.HeatMapModule,
                line_chart_module_1.LineChartModule,
                number_card_module_1.NumberCardModule,
                pie_chart_module_1.PieChartModule,
                tree_map_module_1.TreeMapModule,
                gauge_module_1.GaugeModule
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NgxChartsModule);
    return NgxChartsModule;
}());
exports.NgxChartsModule = NgxChartsModule;


/***/ },

/***/ "./src/number-card/card-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var CardSeriesComponent = (function () {
    function CardSeriesComponent(zone) {
        this.zone = zone;
        this.select = new core_1.EventEmitter();
    }
    CardSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardSeriesComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.cards = _this.getCards();
        });
    };
    CardSeriesComponent.prototype.getCards = function () {
        var _this = this;
        return this.data
            .map(function (d, index) {
            var label = d.data.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            d.data.name = label;
            var value = d.data.value;
            return {
                x: d.x,
                y: d.y,
                width: d.width,
                height: d.height,
                color: _this.colors.getColor(label),
                label: label,
                data: d.data,
                tooltipText: label + ": " + value
            };
        });
    };
    CardSeriesComponent.prototype.trackBy = function (index, card) {
        return card.label;
    };
    CardSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeriesComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardSeriesComponent.prototype, "select", void 0);
    CardSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-card-series]',
            template: "\n    <svg:g ngx-charts-card *ngFor=\"let c of cards; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [color]=\"c.color\"\n      [data]=\"c.data\"\n      (select)=\"onClick($event)\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.NgZone])
    ], CardSeriesComponent);
    return CardSeriesComponent;
}());
exports.CardSeriesComponent = CardSeriesComponent;


/***/ },

/***/ "./src/number-card/card.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var color_utils_1 = __webpack_require__("./src/utils/color-utils.ts");
var count_1 = __webpack_require__("./src/common/count/index.ts");
var CardComponent = (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.select = new core_1.EventEmitter();
        this.value = '';
        this.resizeScale = 1;
        this.textFontSize = 35;
        this.textTransform = '';
        this.initialized = false;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        this.zone.run(function () {
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width - 15);
            _this.cardWidth = Math.max(0, _this.width - 5);
            _this.cardHeight = Math.max(0, _this.height - 5);
            _this.label = _this.data.name;
            _this.trimmedLabel = trim_label_helper_1.trimLabel(_this.label, 55);
            _this.value = _this.data.value.toLocaleString();
            setTimeout(function () { return _this.scaleText(); });
            setTimeout(function () { return _this.startCount(); }, 20);
        });
    };
    CardComponent.prototype.getTextColor = function (color) {
        return color_utils_1.invertColor(color);
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var value = this.data.value;
            var decs = count_1.decimalChecker(value);
            var callback = function (_a) {
                var value = _a.value;
                _this.zone.run(function () {
                    _this.value = value.toLocaleString();
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count_1.count(0, value, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var availableWidth = _this.cardWidth * 0.85;
            var availableHeight = _this.cardHeight * 0.60;
            if (!_this.originalWidthRatio) {
                _this.originalWidthRatio = availableWidth / width;
                _this.originalWidth = availableWidth;
            }
            if (!_this.originalHeightRatio) {
                _this.originalHeightRatio = availableHeight / height;
                _this.originalHeight = availableHeight;
            }
            var newWidthRatio = (availableWidth / _this.originalWidth) * _this.originalWidthRatio;
            var newHeightRatio = (availableHeight / _this.originalHeight) * _this.originalHeightRatio;
            _this.resizeScale = Math.min(newWidthRatio, newHeightRatio);
            _this.textFontSize = Number.parseInt((35 * _this.resizeScale).toString());
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], CardComponent.prototype, "select", void 0);
    __decorate([
        core_1.ViewChild('textEl'), 
        __metadata('design:type', core_1.ElementRef)
    ], CardComponent.prototype, "textEl", void 0);
    CardComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-card]',
            template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        style=\"cursor: pointer;\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        x=\"5\"\n        [attr.y]=\"height * 0.7\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"height * 0.3\"\n        style=\"font-size: 12px;\n               pointer-events: none;\n               text-transform: uppercase;\n               overflow: hidden;\n               text-align: center;\n               line-height: 1em;\">\n        <xhtml:p\n          [style.color]=\"getTextColor(color)\"\n          style=\"overflow: hidden;\n                 white-space: nowrap;\n                 text-overflow: ellipsis;\n                 width: 100%;\">\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        [attr.x]=\"cardWidth / 2\"\n        [attr.y]=\"height * 0.30\"\n        dy=\".35em\"\n        class=\"value-text\"\n        [style.fill]=\"getTextColor(color)\"\n        text-anchor=\"middle\"\n        [style.font-size.pt]=\"textFontSize\"\n        style=\"pointer-events: none;\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef, core_1.ChangeDetectorRef, core_1.NgZone])
    ], CardComponent);
    return CardComponent;
}());
exports.CardComponent = CardComponent;


/***/ },

/***/ "./src/number-card/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/number-card/number-card.module.ts"));
__export(__webpack_require__("./src/number-card/number-card.component.ts"));
__export(__webpack_require__("./src/number-card/card.component.ts"));
__export(__webpack_require__("./src/number-card/card-series.component.ts"));


/***/ },

/***/ "./src/number-card/number-card.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var grid_layout_helper_1 = __webpack_require__("./src/common/grid-layout.helper.ts");
var NumberCardComponent = (function (_super) {
    __extends(NumberCardComponent, _super);
    function NumberCardComponent() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
    }
    NumberCardComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.data = grid_layout_helper_1.gridLayout(_this.dims, _this.results, 150);
            _this.setColors();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    NumberCardComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    NumberCardComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    NumberCardComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    NumberCardComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-number-card',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"number-card chart\">\n        <svg:g ngx-charts-card-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCardComponent);
    return NumberCardComponent;
}(base_chart_component_1.BaseChartComponent));
exports.NumberCardComponent = NumberCardComponent;


/***/ },

/***/ "./src/number-card/number-card.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var card_component_1 = __webpack_require__("./src/number-card/card.component.ts");
exports.CardComponent = card_component_1.CardComponent;
var card_series_component_1 = __webpack_require__("./src/number-card/card-series.component.ts");
exports.CardSeriesComponent = card_series_component_1.CardSeriesComponent;
var number_card_component_1 = __webpack_require__("./src/number-card/number-card.component.ts");
exports.NumberCardComponent = number_card_component_1.NumberCardComponent;
var NumberCardModule = (function () {
    function NumberCardModule() {
    }
    NumberCardModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                card_component_1.CardComponent,
                card_series_component_1.CardSeriesComponent,
                number_card_component_1.NumberCardComponent
            ],
            exports: [
                card_component_1.CardComponent,
                card_series_component_1.CardSeriesComponent,
                number_card_component_1.NumberCardComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], NumberCardModule);
    return NumberCardModule;
}());
exports.NumberCardModule = NumberCardModule;


/***/ },

/***/ "./src/pie-chart/advanced-pie-chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var AdvancedPieChartComponent = (function (_super) {
    __extends(AdvancedPieChartComponent, _super);
    function AdvancedPieChartComponent() {
        _super.apply(this, arguments);
        this.activeEntries = [];
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [20, 20, 20, 20];
    }
    AdvancedPieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width * 4 / 12.0,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.setColors();
            var xOffset = _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.legendWidth = _this.width - _this.dims.width - _this.margin[1];
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height) / 2.5;
            _this.innerRadius = _this.outerRadius * 0.75;
            _this.transform = "translate(" + xOffset + " , " + yOffset + ")";
        });
    };
    AdvancedPieChartComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    AdvancedPieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    AdvancedPieChartComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    AdvancedPieChartComponent.prototype.onActivate = function (event) {
        if (this.activeEntries.indexOf(event) > -1)
            return;
        this.activeEntries = [event].concat(this.activeEntries);
        this.activate.emit({ value: event, entries: this.activeEntries });
    };
    AdvancedPieChartComponent.prototype.onDeactivate = function (event) {
        var idx = this.activeEntries.indexOf(event);
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], AdvancedPieChartComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], AdvancedPieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdvancedPieChartComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], AdvancedPieChartComponent.prototype, "deactivate", void 0);
    AdvancedPieChartComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-advanced-pie-chart',
            template: "\n    <div\n      [style.width.px]=\"width\"\n      [style.height.px]=\"height\">\n      <div class=\"advanced-pie chart\"\n        [style.width.px]=\"dims.width\"\n        [style.height.px]=\"dims.height\">\n        <ngx-charts-chart\n          [view]=\"[width, height]\"\n          [showLegend]=\"false\">\n          <svg:g\n            [attr.transform]=\"transform\"\n            class=\"pie chart\">\n            <svg:g ngx-charts-pie-series\n              [colors]=\"colors\"\n              [showLabels]=\"labels\"\n              [series]=\"results\"\n              [innerRadius]=\"innerRadius\"\n              [activeEntries]=\"activeEntries\"\n              [outerRadius]=\"outerRadius\"\n              [gradient]=\"gradient\"\n              (select)=\"onClick($event)\">\n            </svg:g>\n          </svg:g>\n        </ngx-charts-chart>\n      </div>\n      <div \n        class=\"advanced-pie-legend-wrapper\"\n        [style.width.px]=\"width - dims.width\">\n        <ngx-charts-advanced-legend\n          [data]=\"results\"\n          [colors]=\"colors\"\n          [width]=\"width - dims.width - margin[1]\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\">\n        </ngx-charts-advanced-legend>\n      </div>\n    </div>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], AdvancedPieChartComponent);
    return AdvancedPieChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.AdvancedPieChartComponent = AdvancedPieChartComponent;


/***/ },

/***/ "./src/pie-chart/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/pie-chart/pie-chart.module.ts"));
__export(__webpack_require__("./src/pie-chart/pie-chart.component.ts"));
__export(__webpack_require__("./src/pie-chart/pie-arc.component.ts"));
__export(__webpack_require__("./src/pie-chart/pie-grid.component.ts"));
__export(__webpack_require__("./src/pie-chart/pie-series.component.ts"));
__export(__webpack_require__("./src/pie-chart/pie-label.component.ts"));
__export(__webpack_require__("./src/pie-chart/pie-series.component.ts"));


/***/ },

/***/ "./src/pie-chart/pie-arc.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var id_1 = __webpack_require__("./src/utils/id.ts");
var PieArcComponent = (function () {
    function PieArcComponent(element) {
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.update = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.5;
        var pageUrl = window.location.href;
        this.radialGradientId = 'linearGrad' + id_1.id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return d3_1.default.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = d3_1.default.select(this.element).selectAll('.arc').data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween("d", function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieArcComponent.prototype, "startAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieArcComponent.prototype, "endAngle", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Number)
    ], PieArcComponent.prototype, "cornerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArcComponent.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArcComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArcComponent.prototype, "animate", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArcComponent.prototype, "pointerEvents", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieArcComponent.prototype, "isActive", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieArcComponent.prototype, "deactivate", void 0);
    PieArcComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-pie-arc]',
            template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"onClick()\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"pointerEvents ? 'auto' : 'none'\"\n      />\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieArcComponent);
    return PieArcComponent;
}());
exports.PieArcComponent = PieArcComponent;


/***/ },

/***/ "./src/pie-chart/pie-chart.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var PieChartComponent = (function (_super) {
    __extends(PieChartComponent, _super);
    function PieChartComponent() {
        _super.apply(this, arguments);
        this.labels = false;
        this.legend = false;
        this.explodeSlices = false;
        this.doughnut = false;
        this.activeEntries = [];
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.margin = [20, 20, 20, 20];
    }
    PieChartComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            if (_this.labels) {
                _this.margin = [30, 80, 30, 80];
            }
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                showLegend: _this.legend,
                columns: 10
            });
            var xOffset = _this.margin[3] + _this.dims.width / 2;
            var yOffset = _this.margin[0] + _this.dims.height / 2;
            _this.translation = "translate(" + xOffset + ", " + yOffset + ")";
            _this.outerRadius = Math.min(_this.dims.width, _this.dims.height);
            if (_this.labels) {
                // make room for labels
                _this.outerRadius /= 3;
            }
            else {
                _this.outerRadius /= 2;
            }
            _this.innerRadius = 0;
            if (_this.doughnut) {
                _this.innerRadius = _this.outerRadius * 0.75;
            }
            _this.domain = _this.getDomain();
            // sort data according to domain
            _this.data = _this.results.sort(function (a, b) {
                return _this.domain.indexOf(a.name) - _this.domain.indexOf(b.name);
            });
            _this.setColors();
            _this.legendOptions = _this.getLegendOptions();
        });
    };
    PieChartComponent.prototype.getDomain = function () {
        var items = [];
        this.results.map(function (d) {
            var label = d.name;
            if (label.constructor.name === 'Date') {
                label = label.toLocaleDateString();
            }
            else {
                label = label.toLocaleString();
            }
            if (items.indexOf(label) === -1) {
                items.push(label);
            }
        });
        return items;
    };
    PieChartComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieChartComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieChartComponent.prototype.getLegendOptions = function () {
        return {
            scaleType: 'ordinal',
            domain: this.domain,
            colors: this.colors
        };
    };
    PieChartComponent.prototype.onActivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        if (idx > -1) {
            return;
        }
        this.activeEntries = [item].concat(this.activeEntries);
        this.activate.emit({ value: item, entries: this.activeEntries });
    };
    PieChartComponent.prototype.onDeactivate = function (item) {
        var idx = this.activeEntries.findIndex(function (d) {
            return d.name === item.name && d.value === item.value;
        });
        this.activeEntries.splice(idx, 1);
        this.activeEntries = this.activeEntries.slice();
        this.deactivate.emit({ value: event, entries: this.activeEntries });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChartComponent.prototype, "labels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChartComponent.prototype, "legend", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChartComponent.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieChartComponent.prototype, "doughnut", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieChartComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PieChartComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieChartComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PieChartComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', core_1.EventEmitter)
    ], PieChartComponent.prototype, "deactivate", void 0);
    PieChartComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-pie-chart',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      [activeEntries]=\"activeEntries\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"translation\" class=\"pie-chart chart\">\n        <svg:g ngx-charts-pie-series\n          [colors]=\"colors\"\n          [showLabels]=\"labels\"\n          [series]=\"data\"\n          [activeEntries]=\"activeEntries\"\n          [innerRadius]=\"innerRadius\"\n          [outerRadius]=\"outerRadius\"\n          [explodeSlices]=\"explodeSlices\"\n          [gradient]=\"gradient\"\n          (select)=\"onClick($event)\"\n          (activate)=\"onActivate($event)\"\n          (deactivate)=\"onDeactivate($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartComponent);
    return PieChartComponent;
}(base_chart_component_1.BaseChartComponent));
exports.PieChartComponent = PieChartComponent;


/***/ },

/***/ "./src/pie-chart/pie-chart.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var advanced_pie_chart_component_1 = __webpack_require__("./src/pie-chart/advanced-pie-chart.component.ts");
exports.AdvancedPieChartComponent = advanced_pie_chart_component_1.AdvancedPieChartComponent;
var pie_label_component_1 = __webpack_require__("./src/pie-chart/pie-label.component.ts");
exports.PieLabelComponent = pie_label_component_1.PieLabelComponent;
var pie_arc_component_1 = __webpack_require__("./src/pie-chart/pie-arc.component.ts");
exports.PieArcComponent = pie_arc_component_1.PieArcComponent;
var pie_chart_component_1 = __webpack_require__("./src/pie-chart/pie-chart.component.ts");
exports.PieChartComponent = pie_chart_component_1.PieChartComponent;
var pie_grid_component_1 = __webpack_require__("./src/pie-chart/pie-grid.component.ts");
exports.PieGridComponent = pie_grid_component_1.PieGridComponent;
var pie_grid_series_component_1 = __webpack_require__("./src/pie-chart/pie-grid-series.component.ts");
exports.PieGridSeriesComponent = pie_grid_series_component_1.PieGridSeriesComponent;
var pie_series_component_1 = __webpack_require__("./src/pie-chart/pie-series.component.ts");
exports.PieSeriesComponent = pie_series_component_1.PieSeriesComponent;
var PieChartModule = (function () {
    function PieChartModule() {
    }
    PieChartModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                advanced_pie_chart_component_1.AdvancedPieChartComponent,
                pie_label_component_1.PieLabelComponent,
                pie_arc_component_1.PieArcComponent,
                pie_chart_component_1.PieChartComponent,
                pie_grid_component_1.PieGridComponent,
                pie_grid_series_component_1.PieGridSeriesComponent,
                pie_series_component_1.PieSeriesComponent
            ],
            exports: [
                advanced_pie_chart_component_1.AdvancedPieChartComponent,
                pie_label_component_1.PieLabelComponent,
                pie_arc_component_1.PieArcComponent,
                pie_chart_component_1.PieChartComponent,
                pie_grid_component_1.PieGridComponent,
                pie_grid_series_component_1.PieGridSeriesComponent,
                pie_series_component_1.PieSeriesComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], PieChartModule);
    return PieChartModule;
}());
exports.PieChartModule = PieChartModule;


/***/ },

/***/ "./src/pie-chart/pie-grid-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var PieGridSeriesComponent = (function () {
    function PieGridSeriesComponent(element) {
        this.innerRadius = 70;
        this.outerRadius = 80;
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    PieGridSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieGridSeriesComponent.prototype.update = function () {
        this.layout = d3_1.default.pie()
            .value(function (d) { return d.data.value; }).sort(null);
        this.arcs = this.getArcs();
    };
    PieGridSeriesComponent.prototype.getArcs = function () {
        var _this = this;
        return this.layout(this.data).map(function (arc, index) {
            var label = arc.data.data.name;
            var other = arc.data.data.other;
            if (index === 0) {
                arc.startAngle = 0;
            }
            var color = _this.colors(label);
            return {
                data: arc.data.data,
                class: 'arc ' + 'arc' + index,
                fill: color,
                startAngle: other ? 0 : arc.startAngle,
                endAngle: arc.endAngle,
                animate: !other,
                pointerEvents: !other
            };
        });
    };
    PieGridSeriesComponent.prototype.onClick = function (data) {
        this.select.emit({
            name: this.data[0].data.name,
            value: this.data[0].data.value
        });
    };
    PieGridSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieGridSeriesComponent.prototype.label = function (arc) {
        return arc.data.name;
    };
    PieGridSeriesComponent.prototype.color = function (arc) {
        return this.colors(this.label(arc));
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieGridSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieGridSeriesComponent.prototype, "select", void 0);
    PieGridSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-pie-grid-series]',
            template: "\n    <svg:g class=\"pie-grid-arcs\">\n      <svg:g ngx-charts-pie-arc *ngFor=\"let arc of arcs; trackBy:trackBy\"\n        [attr.class]=\"arc.class\"\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [gradient]=\"false\"\n        [pointerEvents]=\"arc.pointerEvents\"\n        [animate]=\"arc.animate\"\n        (select)=\"onClick($event)\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieGridSeriesComponent);
    return PieGridSeriesComponent;
}());
exports.PieGridSeriesComponent = PieGridSeriesComponent;


/***/ },

/***/ "./src/pie-chart/pie-grid.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var grid_layout_helper_1 = __webpack_require__("./src/common/grid-layout.helper.ts");
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var PieGridComponent = (function (_super) {
    __extends(PieGridComponent, _super);
    function PieGridComponent() {
        _super.apply(this, arguments);
        this.margin = [20, 20, 20, 20];
    }
    PieGridComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.data = grid_layout_helper_1.gridLayout(_this.dims, _this.results, 150);
            _this.transform = "translate(" + _this.margin[3] + " , " + _this.margin[0] + ")";
            _this.series = _this.getSeries();
            _this.setColors();
        });
    };
    PieGridComponent.prototype.getTooltipText = function (label, val) {
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieGridComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    PieGridComponent.prototype.getSeries = function () {
        var _this = this;
        var total = this.getTotal();
        return this.data.map(function (d) {
            var baselineLabelHeight = 20;
            var padding = 10;
            var label = label_helper_1.formatLabel(d.data.name);
            var value = d.data.value;
            var radius = (d3_1.default.min([d.width - padding, d.height - baselineLabelHeight]) / 2) - 5;
            var innerRadius = radius * 0.9;
            var count = 0;
            var colors = function () {
                count += 1;
                if (count === 1) {
                    return 'rgba(100,100,100,0.3)';
                }
                else {
                    return _this.colorScale.getColor(label);
                }
            };
            var xPos = d.x + (d.width - padding) / 2;
            var yPos = d.y + (d.height - baselineLabelHeight) / 2;
            return {
                transform: "translate(" + xPos + ", " + yPos + ")",
                colors: colors,
                innerRadius: innerRadius,
                outerRadius: radius,
                label: trim_label_helper_1.trimLabel(label),
                total: value,
                value: value,
                percent: d3_1.default.format(".1p")(d.data.percent),
                data: [d, {
                        data: {
                            other: true,
                            value: total - value,
                            name: d.data.name
                        }
                    }]
            };
        });
    };
    PieGridComponent.prototype.getTotal = function () {
        return this.results
            .map(function (d) { return d.value; })
            .reduce(function (sum, d) { return sum + d; }, 0);
    };
    PieGridComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieGridComponent.prototype.setColors = function () {
        this.colorScale = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    PieGridComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-pie-grid',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"pie-grid chart\">\n        <svg:g\n          *ngFor=\"let series of series\"\n          class=\"pie-grid-item\"\n          [attr.transform]=\"series.transform\">\n          <svg:g ngx-charts-pie-grid-series\n            [colors]=\"series.colors\"\n            [data]=\"series.data\"\n            [innerRadius]=\"series.innerRadius\"\n            [outerRadius]=\"series.outerRadius\"\n            (select)=\"onClick($event)\"\n            ngx-tooltip\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"getTooltipText(series.label, series.value.toLocaleString())\"\n          />\n          <svg:text\n            class=\"label percent-label\"\n            dy=\"-0.5em\"\n            x=\"0\"\n            y=\"5\"\n            ngx-charts-count-up \n            [countTo]=\"series.percent\"\n            [countSuffix]=\"'%'\"\n            text-anchor=\"middle\">\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"0.5em\"\n            x=\"0\"\n            y=\"5\"\n            text-anchor=\"middle\">\n            {{series.label}}\n          </svg:text>\n          <svg:text\n            class=\"label\"\n            dy=\"1.23em\"\n            x=\"0\"\n            [attr.y]=\"series.outerRadius\"\n            text-anchor=\"middle\"\n            ngx-charts-count-up \n            [countTo]=\"series.total\"\n            [countPrefix]=\"'Total: '\">\n          </svg:text>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], PieGridComponent);
    return PieGridComponent;
}(base_chart_component_1.BaseChartComponent));
exports.PieGridComponent = PieGridComponent;


/***/ },

/***/ "./src/pie-chart/pie-label.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var trim_label_helper_1 = __webpack_require__("./src/common/trim-label.helper.ts");
var d3_1 = __webpack_require__("./src/d3.ts");
var PieLabelComponent = (function () {
    function PieLabelComponent(element) {
        this.element = element.nativeElement;
        this.trimLabel = trim_label_helper_1.trimLabel;
    }
    PieLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieLabelComponent.prototype.update = function () {
        var factor = 1.5;
        var outerArc = d3_1.default.arc()
            .innerRadius(this.radius * factor)
            .outerRadius(this.radius * factor);
        var startRadius = this.radius;
        if (this.explodeSlices) {
            startRadius = this.radius * this.value / this.max;
        }
        var innerArc = d3_1.default.arc()
            .innerRadius(startRadius)
            .outerRadius(startRadius);
        this.labelXY = outerArc.centroid(this.data);
        this.labelXY[0] = this.radius * factor * (this.midAngle(this.data) < Math.PI ? 1 : -1);
        this.labelXY[1] = this.data.pos[1];
        this.line = "M" + innerArc.centroid(this.data) + "L" + outerArc.centroid(this.data) + "L" + this.labelXY;
        this.transform = "translate(" + this.labelXY + ")";
        this.loadAnimation();
    };
    PieLabelComponent.prototype.textAnchor = function () {
        return this.midAngle(this.data) < Math.PI ? "start" : "end";
    };
    PieLabelComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieLabelComponent.prototype.loadAnimation = function () {
        var label = d3_1.default.select(this.element).select('.label');
        var line = d3_1.default.select(this.element).select('.line');
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "radius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "color", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "max", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieLabelComponent.prototype, "explodeSlices", void 0);
    PieLabelComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-pie-label]',
            template: "\n    <title>{{label}}</title>\n    <svg:text\n      class=\"pie-label\"\n      [attr.transform]=\"transform\"\n      dy=\".35em\"\n      [style.textAnchor]=\"textAnchor()\"\n      [style.shapeRendering]=\"'crispEdges'\"\n      [style.textTransform]=\"'uppercase'\">\n      {{trimLabel(label, 10)}}\n    </svg:text>\n    <svg:path\n      [attr.d]=\"line\"\n      [attr.stroke]=\"color\"\n      fill=\"none\"\n      class=\"line\"\n      [style.strokeDasharray]=\"2000\"\n      [style.strokeDashoffset]=\"0\">\n    </svg:path>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], PieLabelComponent);
    return PieLabelComponent;
}());
exports.PieLabelComponent = PieLabelComponent;


/***/ },

/***/ "./src/pie-chart/pie-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var label_helper_1 = __webpack_require__("./src/common/label.helper.ts");
var PieSeriesComponent = (function () {
    function PieSeriesComponent() {
        this.series = [];
        this.innerRadius = 60;
        this.outerRadius = 80;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
    }
    PieSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieSeriesComponent.prototype.update = function () {
        var pie = d3_1.default.pie()
            .value(function (d) { return d.value; })
            .sort(null);
        var arcData = pie(this.series);
        this.max = d3_1.default.max(arcData, function (d) {
            return d.value;
        });
        this.data = this.calculateLabelPositions(arcData);
    };
    PieSeriesComponent.prototype.midAngle = function (d) {
        return d.startAngle + (d.endAngle - d.startAngle) / 2;
    };
    PieSeriesComponent.prototype.outerArc = function () {
        var factor = 1.5;
        return d3_1.default.arc()
            .innerRadius(this.outerRadius * factor)
            .outerRadius(this.outerRadius * factor);
    };
    PieSeriesComponent.prototype.calculateLabelPositions = function (pieData) {
        var _this = this;
        var minDistance = 10;
        var labelPositions = pieData;
        labelPositions.forEach(function (d) {
            d.pos = _this.outerArc().centroid(d);
            d.pos[0] = _this.outerRadius * (_this.midAngle(d) < Math.PI ? 1 : -1);
        });
        for (var i = 0; i < labelPositions.length - 1; i++) {
            var a = labelPositions[i];
            for (var j = i + 1; j < labelPositions.length; j++) {
                var b = labelPositions[j];
                // if they're on the same side
                if (b.pos[0] * a.pos[0] > 0) {
                    // if they're overlapping
                    if (Math.abs(b.pos[1] - a.pos[1]) <= minDistance) {
                        // push the second one down
                        labelPositions[j].pos[1] = b.pos[1] + minDistance;
                        j--;
                    }
                }
            }
        }
        return labelPositions;
    };
    PieSeriesComponent.prototype.labelVisible = function (arc) {
        return this.showLabels && (arc.endAngle - arc.startAngle > Math.PI / 30);
    };
    PieSeriesComponent.prototype.label = function (arc) {
        return label_helper_1.formatLabel(arc.data.name);
    };
    PieSeriesComponent.prototype.tooltipText = function (arc) {
        var label = this.label(arc);
        var val = label_helper_1.formatLabel(arc.data.value);
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + val + "</span>\n    ";
    };
    PieSeriesComponent.prototype.color = function (arc) {
        return this.colors.getColor(this.label(arc));
    };
    PieSeriesComponent.prototype.trackBy = function (index, item) {
        return item.data.name;
    };
    PieSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    PieSeriesComponent.prototype.isActive = function (entry) {
        if (!this.activeEntries)
            return false;
        var item = this.activeEntries.find(function (d) {
            return entry.name === d.name && entry.series === d.series;
        });
        return item !== undefined;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "series", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "innerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "outerRadius", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "explodeSlices", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "showLabels", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], PieSeriesComponent.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Array)
    ], PieSeriesComponent.prototype, "activeEntries", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "select", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "activate", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], PieSeriesComponent.prototype, "deactivate", void 0);
    PieSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-pie-series]',
            template: "\n    <svg:g *ngFor=\"let arc of data; trackBy:trackBy\">\n      <svg:g ngx-charts-pie-label\n        *ngIf=\"labelVisible(arc)\"\n        [data]=\"arc\"\n        [radius]=\"outerRadius\"\n        [color]=\"color(arc)\"\n        [label]=\"label(arc)\"\n        [max]=\"max\"\n        [value]=\"arc.value\"\n        [explodeSlices]=\"explodeSlices\">\n      </svg:g>\n      <svg:g \n        ngx-charts-pie-arc\n        [startAngle]=\"arc.startAngle\"\n        [endAngle]=\"arc.endAngle\"\n        [innerRadius]=\"innerRadius\"\n        [outerRadius]=\"outerRadius\"\n        [fill]=\"color(arc)\"\n        [value]=\"arc.data.value\"\n        [gradient]=\"gradient\" \n        [data]=\"arc.data\"\n        [max]=\"max\"\n        [explodeSlices]=\"explodeSlices\"\n        [isActive]=\"isActive(arc.data)\"\n        (select)=\"onClick($event)\"\n        (activate)=\"activate.emit($event)\"\n        (deactivate)=\"deactivate.emit($event)\"        \n        ngx-tooltip\n        [tooltipPlacement]=\"'top'\"\n        [tooltipType]=\"'tooltip'\"\n        [tooltipTitle]=\"tooltipText(arc)\">\n      </svg:g>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush,
        }), 
        __metadata('design:paramtypes', [])
    ], PieSeriesComponent);
    return PieSeriesComponent;
}());
exports.PieSeriesComponent = PieSeriesComponent;


/***/ },

/***/ "./src/services/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/services/injection.service.ts"));
__export(__webpack_require__("./src/services/injection-registery.service.ts"));


/***/ },

/***/ "./src/services/injection-registery.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var _1 = __webpack_require__("./src/services/index.ts");
var InjectionRegistery = (function () {
    function InjectionRegistery(injectionService) {
        this.injectionService = injectionService;
        this.defaults = {};
        this.components = new Map();
    }
    InjectionRegistery.prototype.getByType = function (type) {
        if (type === void 0) { type = this.type; }
        return this.components.get(type);
    };
    InjectionRegistery.prototype.create = function (bindings) {
        return this.createByType(this.type, bindings);
    };
    InjectionRegistery.prototype.createByType = function (type, bindings) {
        bindings = this.assignDefaults(bindings);
        var component = this.injectComponent(type, bindings);
        this.register(type, component);
        return component;
    };
    InjectionRegistery.prototype.destroy = function (instance) {
        var compsByType = this.components.get(instance.componentType);
        if (compsByType) {
            var idx = compsByType.indexOf(instance);
            if (idx > -1) {
                var component = compsByType[idx];
                component.destroy();
                compsByType.splice(idx, 1);
            }
        }
    };
    InjectionRegistery.prototype.destroyAll = function () {
        this.destroyByType(this.type);
    };
    InjectionRegistery.prototype.destroyByType = function (type) {
        var comps = this.components.get(type);
        if (comps) {
            for (var _i = 0, comps_1 = comps; _i < comps_1.length; _i++) {
                var comp = comps_1[_i];
                this.destroy(comp);
            }
        }
    };
    InjectionRegistery.prototype.assignDefaults = function (bindings) {
        var _a = this.defaults, inputs = _a.inputs, outputs = _a.outputs;
        if (!bindings.inputs && !bindings.outputs) {
            bindings = { inputs: bindings };
        }
        if (inputs) {
            bindings.inputs = Object.assign(inputs, bindings.inputs);
        }
        if (outputs) {
            bindings.outputs = Object.assign(outputs, bindings.outputs);
        }
        return bindings;
    };
    InjectionRegistery.prototype.injectComponent = function (type, bindings) {
        return this.injectionService.appendComponent(type, bindings);
    };
    InjectionRegistery.prototype.register = function (type, component) {
        if (!this.components.has(type)) {
            this.components.set(type, []);
        }
        var types = this.components.get(type);
        types.push(component);
    };
    InjectionRegistery = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [_1.InjectionService])
    ], InjectionRegistery);
    return InjectionRegistery;
}());
exports.InjectionRegistery = InjectionRegistery;


/***/ },

/***/ "./src/services/injection.service.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 *
 * @export
 * @class InjectionService
 */
var InjectionService = (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    /**
     * Gets the root view container to inject the component to.
     *
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainer = function () {
        if (this._container)
            return this._container;
        var rootComponents = this.applicationRef['_rootComponents'];
        if (rootComponents.length)
            return rootComponents[0];
        throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
    };
    /**
     * Overrides the default root view container. This is useful for
     * things like ngUpgrade that doesn't have a ApplicationRef root.
     *
     * @param {any} container
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.setRootViewContainer = function (container) {
        this._container = container;
    };
    /**
     * Gets the html element for a component ref.
     *
     * @param {ComponentRef<any>} componentRef
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getComponentRootNode = function (componentRef) {
        return componentRef.hostView.rootNodes[0];
    };
    /**
     * Gets the root component container html element.
     *
     * @returns {HTMLElement}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.getRootViewContainerNode = function () {
        return this.getComponentRootNode(this.getRootViewContainer());
    };
    /**
     * Projects the bindings onto the component
     *
     * @param {ComponentRef<any>} component
     * @param {*} options
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.projectComponentBindings = function (component, bindings) {
        if (bindings) {
            if (bindings.inputs !== undefined) {
                var bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
                for (var _i = 0, bindingKeys_1 = bindingKeys; _i < bindingKeys_1.length; _i++) {
                    var bindingName = bindingKeys_1[_i];
                    component.instance[bindingName] = bindings.inputs[bindingName];
                }
            }
            if (bindings.outputs !== undefined) {
                var eventKeys = Object.getOwnPropertyNames(bindings.outputs);
                for (var _a = 0, eventKeys_1 = eventKeys; _a < eventKeys_1.length; _a++) {
                    var eventName = eventKeys_1[_a];
                    component.instance[eventName] = bindings.outputs[eventName];
                }
            }
        }
        return component;
    };
    /**
     * Appends a component to a adjacent location
     *
     * @template T
     * @param {Type<T>} componentClass
     * @param {*} [options={}]
     * @param {Element} [location=this.getRootViewContainerNode()]
     * @returns {ComponentRef<any>}
     *
     * @memberOf InjectionService
     */
    InjectionService.prototype.appendComponent = function (componentClass, bindings, location) {
        if (bindings === void 0) { bindings = {}; }
        if (location === void 0) { location = this.getRootViewContainerNode(); }
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var componentRef = componentFactory.create(this.injector);
        var appRef = this.applicationRef;
        var componentRootNode = this.getComponentRootNode(componentRef);
        // project the options passed to the component instance
        this.projectComponentBindings(componentRef, bindings);
        appRef.attachView(componentRef.hostView);
        componentRef.onDestroy(function () {
            appRef.detachView(componentRef.hostView);
        });
        location.appendChild(componentRootNode);
        return componentRef;
    };
    InjectionService = __decorate([
        core_1.Injectable(), 
        __metadata('design:paramtypes', [core_1.ApplicationRef, core_1.ComponentFactoryResolver, core_1.Injector])
    ], InjectionService);
    return InjectionService;
}());
exports.InjectionService = InjectionService;


/***/ },

/***/ "./src/tree-map/index.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
function __export(m) {
    for (var p in m) if (!exports.hasOwnProperty(p)) exports[p] = m[p];
}
__export(__webpack_require__("./src/tree-map/tree-map.module.ts"));
__export(__webpack_require__("./src/tree-map/tree-map.component.ts"));
__export(__webpack_require__("./src/tree-map/tree-map-cell.component.ts"));
__export(__webpack_require__("./src/tree-map/tree-map-cell-series.component.ts"));


/***/ },

/***/ "./src/tree-map/tree-map-cell-series.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var TreeMapCellSeriesComponent = (function () {
    function TreeMapCellSeriesComponent() {
        this.select = new core_1.EventEmitter();
    }
    TreeMapCellSeriesComponent.prototype.ngOnChanges = function (changes) {
        this.cells = this.getCells();
    };
    TreeMapCellSeriesComponent.prototype.getCells = function () {
        var _this = this;
        return this.data.children
            .filter(function (d) {
            return d.depth === 1;
        })
            .map(function (d, index) {
            var label = d.id;
            return {
                x: d.x0,
                y: d.y0,
                width: d.x1 - d.x0,
                height: d.y1 - d.y0,
                fill: _this.colors.getColor(label),
                label: label,
                value: d.value,
                valueType: d.valueType
            };
        });
    };
    TreeMapCellSeriesComponent.prototype.getTooltipText = function (_a) {
        var label = _a.label, value = _a.value;
        return "\n      <span class=\"tooltip-label\">" + label + "</span>\n      <span class=\"tooltip-val\">" + value.toLocaleString() + "</span>\n    ";
    };
    TreeMapCellSeriesComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapCellSeriesComponent.prototype.trackBy = function (index, item) {
        return item.label;
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeriesComponent.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeriesComponent.prototype, "dims", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeriesComponent.prototype, "colors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCellSeriesComponent.prototype, "select", void 0);
    TreeMapCellSeriesComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-tree-map-cell-series]',
            template: "\n    <svg:g ngx-charts-tree-map-cell *ngFor=\"let c of cells; trackBy:trackBy\"\n      [x]=\"c.x\"\n      [y]=\"c.y\"\n      [width]=\"c.width\"\n      [height]=\"c.height\"\n      [fill]=\"c.fill\"\n      [label]=\"c.label\"\n      [value]=\"c.value\"\n      [valueType]=\"c.valueType\"\n      (select)=\"onClick($event)\"\n      ngx-tooltip\n      [tooltipPlacement]=\"'top'\"\n      [tooltipType]=\"'tooltip'\"\n      [tooltipTitle]=\"getTooltipText(c)\"\n    />\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapCellSeriesComponent);
    return TreeMapCellSeriesComponent;
}());
exports.TreeMapCellSeriesComponent = TreeMapCellSeriesComponent;


/***/ },

/***/ "./src/tree-map/tree-map-cell.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var color_utils_1 = __webpack_require__("./src/utils/color-utils.ts");
var TreeMapCellComponent = (function () {
    function TreeMapCellComponent(element) {
        this.select = new core_1.EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            this.loadAnimation();
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return color_utils_1.invertColor(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1)
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height);
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.label,
            value: this.value
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "valueType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCellComponent.prototype, "select", void 0);
    TreeMapCellComponent = __decorate([
        core_1.Component({
            selector: 'g[ngx-charts-tree-map-cell]',
            template: "\n    <svg:g>\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.color]=\"getTextColor()\"\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\">\n            {{label}}\n          </xhtml:span>\n          <xhtml:br />\n          <xhtml:span \n            class=\"treemap-val\" \n            ngx-charts-count-up \n            [countTo]=\"value\">\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeMapCellComponent);
    return TreeMapCellComponent;
}());
exports.TreeMapCellComponent = TreeMapCellComponent;


/***/ },

/***/ "./src/tree-map/tree-map.component.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = __webpack_require__(0);
var d3_1 = __webpack_require__("./src/d3.ts");
var base_chart_component_1 = __webpack_require__("./src/common/base-chart.component.ts");
var view_dimensions_helper_1 = __webpack_require__("./src/common/view-dimensions.helper.ts");
var color_helper_1 = __webpack_require__("./src/common/color.helper.ts");
var TreeMapComponent = (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        _super.apply(this, arguments);
        this.select = new core_1.EventEmitter();
        this.margin = [10, 10, 10, 10];
    }
    TreeMapComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.treemap = d3_1.default.treemap()
                .size([_this.dims.width, _this.dims.height]);
            var rootNode = {
                name: 'root',
                value: 0,
                isRoot: true
            };
            var root = d3_1.default.stratify()
                .id(function (d) {
                var label = d.name;
                if (label.constructor.name === 'Date') {
                    label = label.toLocaleDateString();
                }
                else {
                    label = label.toLocaleString();
                }
                return label;
            })
                .parentId(function (d) { return d.isRoot ? null : 'root'; })([rootNode].concat(_this.results))
                .sum(function (d) { return d.value; });
            _this.data = _this.treemap(root);
            _this.setColors();
            _this.transform = "translate(" + _this.dims.xOffset + " , " + _this.margin[0] + ")";
        });
    };
    TreeMapComponent.prototype.getDomain = function () {
        return this.results.map(function (d) { return d.name; });
    };
    TreeMapComponent.prototype.onClick = function (data) {
        this.select.emit(data);
    };
    TreeMapComponent.prototype.setColors = function () {
        this.colors = new color_helper_1.ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapComponent.prototype, "results", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapComponent.prototype, "select", void 0);
    TreeMapComponent = __decorate([
        core_1.Component({
            selector: 'ngx-charts-tree-map',
            template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
            changeDetection: core_1.ChangeDetectionStrategy.OnPush
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapComponent);
    return TreeMapComponent;
}(base_chart_component_1.BaseChartComponent));
exports.TreeMapComponent = TreeMapComponent;


/***/ },

/***/ "./src/tree-map/tree-map.module.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
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
var core_1 = __webpack_require__(0);
var chart_common_module_1 = __webpack_require__("./src/common/chart-common.module.ts");
var tree_map_cell_component_1 = __webpack_require__("./src/tree-map/tree-map-cell.component.ts");
exports.TreeMapCellComponent = tree_map_cell_component_1.TreeMapCellComponent;
var tree_map_cell_series_component_1 = __webpack_require__("./src/tree-map/tree-map-cell-series.component.ts");
exports.TreeMapCellSeriesComponent = tree_map_cell_series_component_1.TreeMapCellSeriesComponent;
var tree_map_component_1 = __webpack_require__("./src/tree-map/tree-map.component.ts");
exports.TreeMapComponent = tree_map_component_1.TreeMapComponent;
var TreeMapModule = (function () {
    function TreeMapModule() {
    }
    TreeMapModule = __decorate([
        core_1.NgModule({
            imports: [chart_common_module_1.ChartCommonModule],
            declarations: [
                tree_map_cell_component_1.TreeMapCellComponent,
                tree_map_cell_series_component_1.TreeMapCellSeriesComponent,
                tree_map_component_1.TreeMapComponent
            ],
            exports: [
                tree_map_cell_component_1.TreeMapCellComponent,
                tree_map_cell_series_component_1.TreeMapCellSeriesComponent,
                tree_map_component_1.TreeMapComponent
            ]
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMapModule);
    return TreeMapModule;
}());
exports.TreeMapModule = TreeMapModule;


/***/ },

/***/ "./src/utils/color-sets.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
exports.colorSets = [
    {
        'name': 'vivid',
        'selectable': true,
        'group': 'Ordinal',
        'domain': ['#647c8a', '#3f51b5', '#2196f3', '#00b862', '#afdf0a', '#a7b61a', '#f3e562', '#ff9800', '#ff5722', '#ff4514']
    },
    {
        'name': 'natural',
        'selectable': true,
        'group': 'Ordinal',
        'domain': ['#bf9d76', '#e99450', '#d89f59', '#f2dfa7', '#a5d7c6', '#7794b1', '#afafaf', '#707160', '#ba9383', '#d9d5c3']
    },
    {
        'name': 'cool',
        'selectable': true,
        'group': 'Ordinal',
        'domain': ['#a8385d', '#7aa3e5', '#a27ea8', '#aae3f5', '#adcded', '#a95963', '#8796c0', '#7ed3ed', '#50abcc', '#ad6886']
    },
    {
        'name': 'fire',
        'selectable': true,
        'group': 'Ordinal',
        'domain': ['#ff3d00', '#bf360c', '#ff8f00', '#ff6f00', '#ff5722', '#e65100', '#ffca28', '#ffab00']
    },
    {
        'name': 'solar',
        'selectable': true,
        'group': 'Continuous',
        'domain': ['#fff8e1', '#ffecb3', '#ffe082', '#ffd54f', '#ffca28', '#ffc107', '#ffb300', '#ffa000', '#ff8f00', '#ff6f00']
    },
    {
        'name': 'air',
        'selectable': true,
        'group': 'Continuous',
        'domain': ['#e1f5fe', '#b3e5fc', '#81d4fa', '#4fc3f7', '#29b6f6', '#03a9f4', '#039be5', '#0288d1', '#0277bd', '#01579b']
    },
    {
        'name': 'aqua',
        'selectable': true,
        'group': 'Continuous',
        'domain': ['#e0f7fa', '#b2ebf2', '#80deea', '#4dd0e1', '#26c6da', '#00bcd4', '#00acc1', '#0097a7', '#00838f', '#006064']
    },
    {
        'name': 'flame',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738']
    },
    {
        'name': 'ocean',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1']
    },
    {
        'name': 'forest',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32']
    },
    {
        'name': 'horizon',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0']
    },
    {
        'name': 'neons',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600']
    },
    {
        'name': 'picnic',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ['#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8']
    },
    {
        'name': 'night',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
    },
    {
        'name': 'nightLights',
        'selectable': false,
        'group': 'Ordinal',
        'domain': ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
    }
];


/***/ },

/***/ "./src/utils/color-utils.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
 * Converts a hex to RGB
 * http://stackoverflow.com/questions/5623838/rgb-to-hex-and-hex-to-rgb
 *
 * @export
 * @param {string} hex
 * @returns {*}
 */
function hexToRgb(hex) {
    var result = hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, function (m, r, g, b) { return '#' + r + r + g + g + b + b; })
        .substring(1).match(/.{2}/g)
        .map(function (x) { return parseInt(x, 16); });
    return {
        r: result[0],
        g: result[1],
        b: result[2]
    };
}
exports.hexToRgb = hexToRgb;
/**
 * Accepts a hex color and returns a inverted hex color
 * http://stackoverflow.com/questions/9600295/automatically-change-text-color-to-assure-readability
 *
 * @export
 * @param {any} color
 * @returns {string}
 */
function invertColor(hex) {
    var _a = hexToRgb(hex), r = _a.r, g = _a.g, b = _a.b;
    var yiq = ((r * 299) + (g * 587) + (b * 114)) / 1000;
    var darken = (yiq >= 128);
    var depth = darken ? -.8 : .8;
    return shadeRGBColor({ r: r, g: g, b: b }, depth);
}
exports.invertColor = invertColor;
/**
 * Given a rgb, it will darken/lighten
 * http://stackoverflow.com/questions/5560248/programmatically-lighten-or-darken-a-hex-color-or-rgb-and-blend-colors
 *
 * @export
 * @param {any} { r, g, b }
 * @param {any} percent
 * @returns
 */
function shadeRGBColor(_a, percent) {
    var r = _a.r, g = _a.g, b = _a.b;
    var t = percent < 0 ? 0 : 255;
    var p = percent < 0 ? percent * -1 : percent;
    r = (Math.round((t - r) * p) + r);
    g = (Math.round((t - g) * p) + g);
    b = (Math.round((t - b) * p) + b);
    return "rgb(" + r + ", " + g + ", " + b + ")";
}
exports.shadeRGBColor = shadeRGBColor;


/***/ },

/***/ "./src/utils/id.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
var cache = {};
/**
 * Generates a short id.
 *
 * Description:
 *   A 4-character alphanumeric sequence (364 = 1.6 million)
 *   This should only be used for JavaScript specific models.
 *   http://stackoverflow.com/questions/6248666/how-to-generate-short-uid-like-ax4j9z-in-js
 *
 *   Example: `ebgf`
 */
function id() {
    var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    // append a 'a' because neo gets mad
    newId = "a" + newId;
    // ensure not already used
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}
exports.id = id;


/***/ },

/***/ "./src/utils/sort.ts":
/***/ function(module, exports, __webpack_require__) {

"use strict";
"use strict";
var moment = __webpack_require__(1);
function sortLinear(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        if (direction === 'asc') {
            return a[property] - b[property];
        }
        else {
            return b[property] - a[property];
        }
    });
}
exports.sortLinear = sortLinear;
function sortByDomain(data, property, direction, domain) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aVal = a[property];
        var bVal = b[property];
        var aIdx = domain.indexOf(aVal);
        var bIdx = domain.indexOf(bVal);
        if (direction === 'asc') {
            return aIdx - bIdx;
        }
        else {
            return bIdx - aIdx;
        }
    });
}
exports.sortByDomain = sortByDomain;
function sortByTime(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aDate = moment(a[property]);
        var bDate = moment(b[property]);
        if (direction === 'asc') {
            if (aDate.isAfter(bDate))
                return 1;
            if (bDate.isAfter(aDate))
                return -1;
            return 0;
        }
        else {
            if (aDate.isAfter(bDate))
                return -1;
            if (bDate.isAfter(aDate))
                return 1;
            return 0;
        }
    });
}
exports.sortByTime = sortByTime;


/***/ },

/***/ "./src/utils/throttle.ts":
/***/ function(module, exports) {

"use strict";
"use strict";
/**
* Throttle a function
*
* @export
* @param {*} func
* @param {number} wait
* @param {*} [options]
* @returns
*/
function throttle(func, wait, options) {
    options = options || {};
    var context;
    var args;
    var result;
    var timeout = null;
    var previous = 0;
    function later() {
        previous = options.leading === false ? 0 : +new Date();
        timeout = null;
        result = func.apply(context, args);
    }
    return function () {
        var now = +new Date();
        if (!previous && options.leading === false) {
            previous = now;
        }
        var remaining = wait - (now - previous);
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
exports.throttle = throttle;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 *
 * @export
 * @param {number} duration
 * @param {*} [options]
 * @returns
 */
function throttleable(duration, options) {
    return function innerDecorator(target, key, descriptor) {
        return {
            configurable: true,
            enumerable: descriptor.enumerable,
            get: function getter() {
                Object.defineProperty(this, key, {
                    configurable: true,
                    enumerable: descriptor.enumerable,
                    value: throttle(descriptor.value, duration, options)
                });
                return this[key];
            }
        };
    };
}
exports.throttleable = throttleable;


/***/ },

/***/ 0:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_0__;

/***/ },

/***/ 1:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_1__;

/***/ },

/***/ 10:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_10__;

/***/ },

/***/ 11:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_11__;

/***/ },

/***/ 12:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_12__;

/***/ },

/***/ 13:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_13__;

/***/ },

/***/ 14:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_14__;

/***/ },

/***/ 2:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_2__;

/***/ },

/***/ 3:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_3__;

/***/ },

/***/ 4:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_4__;

/***/ },

/***/ 5:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_5__;

/***/ },

/***/ 6:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_6__;

/***/ },

/***/ 7:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_7__;

/***/ },

/***/ 8:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_8__;

/***/ },

/***/ 9:
/***/ function(module, exports) {

module.exports = __WEBPACK_EXTERNAL_MODULE_9__;

/***/ }

/******/ });
});
//# sourceMappingURL=index.map