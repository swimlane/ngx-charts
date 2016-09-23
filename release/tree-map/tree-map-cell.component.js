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
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var TreeMapCell = (function () {
    function TreeMapCell(element) {
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    TreeMapCell.prototype.ngOnChanges = function () {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.loadAnimation();
    };
    TreeMapCell.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0);
        this.animateToCurrentForm();
    };
    TreeMapCell.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    TreeMapCell.prototype.click = function () {
        this.clickHandler.emit(this.label);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "label", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "value", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "valueType", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], TreeMapCell.prototype, "clickHandler", void 0);
    TreeMapCell = __decorate([
        core_1.Component({
            selector: 'g[treeMapCell]',
            template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        (click)=\"click()\"\n      />\n\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        x=\"0\"\n        [attr.y]=\"height/2 - 15\"\n        [attr.width]=\"width\"\n        height=\"40\">\n        <xhtml:p>\n          <xhtml:b>{{label}}</xhtml:b>\n          <xhtml:br/>\n          {{formattedValue}}\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], TreeMapCell);
    return TreeMapCell;
}());
exports.TreeMapCell = TreeMapCell;
//# sourceMappingURL=tree-map-cell.component.js.map