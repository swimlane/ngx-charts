import { Component, Input, ElementRef, ChangeDetectionStrategy } from '@angular/core';
export var AxisLabelComponent = (function () {
    function AxisLabelComponent(element) {
        this.textHeight = 25;
        this.margin = 5;
        this.element = element.nativeElement;
    }
    AxisLabelComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    AxisLabelComponent.prototype.update = function () {
        this.strokeWidth = '0.01';
        this.textAnchor = 'middle';
        this.transform = '';
        switch (this.orient) {
            case 'top':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'bottom':
                this.y = this.offset;
                this.x = this.width / 2;
                break;
            case 'left':
                this.y = -(this.offset + this.textHeight + this.margin);
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            case 'right':
                this.y = this.offset + this.margin;
                this.x = -this.height / 2;
                this.transform = 'rotate(270)';
                break;
            default:
        }
    };
    AxisLabelComponent.decorators = [
        { type: Component, args: [{
                    selector: 'g[ngx-charts-axis-label]',
                    template: "\n    <svg:text\n      [attr.stroke-width]=\"strokeWidth\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.x]=\"x\"\n      [attr.y]=\"y\"\n      [attr.text-anchor]=\"textAnchor\"\n      [attr.transform]=\"transform\">\n      {{label}}\n    </svg:text>\n  ",
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    AxisLabelComponent.ctorParameters = function () { return [
        { type: ElementRef, },
    ]; };
    AxisLabelComponent.propDecorators = {
        'orient': [{ type: Input },],
        'label': [{ type: Input },],
        'offset': [{ type: Input },],
        'width': [{ type: Input },],
        'height': [{ type: Input },],
    };
    return AxisLabelComponent;
}());
//# sourceMappingURL=axis-label.component.js.map