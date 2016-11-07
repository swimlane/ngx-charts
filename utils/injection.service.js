"use strict";
var core_1 = require('@angular/core');
var InjectionService = (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService.prototype.getRootViewContainerRef = function () {
        var rootComponents = this.applicationRef['_rootComponents'];
        if (rootComponents.length) {
            return rootComponents[0]['_hostElement'].vcRef;
        }
        return this.vcRef;
    };
    InjectionService.prototype.setRootViewContainerRef = function (vcRef) {
        this.vcRef = vcRef;
    };
    InjectionService.prototype.appendNextToLocation = function (componentClass, location, options) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var parentInjector = location.parentInjector;
        var childInjector = parentInjector;
        var component = location.createComponent(componentFactory, location.length, childInjector);
        return this.projectComponentInputs(component, options);
    };
    InjectionService.prototype.appendNextToRoot = function (componentClass, options) {
        var location = this.getRootViewContainerRef();
        return this.appendNextToLocation(componentClass, location, options);
    };
    InjectionService.prototype.projectComponentInputs = function (component, options) {
        if (options) {
            var props = Object.getOwnPropertyNames(options);
            for (var _i = 0, props_1 = props; _i < props_1.length; _i++) {
                var prop = props_1[_i];
                component.instance[prop] = options[prop];
            }
        }
        return component;
    };
    InjectionService.decorators = [
        { type: core_1.Injectable },
    ];
    InjectionService.ctorParameters = [
        { type: core_1.ApplicationRef, },
        { type: core_1.ComponentFactoryResolver, },
        { type: core_1.Injector, },
    ];
    return InjectionService;
}());
exports.InjectionService = InjectionService;
//# sourceMappingURL=injection.service.js.map