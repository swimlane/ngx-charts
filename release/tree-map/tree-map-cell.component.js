import { Component, Input, Output, EventEmitter, ElementRef, ChangeDetectionStrategy } from '@angular/core';
import { LocationStrategy, PathLocationStrategy } from '@angular/common';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';
import { trimLabel } from '../common/trim-label.helper';
import { id } from '../utils/id';
var TreeMapCellComponent = (function () {
    function TreeMapCellComponent(element, location) {
        this.location = location;
        this.gradient = false;
        this.select = new EventEmitter();
        this.initialized = false;
        this.element = element.nativeElement;
    }
    TreeMapCellComponent.prototype.ngOnChanges = function () {
        this.update();
        var hasValue = this.data && typeof this.data.value !== 'undefined';
        this.valueFormatting = this.valueFormatting || (function (cell) { return cell.value.toLocaleString(); });
        var labelFormatting = this.labelFormatting || (function (cell) { return trimLabel(cell.label, 55); });
        var cellData = {
            data: this.data,
            label: this.label,
            value: this.value
        };
        this.formattedLabel = labelFormatting(cellData);
        var pageUrl = this.location instanceof PathLocationStrategy
            ? this.location.path()
            : '';
        this.gradientId = 'grad' + id().toString();
        this.gradientUrl = "url(" + pageUrl + "#" + this.gradientId + ")";
        this.gradientStops = this.getGradientStops();
    };
    TreeMapCellComponent.prototype.update = function () {
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            this.loadAnimation();
            this.initialized = true;
        }
    };
    TreeMapCellComponent.prototype.loadAnimation = function () {
        var node = select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCellComponent.prototype.getTextColor = function () {
        return invertColor(this.fill);
    };
    TreeMapCellComponent.prototype.animateToCurrentForm = function () {
        var node = select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1)
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height);
    };
    TreeMapCellComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.label,
            value: this.value
        });
    };
    TreeMapCellComponent.prototype.getGradientStops = function () {
        return [
            {
                offset: 0,
                color: this.fill,
                opacity: 0.3
            },
            {
                offset: 100,
                color: this.fill,
                opacity: 1
            }
        ];
    };
    return TreeMapCellComponent;
}());
export { TreeMapCellComponent };
TreeMapCellComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-tree-map-cell]',
                template: "\n    <svg:g>\n      <defs *ngIf=\"gradient\">\n        <svg:g ngx-charts-svg-linear-gradient\n          orientation=\"vertical\"\n          [name]=\"gradientId\"\n          [stops]=\"gradientStops\"\n        />\n      </defs>\n      <svg:rect\n        [attr.fill]=\"gradient ? gradientUrl : fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"onClick()\"\n      />\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.color]=\"getTextColor()\"\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          <xhtml:span class=\"treemap-label\" [innerHTML]=\"formattedLabel\">\n          </xhtml:span>\n          <xhtml:br />\n          <xhtml:span \n            class=\"treemap-val\" \n            ngx-charts-count-up \n            [countTo]=\"value\"\n            [valueFormatting]=\"valueFormatting\">\n          </xhtml:span>\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
TreeMapCellComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: LocationStrategy, },
]; };
TreeMapCellComponent.propDecorators = {
    'data': [{ type: Input },],
    'fill': [{ type: Input },],
    'x': [{ type: Input },],
    'y': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'label': [{ type: Input },],
    'value': [{ type: Input },],
    'valueType': [{ type: Input },],
    'valueFormatting': [{ type: Input },],
    'labelFormatting': [{ type: Input },],
    'gradient': [{ type: Input },],
    'select': [{ type: Output },],
};
//# sourceMappingURL=tree-map-cell.component.js.map