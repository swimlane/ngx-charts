"use strict";
var cache = {};
function id() {
    var newId = ('0000' + (Math.random() * Math.pow(36, 4) << 0).toString(36)).slice(-4);
    newId = "a" + newId;
    if (!cache[newId]) {
        cache[newId] = true;
        return newId;
    }
    return id();
}
exports.id = id;
//# sourceMappingURL=id.js.map