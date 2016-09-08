"use strict";
var core_1 = require('@angular/core');
var Line = (function () {
    function Line() {
        this.clickHandler = new core_1.EventEmitter();
    }
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "path", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "stroke", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', Object)
    ], Line.prototype, "data", void 0);
    __decorate([
        core_1.Output(), 
        __metadata('design:type', Object)
    ], Line.prototype, "clickHandler", void 0);
    Line = __decorate([
        core_1.Component({
            selector: 'g[line]',
            template: "\n    <svg:path\n      class=\"line\"\n      [attr.d]=\"path\"\n      fill=\"none\"\n      [attr.stroke]=\"stroke\"\n      stroke-width=\"1.5px\"\n      style=\"strokeDasharray: 2000; strokeDashoffset: 0\"\n    />\n  "
        }), 
        __metadata('design:paramtypes', [])
    ], Line);
    return Line;
}());
exports.Line = Line;
//# sourceMappingURL=line.component.js.map