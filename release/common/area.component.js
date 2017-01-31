"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var id_1 = require('../utils/id');
var d3_1 = require('../d3');
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
            }];
    };
    AreaComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-area]',
                    template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AreaComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: common_1.Location, },
    ]; };
    AreaComponent.propDecorators = {
        'data': [{ type: core_1.Input },],
        'path': [{ type: core_1.Input },],
        'startingPath': [{ type: core_1.Input },],
        'fill': [{ type: core_1.Input },],
        'opacity': [{ type: core_1.Input },],
        'startOpacity': [{ type: core_1.Input },],
        'endOpacity': [{ type: core_1.Input },],
        'activeLabel': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'stops': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
    };
    return AreaComponent;
}());
exports.AreaComponent = AreaComponent;
//# sourceMappingURL=area.component.js.map