"use strict";
var core_1 = require('@angular/core');
var object_id_1 = require("../utils/object-id");
var d3_1 = require('../d3');
var Area = (function () {
    function Area(element) {
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Area.prototype.ngOnInit = function () {
        this.update();
    };
    Area.prototype.ngOnChanges = function () {
        this.update();
    };
    Area.prototype.update = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.loadAnimation();
    };
    Area.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node
            .attr('d', this.startingPath);
        this.animateToCurrentForm();
    };
    Area.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.area');
        node.transition().duration(750)
            .attr('d', this.path);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startingPath", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "opacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "startOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "endOpacity", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Area.prototype, "activeLabel", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Area.prototype, "gradient", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Area.prototype, "clickHandler", void 0);
    Area = __decorate([
        core_1.Component({
            selector: 'g[area]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n        [endOpacity]=\"endOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [attr.opacity]=\"opacity\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Area);
    return Area;
}());
exports.Area = Area;
//# sourceMappingURL=area.component.js.map