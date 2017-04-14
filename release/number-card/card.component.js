import { Component, Input, Output, EventEmitter, ElementRef, ViewChild, ChangeDetectionStrategy, ChangeDetectorRef, NgZone } from '@angular/core';
import { trimLabel } from '../common/trim-label.helper';
import { roundedRect } from '../common/shape.helper';
import { count, decimalChecker } from '../common/count';
var CardComponent = (function () {
    function CardComponent(element, cd, zone) {
        this.cd = cd;
        this.zone = zone;
        this.select = new EventEmitter();
        this.value = '';
        this.resizeScale = 1;
        this.textFontSize = 35;
        this.textTransform = '';
        this.initialized = false;
        this.bandHeight = 10;
        this.textPadding = [10, 20, 10, 20];
        this.labelFontSize = 12;
        this.element = element.nativeElement;
    }
    CardComponent.prototype.ngOnChanges = function (changes) {
        this.update();
    };
    CardComponent.prototype.ngOnDestroy = function () {
        cancelAnimationFrame(this.animationReq);
    };
    CardComponent.prototype.update = function () {
        var _this = this;
        var hasValue = this.data && typeof this.data.value !== 'undefined';
        this.transform = "translate(" + this.x + " , " + this.y + ")";
        this.textWidth = Math.max(0, this.width) - this.textPadding[1] - this.textPadding[3];
        this.cardWidth = Math.max(0, this.width);
        this.cardHeight = Math.max(0, this.height);
        this.label = this.data ? this.data.name : '';
        this.trimmedLabel = trimLabel(this.label, 55);
        this.transformBand = "translate(0 , " + (this.cardHeight - this.bandHeight) + ")";
        var value = this.value = hasValue ? this.data.value.toLocaleString() : '';
        if (this.medianSize && this.medianSize > value.length) {
            this.value = this.value + '\u2007'.repeat(this.medianSize - value.length);
        }
        var textHeight = this.textFontSize + 2 * this.labelFontSize;
        this.textPadding[0] = this.textPadding[2] = (this.cardHeight - textHeight - this.bandHeight) / 2;
        this.bandPath = roundedRect(0, 0, this.cardWidth, this.bandHeight, 3, false, false, true, true);
        setTimeout(function () {
            _this.scaleText();
            _this.value = value;
            setTimeout(function () { return _this.startCount(); }, 20);
        }, 0);
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var val = this.data.value;
            var decs = decimalChecker(val);
            var callback = function (_a) {
                var value = _a.value;
                _this.value = value.toLocaleString();
                if (_this.medianSize && _this.medianSize > value.length) {
                    _this.value = _this.value + '\u2007'.repeat(_this.medianSize - value.length);
                }
                _this.cd.markForCheck();
            };
            this.animationReq = count(0, val, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _a = this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
        if (width === 0 || height === 0) {
            return;
        }
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var availableWidth = this.cardWidth - this.textPadding[1] - this.textPadding[3];
        var availableHeight = this.cardHeight / 3;
        if (!this.originalWidthRatio) {
            this.originalWidthRatio = availableWidth / width;
            this.originalWidth = availableWidth;
        }
        if (!this.originalHeightRatio) {
            this.originalHeightRatio = availableHeight / height;
            this.originalHeight = availableHeight;
        }
        var newWidthRatio = (availableWidth / this.originalWidth) * this.originalWidthRatio;
        var newHeightRatio = (availableHeight / this.originalHeight) * this.originalHeightRatio;
        this.resizeScale = Math.min(newWidthRatio, newHeightRatio);
        this.textFontSize = Number.parseInt((35 * this.resizeScale).toString());
        this.labelFontSize = Math.min(this.textFontSize, 12);
        var textHeight = this.textFontSize + 2 * this.labelFontSize;
        this.textPadding[0] = this.textPadding[2] = (this.cardHeight - textHeight - this.bandHeight) / 2;
        this.cd.markForCheck();
    };
    CardComponent.prototype.onClick = function () {
        this.select.emit({
            name: this.data.name,
            value: this.data.value
        });
    };
    return CardComponent;
}());
export { CardComponent };
CardComponent.decorators = [
    { type: Component, args: [{
                selector: 'g[ngx-charts-card]',
                template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0] + textFontSize + labelFontSize\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\">\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\">\n          {{trimmedLabel}}\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
                changeDetection: ChangeDetectionStrategy.OnPush
            },] },
];
/** @nocollapse */
CardComponent.ctorParameters = function () { return [
    { type: ElementRef, },
    { type: ChangeDetectorRef, },
    { type: NgZone, },
]; };
CardComponent.propDecorators = {
    'color': [{ type: Input },],
    'bandColor': [{ type: Input },],
    'textColor': [{ type: Input },],
    'x': [{ type: Input },],
    'y': [{ type: Input },],
    'width': [{ type: Input },],
    'height': [{ type: Input },],
    'label': [{ type: Input },],
    'data': [{ type: Input },],
    'medianSize': [{ type: Input },],
    'select': [{ type: Output },],
    'textEl': [{ type: ViewChild, args: ['textEl',] },],
};
//# sourceMappingURL=card.component.js.map