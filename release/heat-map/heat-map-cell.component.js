import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { id } from '../utils/id';
import d3 from '../d3';
export var HeatMapCellComponent = (function () {
    function HeatMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
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
            }];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = d3.select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = d3.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    HeatMapCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-heat-map-cell]',
                    template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          [color]=\"fill\"\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    HeatMapCellComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: LocationStrategy, },
    ]; };
    HeatMapCellComponent.propDecorators = {
        'fill': [{ type: Input },],
        'x': [{ type: Input },],
        'y': [{ type: Input },],
        'width': [{ type: Input },],
        'height': [{ type: Input },],
        'data': [{ type: Input },],
        'label': [{ type: Input },],
        'gradient': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return HeatMapCellComponent;
}());
//# sourceMappingURL=heat-map-cell.component.js.map