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
        this.textFontSize = 12;
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
        this.zone.run(function () {
            var hasValue = _this.data && typeof _this.data.value !== 'undefined';
            var valueFormatting = _this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var labelFormatting = _this.labelFormatting || (function (card) { return trimLabel(card.label, 55); });
            _this.transform = "translate(" + _this.x + " , " + _this.y + ")";
            _this.textWidth = Math.max(0, _this.width) - _this.textPadding[1] - _this.textPadding[3];
            _this.cardWidth = Math.max(0, _this.width);
            _this.cardHeight = Math.max(0, _this.height);
            _this.label = _this.data ? _this.data.name : '';
            var cardData = {
                label: _this.label,
                data: _this.data,
                value: _this.data.value
            };
            _this.formattedLabel = labelFormatting(cardData);
            _this.transformBand = "translate(0 , " + (_this.cardHeight - _this.bandHeight) + ")";
            var value = hasValue ? valueFormatting(cardData) : '';
            _this.value = _this.paddedValue(value);
            _this.setPadding();
            _this.bandPath = roundedRect(0, 0, _this.cardWidth, _this.bandHeight, 3, [false, false, true, true]);
            setTimeout(function () {
                _this.scaleText();
                _this.value = value;
                if (hasValue && !_this.initialized) {
                    setTimeout(function () { return _this.startCount(); }, 20);
                }
            }, 8);
        });
    };
    CardComponent.prototype.paddedValue = function (value) {
        if (this.medianSize && this.medianSize > value.length) {
            value += '\u2007'.repeat(this.medianSize - value.length);
        }
        return value;
    };
    CardComponent.prototype.startCount = function () {
        var _this = this;
        if (!this.initialized) {
            cancelAnimationFrame(this.animationReq);
            var val_1 = this.data.value;
            var decs = decimalChecker(val_1);
            var valueFormatting_1 = this.valueFormatting || (function (card) { return card.value.toLocaleString(); });
            var callback = function (_a) {
                var value = _a.value, finished = _a.finished;
                _this.zone.run(function () {
                    value = finished ? val_1 : value;
                    _this.value = valueFormatting_1({ label: _this.label, data: _this.data, value: value });
                    if (!finished) {
                        _this.value = _this.paddedValue(_this.value);
                    }
                    _this.cd.markForCheck();
                });
            };
            this.animationReq = count(0, val_1, decs, 1, callback);
            this.initialized = true;
        }
    };
    CardComponent.prototype.scaleText = function () {
        var _this = this;
        this.zone.run(function () {
            var _a = _this.textEl.nativeElement.getBoundingClientRect(), width = _a.width, height = _a.height;
            if (width === 0 || height === 0) {
                return;
            }
            var textPadding = _this.textPadding[1] = _this.textPadding[3] = _this.cardWidth / 8;
            var availableWidth = _this.cardWidth - 2 * textPadding;
            var availableHeight = _this.cardHeight / 3;
            var resizeScale = Math.min(availableWidth / width, availableHeight / height);
            _this.textFontSize = Math.floor(_this.textFontSize * resizeScale);
            _this.labelFontSize = Math.min(_this.textFontSize, 12);
            _this.setPadding();
            _this.cd.markForCheck();
        });
    };
    CardComponent.prototype.setPadding = function () {
        this.textPadding[1] = this.textPadding[3] = this.cardWidth / 8;
        var padding = this.cardHeight / 2;
        this.textPadding[0] = padding - this.textFontSize - this.labelFontSize / 2;
        this.textPadding[2] = padding - this.labelFontSize;
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
                template: "\n    <svg:g\n      [attr.transform]=\"transform\"\n      class=\"cell\"\n      (click)=\"onClick()\">\n      <svg:rect\n        class=\"card\"\n        [style.fill]=\"color\"\n        [attr.width]=\"cardWidth\"\n        [attr.height]=\"cardHeight\"\n        rx=\"3\"\n        ry=\"3\"\n      />\n      <svg:path\n        *ngIf=\"bandColor && bandColor !== color\"\n        class=\"card-band\"\n        [attr.fill]=\"bandColor\"\n        [attr.transform]=\"transformBand\"\n        stroke=\"none\"\n        [attr.d]=\"bandPath\"\n      />\n      <title>{{label}}</title>\n      <svg:foreignObject\n        class=\"trimmed-label\"\n        x=\"5\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"cardHeight - textPadding[2]\"\n        [attr.width]=\"textWidth\"\n        [attr.height]=\"labelFontSize + textPadding[2]\"\n        alignment-baseline=\"hanging\">\n        <xhtml:p\n          [style.color]=\"textColor\"\n          [style.fontSize.px]=\"labelFontSize\"\n          [innerHTML]=\"formattedLabel\">\n        </xhtml:p>\n      </svg:foreignObject>\n      <svg:text #textEl\n        class=\"value-text\"\n        [attr.x]=\"textPadding[3]\"\n        [attr.y]=\"textPadding[0]\"\n        [style.fill]=\"textColor\"\n        text-anchor=\"start\"\n        alignment-baseline=\"hanging\"\n        [style.font-size.pt]=\"textFontSize\">\n        {{value}}\n      </svg:text>\n    </svg:g>\n  ",
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
    'valueFormatting': [{ type: Input },],
    'labelFormatting': [{ type: Input },],
    'select': [{ type: Output },],
    'textEl': [{ type: ViewChild, args: ['textEl',] },],
};
//# sourceMappingURL=card.component.js.map