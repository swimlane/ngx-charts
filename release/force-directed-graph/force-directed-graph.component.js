"use strict";
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var core_1 = require('@angular/core');
var chart_component_1 = require('../common/charts/chart.component');
var base_chart_component_1 = require('../common/base-chart.component');
var view_dimensions_helper_1 = require('../common/view-dimensions.helper');
var d3_1 = require('../d3');
var color_sets_1 = require('../utils/color-sets');
var ForceDirectedGraphComponent = (function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent(element, cd, zone) {
        _super.call(this, element, zone, cd);
        this.element = element;
        this.cd = cd;
        this.force = d3_1.default.forceSimulation()
            .force("charge", d3_1.default.forceManyBody())
            .force("collide", d3_1.default.forceCollide(5))
            .force("x", d3_1.default.forceX())
            .force("y", d3_1.default.forceY());
        this.forceLink = d3_1.default.forceLink().id(function (node) { return node.value; });
        this.groupResultsBy = function (node) { return node.value; };
        this.nodes = [];
        this.links = [];
        this.clickHandler = new core_1.EventEmitter();
        this.margin = [0, 0, 0, 0];
        this.results = [];
    }
    ForceDirectedGraphComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
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
                columns: 10
            });
            _this.seriesDomain = _this.getSeriesDomain();
            _this.setColors();
            _this.transform = "translate(" + (_this.dims.xOffset + _this.dims.width / 2) + ", " + (_this.margin[0] + _this.dims.height / 2) + ")";
            if (_this.force) {
                _this.force.nodes(_this.nodes)
                    .force("link", _this.forceLink.links(_this.links))
                    .alpha(0.5).restart();
            }
        });
    };
    ForceDirectedGraphComponent.prototype.onClick = function (data, node) {
        this.clickHandler.emit(data);
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
        this.colors = color_sets_1.colorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
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
    ForceDirectedGraphComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'force-directed-graph',
                    template: "\n    <chart\n      [legend]=\"legend\"\n      (legendLabelClick)=\"onClick($event)\"\n      [view]=\"[width, height]\"\n      [colors]=\"colors\"\n      [legendData]=\"seriesDomain\">\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy:trackLinkBy\">\n            <template *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngOutletContext]=\"{ $implicit: link }\">\n            </template>\n            <svg:line *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\" class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g *ngFor=\"let node of nodes; trackBy:trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors(groupResultsBy(node))\"\n            [attr.stroke]=\"colors(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({name: node.value})\"\n            swui-tooltip\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"node.value\">\n            <template *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngOutletContext]=\"{ $implicit: node }\">\n            </template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </chart>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    ForceDirectedGraphComponent.ctorParameters = [
        { type: core_1.ElementRef, },
        { type: core_1.ChangeDetectorRef, },
        { type: core_1.NgZone, },
    ];
    ForceDirectedGraphComponent.propDecorators = {
        'force': [{ type: core_1.Input },],
        'forceLink': [{ type: core_1.Input },],
        'groupResultsBy': [{ type: core_1.Input },],
        'legend': [{ type: core_1.Input },],
        'nodes': [{ type: core_1.Input },],
        'links': [{ type: core_1.Input },],
        'scheme': [{ type: core_1.Input },],
        'view': [{ type: core_1.Input },],
        'customColors': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
        'linkTemplate': [{ type: core_1.ContentChild, args: ['linkTemplate',] },],
        'nodeTemplate': [{ type: core_1.ContentChild, args: ['nodeTemplate',] },],
        'chart': [{ type: core_1.ViewChild, args: [chart_component_1.ChartComponent, { read: core_1.ElementRef },] },],
        'onDrag': [{ type: core_1.HostListener, args: ['document:mousemove', ['$event'],] },],
        'onDragEnd': [{ type: core_1.HostListener, args: ['document:mouseup',] },],
    };
    return ForceDirectedGraphComponent;
}(base_chart_component_1.BaseChartComponent));
exports.ForceDirectedGraphComponent = ForceDirectedGraphComponent;
//# sourceMappingURL=force-directed-graph.component.js.map