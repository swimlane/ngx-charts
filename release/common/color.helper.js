import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';
import { colorSets } from '../utils/color-sets';
var ColorHelper = /** @class */ (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.customColors = customColors;
        this.scale = this.generateColorScheme(scheme, type, this.domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof scheme === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            // linear schemes must have at least 2 colors
            var colorDomain = scheme.domain.slice();
            if (colorDomain.length === 1) {
                colorDomain.push(colorDomain[0]);
                this.colorDomain = colorDomain;
            }
            var points = range(0, 1, 1.0 / colorDomain.length);
            colorScale = scaleLinear()
                .domain(points)
                .range(colorDomain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (value === undefined || value === null) {
            throw new Error('Value can not be null');
        }
        if (this.scaleType === 'linear') {
            var valueScale = scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return this.scale(valueScale(value));
        }
        else {
            if (typeof this.customColors === 'function') {
                return this.customColors(value);
            }
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name.toLowerCase() === formattedValue_1.toLowerCase();
                });
            }
            if (found) {
                return found.value;
            }
            else {
                return this.scale(value);
            }
        }
    };
    ColorHelper.prototype.getLinearGradientStops = function (value, start) {
        if (start === undefined) {
            start = this.domain[0];
        }
        var valueScale = scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 1;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: startVal,
            originalOffset: startVal,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
                break;
            }
            stops.push({
                color: color,
                offset: offset,
                opacity: 1
            });
            currentVal = offset;
            i++;
        }
        if (stops[stops.length - 1].offset < 100) {
            stops.push({
                color: endColor,
                offset: endVal,
                opacity: 1
            });
        }
        if (endVal === startVal) {
            stops[0].offset = 0;
            stops[1].offset = 100;
        }
        else {
            // normalize the offsets into percentages
            if (stops[stops.length - 1].offset !== 100) {
                for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
                    var s = stops_1[_i];
                    s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
                }
            }
        }
        return stops;
    };
    return ColorHelper;
}());
export { ColorHelper };
//# sourceMappingURL=color.helper.js.map