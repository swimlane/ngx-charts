"use strict";
var core_1 = require('@angular/core');
var id_1 = require("../utils/id");
var d3_1 = require('../d3');
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
        this.loadAnimation();
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
    HeatMapCellComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[heatMapCell]',
                    template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    HeatMapCellComponent.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    HeatMapCellComponent.propDecorators = {
        'fill': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'label': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
    };
    return HeatMapCellComponent;
}());
exports.HeatMapCellComponent = HeatMapCellComponent;
//# sourceMappingURL=heat-map-cell.component.js.map