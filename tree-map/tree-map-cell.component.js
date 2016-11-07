"use strict";
var core_1 = require('@angular/core');
var d3_1 = require('../d3');
var TreeMapCell = (function () {
    function TreeMapCell(element) {
        this.initialized = false;
        this.clickHandler = new core_1.EventEmitter();
        this.element = element.nativeElement;
    }
    TreeMapCell.prototype.ngOnChanges = function () {
        this.update();
    };
    TreeMapCell.prototype.update = function () {
        this.formattedValue = this.value;
        if (this.initialized) {
            this.animateToCurrentForm();
        }
        else {
            this.loadAnimation();
            this.initialized = true;
        }
    };
    TreeMapCell.prototype.loadAnimation = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node
            .attr('opacity', 0)
            .attr('x', this.x)
            .attr('y', this.y);
        this.animateToCurrentForm();
    };
    TreeMapCell.prototype.animateToCurrentForm = function () {
        var node = d3_1.default.select(this.element).select('.cell');
        node.transition().duration(750)
            .attr('opacity', 1)
            .attr('x', this.x)
            .attr('y', this.y)
            .attr('width', this.width)
            .attr('height', this.height);
    };
    TreeMapCell.prototype.click = function () {
        this.clickHandler.emit({
            name: this.label,
            value: this.value
        });
    };
    TreeMapCell.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'g[treeMapCell]',
                    template: "\n    <svg:g>\n      <svg:rect\n        [attr.fill]=\"fill\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        [style.cursor]=\"'pointer'\"\n        class=\"cell\"\n        (click)=\"click()\"\n      />\n\n      <svg:foreignObject\n        *ngIf=\"width >= 70 && height >= 35\"\n        [attr.x]=\"x\"\n        [attr.y]=\"y\"\n        [attr.width]=\"width\"\n        [attr.height]=\"height\"\n        class=\"label\"\n        [style.pointer-events]=\"'none'\">\n        <xhtml:p\n          [style.height]=\"height + 'px'\"\n          [style.width]=\"width + 'px'\">\n          {{label}}\n          <xhtml:br/>\n          {{formattedValue}}\n        </xhtml:p>\n      </svg:foreignObject>\n    </svg:g>\n  "
                },] },
    ];
    TreeMapCell.ctorParameters = [
        { type: core_1.ElementRef, },
    ];
    TreeMapCell.propDecorators = {
        'fill': [{ type: core_1.Input },],
        'x': [{ type: core_1.Input },],
        'y': [{ type: core_1.Input },],
        'width': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
        'label': [{ type: core_1.Input },],
        'value': [{ type: core_1.Input },],
        'valueType': [{ type: core_1.Input },],
        'clickHandler': [{ type: core_1.Output },],
    };
    return TreeMapCell;
}());
exports.TreeMapCell = TreeMapCell;
//# sourceMappingURL=tree-map-cell.component.js.map