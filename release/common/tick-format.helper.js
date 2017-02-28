import d3 from '../d3';
export function tickFormat(fieldType, groupByType) {
    return function (label) {
        if (label === 'No Value' || label === 'Other') {
            return label;
        }
        if (fieldType === 'date' && groupByType === 'groupBy') {
            var formatter = d3.timeFormat('MM/DD/YYYY');
            return formatter(label);
        }
        return label.toString();
    };
}
//# sourceMappingURL=tick-format.helper.js.map