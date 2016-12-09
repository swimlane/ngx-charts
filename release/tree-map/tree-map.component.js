"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var color_sets_1 = require('../utils/color-sets');
var TreeMapComponent = (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.select = new core_1.EventEmitter();
        this.margin = [10, 10, 10, 10];
    }
    TreeMapComponent.prototype.ngAfterViewInit = function () {
        this.bindResizeEvents(this.view);
    };
    TreeMapComponent.prototype.ngOnDestroy = function () {
        this.unbindEvents();
    };
    TreeMapComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    TreeMapComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = view_dimensions_helper_1.calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin,
                columns: 12
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
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    TreeMapComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'tree-map',
                    template: "\n    <chart\n      [legend]=\"false\"\n      [view]=\"[width, height]\"\n      (legendLabelClick)=\"onClick($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g treeMapCellSeries\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TreeMapComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    TreeMapComponent.propDecorators = {
        'view': [{ type: core_1.Input },],
        'results': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
    };
    return TreeMapComponent;
}(base_chart_component_1.BaseChartComponent));
exports.TreeMapComponent = TreeMapComponent;
//# sourceMappingURL=tree-map.component.js.map