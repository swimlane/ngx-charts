import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { interpolate } from 'd3-interpolate';
import { select } from 'd3-selection';
import { arc } from 'd3-shape';
import { id } from '../utils/id';
var PieArcComponent = (function () {
    function PieArcComponent(element, location) {
        this.location = location;
        this.startAngle = 0;
        this.endAngle = Math.PI * 2;
        this.cornerRadius = 0;
        this.explodeSlices = false;
        this.gradient = false;
        this.animate = true;
        this.pointerEvents = true;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    PieArcComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    PieArcComponent.prototype.update = function () {
        var arc = this.calculateArc();
        this.path = arc.startAngle(this.startAngle).endAngle(this.endAngle)();
        this.startOpacity = 0.5;
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.radialGradientId = 'linearGrad' + id().toString();
        this.gradientFill = "url(" + pageUrl + "#" + this.radialGradientId + ")";
        if (this.animate) {
            if (this.initialized) {
                this.updateAnimation();
            }
            else {
                this.loadAnimation();
                this.initialized = true;
            }
        }
    };
    PieArcComponent.prototype.calculateArc = function () {
        var outerRadius = this.outerRadius;
        if (this.explodeSlices && this.innerRadius === 0) {
            outerRadius = this.outerRadius * this.value / this.max;
        }
        return arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolater = interpolate(copyOfD, copyOfD);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        })
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolater = interpolate(this._current, d);
            this._current = interpolater(0);
            return function (t) {
                return arc(interpolater(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    return PieArcComponent;
}());
export { PieArcComponent };
PieArcComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-pie-arc]',
                template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"onClick()\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"pointerEvents ? 'auto' : 'none'\"\n      />\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush,
            },] },
];
/** @nocollapse */
PieArcComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: LocationStrategy, },
]; };
PieArcComponent.propDecorators = {
    'fill': [{ type: Input },],
    'startAngle': [{ type: Input },],
    'endAngle': [{ type: Input },],
    'innerRadius': [{ type: Input },],
    'outerRadius': [{ type: Input },],
    'cornerRadius': [{ type: Input },],
    'value': [{ type: Input },],
    'max': [{ type: Input },],
    'data': [{ type: Input },],
    'explodeSlices': [{ type: Input },],
    'gradient': [{ type: Input },],
    'animate': [{ type: Input },],
    'pointerEvents': [{ type: Input },],
    'isActive': [{ type: Input },],
    'select': [{ type: Output },],
    'activate': [{ type: Output },],
    'deactivate': [{ type: Output },],
};
//# sourceMappingURL=pie-arc.component.js.map