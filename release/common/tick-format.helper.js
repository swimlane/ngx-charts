"use strict";
var d3_1 = require('../d3');
function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = d3_1.default.timeFormat('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}
exports.tickFormat = tickFormat;
//# sourceMappingURL=tick-format.helper.js.map