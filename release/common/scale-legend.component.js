"use strict";
var core_1 = require('@angular/core');
var ScaleLegend = (function () {
    function ScaleLegend() {
    }
    ScaleLegend.prototype.ngOnChanges = function () {
        var gradientValues = this.gradientString(this.colors.range(), this.colors.domain());
        this.gradient = "linear-gradient(to bottom, " + gradientValues + ")";
    };
    ScaleLegend.prototype.gradientString = function (colors, splits) {
        splits.push(1);
        var pairs = [];
        colors.forEach(function (c, i) {
            pairs.push(c + " " + Math.round(splits[i] * 100) + "%");
        });
        return pairs.join(', ');
    };
    ScaleLegend.decorators = [
        { type: core_1.Component, args: [{
                    selector: 'scale-legend',
                    template: "\n    <div>\n      <div\n        style=\"padding: 10px 0px; width: 30px; text-align: center;\"\n        [style.height]=\"(height - 40) + 'px'\">\n\n        <div>\n          <span>{{valueRange[0]}}</span>\n        </div>\n\n        <div class=\"legend-wrap\"\n          style=\"height: 100%; width: 100%; border-radius: 5px;\"\n          [style.background]=\"gradient\">\n        </div>\n\n        <div>\n          <span>{{valueRange[1].toFixed()}}</span>\n        </div>\n      </div>\n    </div>\n  "
                },] },
    ];
    ScaleLegend.ctorParameters = [];
    ScaleLegend.propDecorators = {
        'valueRange': [{ type: core_1.Input },],
        'colors': [{ type: core_1.Input },],
        'height': [{ type: core_1.Input },],
    };
    return ScaleLegend;
}());
exports.ScaleLegend = ScaleLegend;
//# sourceMappingURL=scale-legend.component.js.map