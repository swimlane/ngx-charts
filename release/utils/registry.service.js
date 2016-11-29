"use strict";
var core_1 = require('@angular/core');
var RegistryService = (function () {
    function RegistryService() {
        this.components = new Map();
    }
    RegistryService.prototype.register = function (id, component, callback) {
        this.components.set(id, { component: component, callback: callback });
    };
    RegistryService.prototype.get = function (id) {
        var obj = this.components.get(id);
        if (obj) {
            return obj.component;
        }
    };
    RegistryService.prototype.destroy = function (id) {
        var obj = this.components.get(id);
        if (obj && obj.component) {
            if (obj.callback) {
                obj.callback(true);
            }
            obj.component.destroy();
            this.components.delete(id);
        }
    };
    RegistryService.prototype.destroyAll = function () {
        var _this = this;
        this.components.forEach(function (v, k) { return _this.destroy(k); });
    };
    RegistryService.decorators = [
        { type: core_1.Injectable },
    ];
    /** @nocollapse */
    RegistryService.ctorParameters = [];
    return RegistryService;
}());
exports.RegistryService = RegistryService;
//# sourceMappingURL=registry.service.js.map