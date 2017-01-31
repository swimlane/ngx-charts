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
var common_1 = require("@angular/common");
var id_1 = require("../utils/id");
var d3_1 = require("../d3");
var HeatMapCellComponent = (function () {
    function HeatMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.select = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = this.location.path();
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
            }
        ];
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
    return HeatMapCellComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "y", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "label", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], HeatMapCellComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], HeatMapCellComponent.prototype, "select", void 0);
HeatMapCellComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-heat-map-cell]',
        template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, common_1.Location])
], HeatMapCellComponent);
exports.HeatMapCellComponent = HeatMapCellComponent;
//# sourceMappingURL=heat-map-cell.component.js.map