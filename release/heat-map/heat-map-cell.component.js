import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { select } from 'd3-selection';
import { id } from '../utils/id';
var HeatMapCellComponent = /** @class */ (function () {
    function HeatMapCellComponent(element) {
        this.gradient = false;
        this.animations = true;
        this.select = new EventEmitter();
        this.element = element.nativeElement;
    }
    HeatMapCellComponent.prototype.ngOnChanges = function (changes) {
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.startOpacity = 0.3;
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
        if (this.animations) {
            this.loadAnimation();
        }
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
            }
        ];
    };
    HeatMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node.attr('opacity', 0);
        this.animateToCurrentForm();
    };
    HeatMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1);
    };
    HeatMapCellComponent.prototype.onClick = function () {
        this.select.emit(this.data);
    };
    HeatMapCellComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-heat-map-cell]',
                    template: "\n    <svg:g [attr.transform]=\"transform\" class=\"cell\">\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        rx=\"3\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"cell\"\n        style=\"cursor: pointer\"\n        (click)=\"onClick()\"\n      />\n    </svg:g>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    HeatMapCellComponent.ctorParameters = function () { return [
        { type: ElementRef, },
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
        'animations': [{ type: Input },],
        'select': [{ type: Output },],
    };
    return HeatMapCellComponent;
}());
export { HeatMapCellComponent };
//# sourceMappingURL=heat-map-cell.component.js.map