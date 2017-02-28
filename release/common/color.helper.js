import d3 from '../d3';
import { colorSets } from '../utils/color-sets';
export var ColorHelper = (function () {
    function ColorHelper(scheme, type, domain, customColors) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        this.colorDomain = scheme.domain;
        this.scaleType = type;
        this.domain = domain;
        this.scale = this.generateColorScheme(scheme, type, domain);
    }
    ColorHelper.prototype.generateColorScheme = function (scheme, type, domain) {
        if (typeof (scheme) === 'string') {
            scheme = colorSets.find(function (cs) {
                return cs.name === scheme;
            });
        }
        var colorScale;
        if (type === 'quantile') {
            colorScale = d3.scaleQuantile()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'ordinal') {
            colorScale = d3.scaleOrdinal()
                .range(scheme.domain)
                .domain(domain);
        }
        else if (type === 'linear') {
            colorScale = d3.scaleLinear()
                .domain(d3.range(0, 1, 1.0 / (scheme.domain.length - 1)))
                .range(scheme.domain);
        }
        return colorScale;
    };
    ColorHelper.prototype.getColor = function (value) {
        if (this.scaleType === 'linear') {
            var valueScale = d3.scaleLinear()
                .domain(this.domain)
                .range([0, 1]);
            return (this.scale(valueScale(value)));
        }
        else {
            var formattedValue_1 = value.toString();
            var found = void 0; // todo type customColors
            if (this.customColors && this.customColors.length > 0) {
                found = this.customColors.find(function (mapping) {
                    return mapping.name === formattedValue_1.toLowerCase();
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
        if (!start) {
            start = this.domain[0];
        }
        var valueScale = d3.scaleLinear()
            .domain(this.domain)
            .range([0, 1]);
        var colorValueScale = d3.scaleBand()
            .domain(this.colorDomain)
            .range([0, 1]);
        var endColor = this.getColor(value);
        // generate the stops
        var startVal = valueScale(start);
        var startColor = this.getColor(start);
        var endVal = valueScale(value);
        var i = 0;
        var currentVal = startVal;
        var stops = [];
        stops.push({
            color: startColor,
            offset: 0,
            opacity: 1
        });
        while (currentVal < endVal && i < this.colorDomain.length) {
            var color = this.colorDomain[i];
            var offset = colorValueScale(color);
            if (offset <= startVal) {
                i++;
                continue;
            }
            if (offset >= endVal) {
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
        stops.push({
            color: endColor,
            offset: endVal,
            opacity: 1
        });
        // normalize the offsets into percentages
        for (var _i = 0, stops_1 = stops; _i < stops_1.length; _i++) {
            var s = stops_1[_i];
            s.offset = Math.floor(((s.offset - startVal) / (endVal - startVal)) * 100);
        }
        return stops;
    };
    return ColorHelper;
}());
//# sourceMappingURL=color.helper.js.map