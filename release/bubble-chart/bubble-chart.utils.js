import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
export function getScaleType(values) {
    var date = true;
    var num = true;
    for (var _i = 0, values_1 = values; _i < values_1.length; _i++) {
        var value = values_1[_i];
        if (!isDate(value)) {
            date = false;
        }
        if (typeof value !== 'number') {
            num = false;
        }
    }
    if (date)
        return 'time';
    if (num)
        return 'linear';
    return 'ordinal';
}
function isDate(value) {
    if (value instanceof Date) {
        return true;
    }
    return false;
}
export function getDomain(values, scaleType, autoScale, minVal, maxVal) {
    var domain = [];
    if (scaleType === 'linear') {
        values = values.map(function (v) { return Number(v); });
        if (!autoScale) {
            values.push(0);
        }
    }
    if (scaleType === 'time' || scaleType === 'linear') {
        var min = minVal ? minVal : Math.min.apply(Math, values);
        var max = maxVal ? maxVal : Math.max.apply(Math, values);
        domain = [min, max];
    }
    else {
        domain = values;
    }
    return domain;
}
export function getScale(domain, range, scaleType, roundDomains) {
    var scale;
    if (scaleType === 'time') {
        scale = scaleTime()
            .range(range)
            .domain(domain);
    }
    else if (scaleType === 'linear') {
        scale = scaleLinear()
            .range(range)
            .domain(domain);
        if (roundDomains) {
            scale = scale.nice();
        }
    }
    else if (scaleType === 'ordinal') {
        scale = scalePoint()
            .range([range[0], range[1]])
            .domain(domain);
    }
    return scale;
}
//# sourceMappingURL=bubble-chart.utils.js.map