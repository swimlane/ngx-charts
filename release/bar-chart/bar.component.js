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
var BarComponent = (function () {
    function BarComponent(element, location) {
        this.location = location;
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
        this.initialized = false;
        this.hasGradient = false;
        this.element = element.nativeElement;
    }
    BarComponent.prototype.ngOnChanges = function (changes) {
        if (!this.initialized) {
            this.loadAnimation();
            this.initialized = true;
        }
        else {
            this.update();
        }
    };
    BarComponent.prototype.update = function () {
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
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(750)
            .attr('d', path);
    };
    BarComponent.prototype.getGradient = function () {
        if (this.stops) {
            return this.stops;
        }
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: this.getStartOpacity()
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    BarComponent.prototype.getStartingPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = this.roundedRect(this.x, this.y + this.height, this.width, 0, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
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
    BarComponent.prototype.getPath = function () {
        var radius = this.getRadius();
        var path;
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, true, true, false, false);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, true, false, true);
            }
        }
        else {
            path = this.roundedRect(this.x, this.y, this.width, this.height, radius, false, false, false, false);
        }
        return path;
    };
    BarComponent.prototype.getRadius = function () {
        var radius = 0;
        if (this.roundEdges && this.height > 5 && this.width > 5) {
            radius = Math.floor(Math.min(5, this.height / 2, this.width / 2));
        }
        return radius;
    };
    BarComponent.prototype.getStartOpacity = function () {
        if (this.roundEdges) {
            return 0.2;
        }
        else {
            return 0.5;
        }
    };
    BarComponent.prototype.roundedRect = function (x, y, w, h, r, tl, tr, bl, br) {
        var retval;
        retval = 'M' + (x + r) + ',' + y;
        retval += 'h' + (w - 2 * r);
        if (tr) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + r;
        }
        else {
            retval += 'h' + r;
            retval += 'v' + r;
        }
        retval += 'v' + (h - 2 * r);
        if (br) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + r;
        }
        else {
            retval += 'v' + r;
            retval += 'h' + -r;
        }
        retval += 'h' + (2 * r - w);
        if (bl) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + -r + ',' + -r;
        }
        else {
            retval += 'h' + -r;
            retval += 'v' + -r;
        }
        retval += 'v' + (2 * r - h);
        if (tl) {
            retval += 'a' + r + ',' + r + ' 0 0 1 ' + r + ',' + -r;
        }
        else {
            retval += 'v' + -r;
            retval += 'h' + r;
        }
        retval += 'z';
        return retval;
    };
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    return BarComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "fill", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "data", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "width", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "height", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "x", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "y", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "orientation", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "roundEdges", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "gradient", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], BarComponent.prototype, "offset", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Boolean)
], BarComponent.prototype, "isActive", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], BarComponent.prototype, "stops", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "select", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "activate", void 0);
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], BarComponent.prototype, "deactivate", void 0);
__decorate([
    core_1.HostListener('mouseenter'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseEnter", null);
__decorate([
    core_1.HostListener('mouseleave'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], BarComponent.prototype, "onMouseLeave", null);
BarComponent = __decorate([
    core_1.Component({
        selector: 'g[ngx-charts-bar]',
        template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [class.active]=\"isActive\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
        changeDetection: core_1.ChangeDetectionStrategy.OnPush
    }),
    __metadata("design:paramtypes", [core_1.ElementRef, common_1.Location])
], BarComponent);
exports.BarComponent = BarComponent;
//# sourceMappingURL=bar.component.js.map