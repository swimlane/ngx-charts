import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { id } from '../utils/id';
import d3 from '../d3';
export var AreaComponent = (function () {
    function AreaComponent(element, location) {
        this.location = location;
        this.opacity = 1;
        this.startOpacity = 0.5;
        this.endOpacity = 1;
        this.gradient = false;
        this.select = new EventEmitter();
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
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + id().toString();
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
        var node = d3.select(this.element).select('.area');
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
        { type: Component, args: [{
                    selector: 'g[ngx-charts-area]',
                    template: "\n    <svg:defs *ngIf=\"gradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [color]=\"fill\"\n        orientation=\"vertical\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"area\"\n      [attr.d]=\"areaPath\"\n      [attr.fill]=\"gradient ? gradientFill : fill\"\n      [style.opacity]=\"opacity\"\n    />\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AreaComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: LocationStrategy, },
    ]; };
    AreaComponent.propDecorators = {
        'data': [{ type: Input },],
        'path': [{ type: Input },],
        'startingPath': [{ type: Input },],
        'fill': [{ type: Input },],
        'opacity': [{ type: Input },],
        'startOpacity': [{ type: Input },],
        'endOpacity': [{ type: Input },],
        'activeLabel': [{ type: Input },],
        'gradient': [{ type: Input },],
        'stops': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return AreaComponent;
}());
//# sourceMappingURL=area.component.js.map