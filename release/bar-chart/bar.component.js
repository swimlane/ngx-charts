"use strict";
var core_1 = require('@angular/core');
var object_id_1 = require('../utils/object-id');
var d3_1 = require('../d3');
var Bar = (function () {
    function Bar(element) {
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    Bar.prototype.ngOnInit = function () {
        var pageUrl = window.location.href;
        this.gradientId = 'grad' + object_id_1.default().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.startOpacity = this.getStartOpacity();
        this.loadAnimation();
    };
    Bar.prototype.ngOnChanges = function () {
        this.update();
    };
    Bar.prototype.update = function () {
        this.animateToCurrentForm();
    };
    Bar.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        var startingPath = this.getStartingPath();
        node.attr('d', startingPath);
        this.animateToCurrentForm();
    };
    Bar.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        this.path = this.getPath();
        node.transition().duration(750)
            .attr('d', this.path);
    };
    Bar.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, true, false, true);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, false, false, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, 0, this.height, radius, false, false, false, false);
            }
        }
        return path;
    };
    Bar.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    Bar.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > radius && this.width > radius) {
            radius = 5;
        }
        return radius;
    };
    Bar.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0;
        }
        else {
            return 0.5;
        }
    };
    Bar.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
        var retval;
        retval = "M" + (x + r) + "," + y;
        retval += "h" + (w - 2 * r);
        if (tr) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + r;
        }
        else {
            retval += "h" + r;
            retval += "v" + r;
        }
        retval += "v" + (h - 2 * r);
        if (br) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + r;
        }
        else {
            retval += "v" + r;
            retval += "h" + -r;
        }
        retval += "h" + (2 * r - w);
        if (bl) {
            retval += "a" + r + "," + r + " 0 0 1 " + -r + "," + -r;
        }
        else {
            retval += "h" + -r;
            retval += "v" + -r;
        }
        retval += "v" + (2 * r - h);
        if (tl) {
            retval += "a" + r + "," + r + " 0 0 1 " + r + "," + -r;
        }
        else {
            retval += "v" + -r;
            retval += "h" + r;
        }
        retval += "z";
        return retval;
    };
    Bar.prototype.click = function () {
        this.clickHandler.emit(this.data);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "fill", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "data", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "width", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "height", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "x", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "y", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "orientation", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "roundEdges", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Boolean)
    ], Bar.prototype, "gradient", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "offset", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Bar.prototype, "clickHandler", void 0);
    Bar = __decorate([
        core_1.Component({
            selector: 'g[bar]',
            template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g svgLinearGradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [startOpacity]=\"startOpacity\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.cursor]=\"'pointer'\"\n      (click)=\"click()\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [core_1.ElementRef])
    ], Bar);
    return Bar;
}());
exports.Bar = Bar;
//# sourceMappingURL=bar.component.js.map