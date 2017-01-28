"use strict";
var core_1 = require('@angular/core');
var common_1 = require('@angular/common');
var d3_1 = require('../d3');
var id_1 = require('../utils/id');
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
        this.select = new core_1.EventEmitter();
        this.activate = new core_1.EventEmitter();
        this.deactivate = new core_1.EventEmitter();
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
        var pageUrl = this.location.path();
        this.radialGradientId = 'linearGrad' + id_1.id().toString();
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
        return d3_1.default.arc()
            .innerRadius(this.innerRadius)
            .outerRadius(outerRadius)
            .cornerRadius(this.cornerRadius);
    };
    PieArcComponent.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition()
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var copyOfD = Object.assign({}, d);
            copyOfD.endAngle = copyOfD.startAngle;
            var interpolate = d3_1.default.interpolate(copyOfD, copyOfD);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        })
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.updateAnimation = function () {
        var node = d3_1.default.select(this.element)
            .selectAll('.arc')
            .data([{ startAngle: this.startAngle, endAngle: this.endAngle }]);
        var arc = this.calculateArc();
        node
            .transition().duration(750)
            .attrTween('d', function (d) {
            this._current = this._current || d;
            var interpolate = d3_1.default.interpolate(this._current, d);
            this._current = interpolate(0);
            return function (t) {
                return arc(interpolate(t));
            };
        });
    };
    PieArcComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    PieArcComponent.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[ngx-charts-pie-arc]',
                    template: "\n    <svg:g class=\"arc-group\">\n      <svg:defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-radial-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"radialGradientId\"\n          [startOpacity]=\"startOpacity\"\n        />\n      </svg:defs>\n      <svg:path\n        [attr.d]=\"path\"\n        class=\"arc\"\n        [class.active]=\"isActive\"\n        [attr.fill]=\"gradient ? gradientFill : fill\"\n        (click)=\"onClick()\"\n        (mouseenter)=\"activate.emit(data)\"\n        (mouseleave)=\"deactivate.emit(data)\"\n        [style.pointer-events]=\"pointerEvents ? 'auto' : 'none'\"\n      />\n    </svg:g>\n  ",
                    changeDetection: core_1.ChangeDetectionStrategy.OnPush,
                },] },
    ];
    /** @nocollapse */
    PieArcComponent.ctorParameters = function () { return [
        { type: core_1.ElementRef, },
        { type: common_1.Location, },
    ]; };
    PieArcComponent.propDecorators = {
        'fill': [{ type: core_1.Input },],
        'startAngle': [{ type: core_1.Input },],
        'endAngle': [{ type: core_1.Input },],
        'innerRadius': [{ type: core_1.Input },],
        'outerRadius': [{ type: core_1.Input },],
        'cornerRadius': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'max': [{ type: core_1.Input },],
        'data': [{ type: core_1.Input },],
        'explodeSlices': [{ type: core_1.Input },],
        'gradient': [{ type: core_1.Input },],
        'animate': [{ type: core_1.Input },],
        'pointerEvents': [{ type: core_1.Input },],
        'isActive': [{ type: core_1.Input },],
        'select': [{ type: core_1.Output },],
        'activate': [{ type: core_1.Output },],
        'deactivate': [{ type: core_1.Output },],
    };
    return PieArcComponent;
}());
exports.PieArcComponent = PieArcComponent;
//# sourceMappingURL=pie-arc.component.js.map