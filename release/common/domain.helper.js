/**
 * Based on the data, return an array with unique values.
 *
 * @export
 * @returns array
 * @param results
 */
export function getUniqueXDomainValues(results) {
    var valueSet = new Set();
    for (var _i = 0, results_1 = results; _i < results_1.length; _i++) {
        var result = results_1[_i];
        for (var _a = 0, _b = result.series; _a < _b.length; _a++) {
            var d = _b[_a];
            valueSet.add(d.name);
        }
    }
    return Array.from(valueSet);
}
//# sourceMappingURL=domain.helper.js.map