var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
import { Component, Input, Output, EventEmitter, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import d3 from '../d3';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
export var TreeMapComponent = (function (_super) {
    __extends(TreeMapComponent, _super);
    function TreeMapComponent() {
        _super.apply(this, arguments);
        this.tooltipDisabled = false;
        this.select = new EventEmitter();
        this.margin = [10, 10, 10, 10];
    }
    TreeMapComponent.prototype.update = function () {
        var _this = this;
        _super.prototype.update.call(this);
        this.zone.run(function () {
            _this.dims = calculateViewDimensions({
                width: _this.width,
                height: _this.height,
                margins: _this.margin
            });
            _this.domain = _this.getDomain();
            _this.treemap = d3.treemap()
                .size([_this.dims.width, _this.dims.height]);
            var rootNode = {
                name: 'root',
                value: 0,
                isRoot: true
            };
            var root = d3.stratify()
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
        this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
    };
    TreeMapComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-tree-map',
                    template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"false\">\n      <svg:g [attr.transform]=\"transform\" class=\"tree-map chart\">\n        <svg:g ngx-charts-tree-map-cell-series\n          [colors]=\"colors\"\n          [data]=\"data\"\n          [dims]=\"dims\"\n          [tooltipDisabled]=\"tooltipDisabled\"\n          (select)=\"onClick($event)\"\n        />\n      </svg:g>\n    </ngx-charts-chart>\n  ",
                    styleUrls: ['./tree-map.component.css'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    TreeMapComponent.ctorParameters = function () { return []; };
    TreeMapComponent.propDecorators = {
        'results': [{ type: Input },],
        'tooltipDisabled': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return TreeMapComponent;
}(BaseChartComponent));
//# sourceMappingURL=tree-map.component.js.map