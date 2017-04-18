export function trimLabel(s, max) {
    if (max === void 0) { max = 16; }
    if (typeof s !== 'string') {
        if (typeof s === 'number') {
            return s + '';
        }
        else {
            return '';
        }
    }
    if (s.length <= max) {
        return s;
    }
    else {
        return s.slice(0, max).trim() + "...";
    }
}
//# sourceMappingURL=trim-label.helper.js.map