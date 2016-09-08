"use strict";
var cache = {};
function ObjectId() {
    var timestamp = (new Date().getTime() / 1000 | 0).toString(16);
    var id = timestamp + 'xxxxxxxxxxxxxxxx'.replace(/[x]/g, function () {
        return (Math.random() * 16 | 0).toString(16);
    }).toLowerCase();
    if (!cache[id]) {
        cache[id] = true;
        return id;
    }
    return ObjectId();
}
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ObjectId;
;
//# sourceMappingURL=object-id.js.map