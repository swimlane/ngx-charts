"use strict";
var moment = require('moment');
function sortLinear(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        if (direction === 'asc') {
            return a[property] - b[property];
        }
        else {
            return b[property] - a[property];
        }
    });
}
exports.sortLinear = sortLinear;
function sortByDomain(data, property, direction, domain) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aVal = a[property];
        var bVal = b[property];
        var aIdx = domain.indexOf(aVal);
        var bIdx = domain.indexOf(bVal);
        if (direction === 'asc') {
            return aIdx - bIdx;
        }
        else {
            return bIdx - aIdx;
        }
    });
}
exports.sortByDomain = sortByDomain;
function sortByTime(data, property, direction) {
    if (direction === void 0) { direction = 'asc'; }
    return data.sort(function (a, b) {
        var aDate = moment(a[property]);
        var bDate = moment(b[property]);
        if (direction === 'asc') {
            if (aDate.isAfter(bDate))
                return 1;
            if (bDate.isAfter(aDate))
                return -1;
            return 0;
        }
        else {
            if (aDate.isAfter(bDate))
                return -1;
            if (bDate.isAfter(aDate))
                return 1;
            return 0;
        }
    });
}
exports.sortByTime = sortByTime;
//# sourceMappingURL=sort.js.map