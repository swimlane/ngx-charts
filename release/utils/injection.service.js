"use strict";
var core_1 = require('@angular/core');
var InjectionService = (function () {
    function InjectionService(applicationRef, componentFactoryResolver, injector) {
        this.applicationRef = applicationRef;
        this.componentFactoryResolver = componentFactoryResolver;
        this.injector = injector;
    }
    InjectionService.prototype.getRootViewContainerRef = function () {
        var comps = this.applicationRef.components;
        if (!comps.length) {
            throw new Error("ApplicationRef instance not found");
        }
        return this.applicationRef['_rootComponents'][0]['_hostElement'].vcRef;
    };
    InjectionService.prototype.appendNextToLocation = function (componentClass, location, providers) {
        var componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
        var parentInjector = location.parentInjector;
        var childInjector = parentInjector;
        if (providers && providers.length) {
            childInjector = core_1.ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
        }
        return location.createComponent(componentFactory, location.length, childInjector);
    };
    InjectionService.prototype.appendNextToRoot = function (componentClass, componentOptionsClass, options) {
        var providers;
        var location = this.getRootViewContainerRef();
        if (componentOptionsClass && options) {
            providers = core_1.ReflectiveInjector.resolve([
                { provide: componentOptionsClass, useValue: options }
            ]);
        }
        return this.appendNextToLocation(componentClass, location, providers);
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