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
var core_1 = require("@angular/core");
var d3_1 = require("../d3");
var color_utils_1 = require("../utils/color-utils");
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
    return TreeMapCellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "y", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "value", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "valueType", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], TreeMapCellComponent.prototype, "select", void 0);
TreeMapCellComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-tree-map-cell]',
        template: "\n    <svg:g>\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.color]=\"getTextColor()\"\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\">\n            {{label}}\n          </xhtml:span>\n          <xhtml:br />\n          <xhtml:span \n            class=\"treemap-val\" \n            ngx-charts-count-up \n            [countTo]=\"value\">\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef])
], TreeMapCellComponent);
exports.TreeMapCellComponent = TreeMapCellComponent;
//# sourceMappingURL=tree-map-cell.component.js.map