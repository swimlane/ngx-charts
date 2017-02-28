import { Component, Input, ChangeDetectionStrategy, ViewEncapsulation } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
export var ScaleLegendComponent = (function () {
    function ScaleLegendComponent(sanitizer) {
        this.sanitizer = sanitizer;
    }
    ScaleLegendComponent.prototype.ngOnChanges = function (changes) {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = this.sanitizer.bypassSecurityTrustStyle("linear-gradient(to bottom, " + gradientValues + ")");
    };
    /**
     * Generates the string used in the gradient stylesheet properties
     * @param  {array} colors array of colors
     * @param  {array} splits array of splits on a scale of (0, 1)
     * @return {string}
     */
    ScaleLegendComponent.prototype.gradientString = function (colors, splits) {
        // add the 100%
        splits.push(1);
        var pairs = [];
        colors.reverse().forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    ScaleLegendComponent.decorators = [
        { type: Component, args: [{
                    selector: 'ngx-charts-scale-legend',
                    template: "\n    <div\n      class=\"scale-legend\"\n      [style.height.px]=\"height\"\n      [style.width.px]=\"width\">\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[1].toLocaleString() }}</span>\n      </div>\n      <div\n        class=\"scale-legend-wrap\"\n        [style.background]=\"gradient\">\n      </div>\n      <div class=\"scale-legend-label\">\n        <span>{{ valueRange[0].toLocaleString() }}</span>\n      </div>\n    </div>\n  ",
                    styleUrls: ['./scale-legend.component.css'],
                    encapsulation: ViewEncapsulation.None,
                    changeDetection: ChangeDetectionStrategy.OnPush
                },] },
    ];
    /** @nocollapse */
    ScaleLegendComponent.ctorParameters = function () { return [
        { type: DomSanitizer, },
    ]; };
    ScaleLegendComponent.propDecorators = {
        'valueRange': [{ type: Input },],
        'colors': [{ type: Input },],
        'height': [{ type: Input },],
        'width': [{ type: Input },],
    };
    return ScaleLegendComponent;
}());
//# sourceMappingURL=scale-legend.component.js.map