"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var TreeMap = (function (_super) {
    __extends(TreeMap, _super);
    function TreeMap() {
        _super.apply(this, arguments);
        this.margin = [10, 10, 10, 10];
        this.clickHandler = new core_1.EventEmitter();
    }
    TreeMap.prototype.ngOnInit = function () {
        this.dims = view_dimensions_helper_1.calculateViewDimensions(this.view, this.margin, false, false, false, 12);
        var data = [];
        for (var i = 0; i < this.results.data.length; i++) {
            data[i] = {};
            data[i].value = this.results.data[i].value;
            data[i].valueType = this.results.data[i].valueType;
            data[i].label = this.results.data[i].label;
        }
        this.treemap = d3_1.default.treemap()
            .children(function (d) { return d; })
            .size([this.dims.width, this.dims.height])
            .sticky(true)
            .value(function (d) { return d.value; });
        this.data = this.treemap(data);
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
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
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "view", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "results", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "margin", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "scheme", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "customColors", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMap.prototype, "clickHandler", void 0);
    TreeMap = __decorate([
        core_1.Component({
            selector: 'tree-map',
            template: "\n    <chart\n      legend=\"false\"\n      [view]=\"view\">\n      <svg:g [attr.transform]=\"transform\" class=\"treemap\">\n        <svg:g treeMapCellSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (clickHandler)=\"click($event)\"\n        />\n      </svg:g>\n    </chart>\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], TreeMap);
    return TreeMap;
}(base_chart_component_1.BaseChart));
exports.TreeMap = TreeMap;
//# sourceMappingURL=tree-map.component.js.map