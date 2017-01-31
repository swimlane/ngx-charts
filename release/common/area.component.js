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
var AreaComponent = (function () {
    function AreaComponent(element, location) {
        this.location = location;
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.select = new core_1.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    AreaComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    AreaComponent.prototype.update = function () {
        var pageUrl = this.location.path();
        this.gradientId = 'grad' + id_1.id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        if (this.gradient || this.stops) {
            this.gradientStops = this.getGradient();
            this.hasGradient = true;
        }
        else {
            this.hasGradient = false;
        }
        this.animateToCurrentForm();
    };
    AreaComponent.prototype.loadAnimation = function () {
        this.areaPath = this.startingPath;
        setTimeout(this.update.bind(this), 100);
    };
    AreaComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    AreaComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.startOpacity
            },
            {
                offset: 100,
                color: this.fill,
                opacity: this.endOpacity
            }
        ];
    };
    return AreaComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "path", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startingPath", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "opacity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "startOpacity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "endOpacity", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "activeLabel", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], AreaComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], AreaComponent.prototype, "stops", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], AreaComponent.prototype, "select", void 0);
AreaComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-area]',
        template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, common_1.Location])
], AreaComponent);
exports.AreaComponent = AreaComponent;
//# sourceMappingURL=area.component.js.map