import { ApplicationRef, ComponentFactoryResolver, ComponentRef, Injector, ViewContainerRef, ResolvedReflectiveProvider, Type } from '@angular/core';
export declare class InjectionService {
    private applicationRef;
    private componentFactoryResolver;
    private injector;
    constructor(applicationRef: ApplicationRef, componentFactoryResolver: ComponentFactoryResolver, injector: Injector);
    getRootViewContainerRef(): ViewContainerRef;
    appendNextToLocation<T>(componentClass: Type<T>, location: ViewContainerRef, providers?: ResolvedReflectiveProvider[]): ComponentRef<T>;
    appendNextToRoot<T>(componentClass: Type<T>, componentOptionsClass?: any, options?: any): ComponentRef<T>;
}
