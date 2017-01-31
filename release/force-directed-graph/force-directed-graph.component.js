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
var core_1 = require("@angular/core");
var chart_component_1 = require("../common/charts/chart.component");
var base_chart_component_1 = require("../common/base-chart.component");
var view_dimensions_helper_1 = require("../common/view-dimensions.helper");
var d3_1 = require("../d3");
var color_helper_1 = require("../common/color.helper");
var ForceDirectedGraphComponent = (function (_super) {
    __extends(ForceDirectedGraphComponent, _super);
    function ForceDirectedGraphComponent() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.force = d3_1.default.forceSimulation()
            .force('charge', d3_1.default.forceManyBody())
            .force('collide', d3_1.default.forceCollide(5))
            .force('x', d3_1.default.forceX())
            .force('y', d3_1.default.forceY());
        _this.forceLink = d3_1.default.forceLink().id(function (node) { return node.value; });
        _this.nodes = [];
        _this.links = [];
        _this.activeEntries = [];
        _this.activate = new core_1.EventEmitter();
        _this.deactivate = new core_1.EventEmitter();
        _this.margin = [0, 0, 0, 0];
        _this.results = [];
        _this.groupResultsBy = function (node) { return node.value; };
        return _this;
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
            _this.transform = "\n        translate(" + (_this.dims.xOffset + _this.dims.width / 2) + ", " + (_this.margin[0] + _this.dims.height / 2) + ")\n      ";
            if (_this.force) {
                _this.force.nodes(_this.nodes)
                    .force('link', _this.forceLink.links(_this.links))
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
    return ForceDirectedGraphComponent;
}(base_chart_component_1.BaseChartComponent));
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ForceDirectedGraphComponent.prototype, "force", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], ForceDirectedGraphComponent.prototype, "forceLink", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], ForceDirectedGraphComponent.prototype, "legend", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "nodes", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "links", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], ForceDirectedGraphComponent.prototype, "activeEntries", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ForceDirectedGraphComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", core_1.EventEmitter)
], ForceDirectedGraphComponent.prototype, "deactivate", void 0);
__decorate([
    core_1.ContentChild('linkTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], ForceDirectedGraphComponent.prototype, "linkTemplate", void 0);
__decorate([
    core_1.ContentChild('nodeTemplate'),
    __metadata("design:type", core_1.TemplateRef)
], ForceDirectedGraphComponent.prototype, "nodeTemplate", void 0);
__decorate([
    core_1.ViewChild(chart_component_1.ChartComponent, { read: core_1.ElementRef }),
    __metadata("design:type", core_1.ElementRef)
], ForceDirectedGraphComponent.prototype, "chart", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Function)
], ForceDirectedGraphComponent.prototype, "groupResultsBy", void 0);
__decorate([
    core_1.HostListener('document:mousemove', ['$event']),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [MouseEvent]),
    __metadata("design:returntype", void 0)
], ForceDirectedGraphComponent.prototype, "onDrag", null);
__decorate([
    core_1.HostListener('document:mouseup'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, MouseEvent]),
    __metadata("design:returntype", void 0)
], ForceDirectedGraphComponent.prototype, "onDragEnd", null);
ForceDirectedGraphComponent = __decorate([
    core_1.Component({
        selector: 'ngx-charts-force-directed-graph',
        template: "\n    <ngx-charts-chart\n      [view]=\"[width, height]\"\n      [showLegend]=\"legend\"\n      [legendOptions]=\"legendOptions\"\n      (legendLabelClick)=\"onClick($event)\"\n      (legendLabelActivate)=\"onActivate($event)\"\n      (legendLabelDeactivate)=\"onDeactivate($event)\">\n      <svg:g [attr.transform]=\"transform\" class=\"force-directed-graph chart\">\n        <svg:g class=\"links\">\n          <svg:g *ngFor=\"let link of links; trackBy:trackLinkBy\">\n            <template *ngIf=\"linkTemplate\"\n              [ngTemplateOutlet]=\"linkTemplate\"\n              [ngOutletContext]=\"{ $implicit: link }\">\n            </template>\n            <svg:line *ngIf=\"!linkTemplate\"\n              strokeWidth=\"1\" class=\"edge\"\n              [attr.x1]=\"link.source.x\"\n              [attr.y1]=\"link.source.y\"\n              [attr.x2]=\"link.target.x\"\n              [attr.y2]=\"link.target.y\"\n            />\n          </svg:g>\n        </svg:g>\n        <svg:g class=\"nodes\">\n          <svg:g *ngFor=\"let node of nodes; trackBy:trackNodeBy\"\n            [attr.transform]=\"'translate(' + node.x + ',' + node.y + ')'\"\n            [attr.fill]=\"colors.getColor(groupResultsBy(node))\"\n            [attr.stroke]=\"colors.getColor(groupResultsBy(node))\"\n            (mousedown)=\"onDragStart(node, $event)\"\n            (click)=\"onClick({name: node.value})\"\n            ngx-tooltip\n            [tooltipPlacement]=\"'top'\"\n            [tooltipType]=\"'tooltip'\"\n            [tooltipTitle]=\"node.value\">\n            <template *ngIf=\"nodeTemplate\"\n              [ngTemplateOutlet]=\"nodeTemplate\"\n              [ngOutletContext]=\"{ $implicit: node }\">\n            </template>\n            <svg:circle *ngIf=\"!nodeTemplate\" r=\"5\" />\n          </svg:g>\n        </svg:g>\n      </svg:g>\n    </ngx-charts-chart>\n  ",
        styleUrls: [
            '../common/base-chart.component.scss',
            './force-directed-graph.component.scss'
        ],
        encapsulation: core_1.ViewEncapsulation.None,
        changeDetection: core_1.ChangeDetectionStrategy.OnPush,
    })
], ForceDirectedGraphComponent);
exports.ForceDirectedGraphComponent = ForceDirectedGraphComponent;
//# sourceMappingURL=force-directed-graph.component.js.map