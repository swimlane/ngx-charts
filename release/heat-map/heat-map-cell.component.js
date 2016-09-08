"use strict";
var core_1 = require('@angular/core');
var object_id_1 = require("../utils/object-id");
var d3_1 = require('../d3');
var HeatMapCell = (function () {
    function HeatMapCell(element) {
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCell.prototype.ngOnInit = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = window.location.href;
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    HeatMapCell.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCell.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCell.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], HeatMapCell.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], HeatMapCell.prototype, "clickHandler", void 0);
    HeatMapCell = __decorate([
        core_1.Component({
            selector: 'g[heatMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g svgLinearGradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </defs>\n\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"click()\"\n      />\n\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], HeatMapCell);
    return HeatMapCell;
}());
exports.HeatMapCell = HeatMapCell;
//# sourceMappingURL=heat-map-cell.component.js.map