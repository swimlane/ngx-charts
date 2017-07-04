import { Component, Input, Output, EventEmitter, HostListener, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { select } from 'd3-selection';
import { roundedRect } from '../common/shape.helper';
import { id } from '../utils/id';
var BarComponent = (function () {
    function BarComponent(element, location) {
        this.location = location;
        this.roundEdges = true;
        this.gradient = false;
        this.offset = 0;
        this.isActive = false;
        this.select = new EventEmitter();
        this.activate = new EventEmitter();
        this.deactivate = new EventEmitter();
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
    BarComponent.prototype.loadAnimation = function () {
        this.path = this.getStartingPath();
        setTimeout(this.update.bind(this), 100);
    };
    BarComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.bar');
        var path = this.getPath();
        node.transition().duration(500)
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
        var edges = [false, false, false, false];
        if (this.roundEdges) {
            if (this.orientation === 'vertical') {
                radius = Math.min(this.height, radius);
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
            }
        }
        else {
            if (this.orientation === 'vertical') {
                path = roundedRect(this.x, this.y + this.height, this.width, 1, 0, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                path = roundedRect(this.x, this.y, 1, this.height, 0, this.edges);
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
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
            else if (this.orientation === 'horizontal') {
                radius = Math.min(this.width, radius);
                path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
            }
        }
        else {
            path = roundedRect(this.x, this.y, this.width, this.height, radius, this.edges);
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
    Object.defineProperty(BarComponent.prototype, "edges", {
        get: function () {
            var edges = [false, false, false, false];
            if (this.roundEdges) {
                if (this.orientation === 'vertical') {
                    if (this.data.value > 0) {
                        edges = [true, true, false, false];
                    }
                    else {
                        edges = [false, false, true, true];
                    }
                }
                else if (this.orientation === 'horizontal') {
                    if (this.data.value > 0) {
                        edges = [false, true, false, true];
                    }
                    else {
                        edges = [true, false, true, false];
                    }
                }
            }
            return edges;
        },
        enumerable: true,
        configurable: true
    });
    BarComponent.prototype.onMouseEnter = function () {
        this.activate.emit(this.data);
    };
    BarComponent.prototype.onMouseLeave = function () {
        this.deactivate.emit(this.data);
    };
    return BarComponent;
}());
export { BarComponent };
BarComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-bar]',
                template: "\n    <svg:defs *ngIf=\"hasGradient\">\n      <svg:g ngx-charts-svg-linear-gradient\n        [orientation]=\"orientation\"\n        [name]=\"gradientId\"\n        [stops]=\"gradientStops\"\n      />\n    </svg:defs>\n    <svg:path\n      class=\"bar\"\n      stroke=\"none\"\n      [class.active]=\"isActive\"\n      [attr.d]=\"path\"\n      [attr.fill]=\"hasGradient ? gradientFill : fill\"\n      (click)=\"select.emit(data)\"\n    />\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
BarComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: LocationStrategy, },
]; };
BarComponent.propDecorators = {
    'fill': [{ type: Input },],
    'data': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'x': [{ type: Input },],
    'y': [{ type: Input },],
    'orientation': [{ type: Input },],
    'roundEdges': [{ type: Input },],
    'gradient': [{ type: Input },],
    'offset': [{ type: Input },],
    'isActive': [{ type: Input },],
    'stops': [{ type: Input },],
    'select': [{ type: Output },],
    'activate': [{ type: Output },],
    'deactivate': [{ type: Output },],
    'onMouseEnter': [{ type: HostListener, args: ['mouseenter',] },],
    'onMouseLeave': [{ type: HostListener, args: ['mouseleave',] },],
};
//# sourceMappingURL=bar.component.js.map