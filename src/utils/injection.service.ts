import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ReflectiveInjector,
  ViewContainerRef,
  ResolvedReflectiveProvider,
  Type
} from '@angular/core';

@Injectable()
export class InjectionService {

  private vcRef: ViewContainerRef;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  getRootViewContainerRef(): ViewContainerRef {
    // The only way for now (by @mhevery)
    // https://github.com/angular/angular/issues/6446
    // https://github.com/angular/angular/issues/9293
    // see: https://github.com/valor-software/ng2-bootstrap/components/utils/components-helper.service.ts

    let rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents.length) {
      return rootComponents[0]['_hostElement'].vcRef;
    }

    return this.vcRef;
  }

  setRootViewContainerRef(vcRef) {
    this.vcRef = vcRef;
  }

  appendNextToLocation<T>(
    componentClass: Type<T>,
    location: ViewContainerRef,
    options?: any): ComponentRef<T> {
    // providers?: ResolvedReflectiveProvider[]): ComponentRef<T> {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let parentInjector = location.parentInjector;
    let childInjector = parentInjector;

    /*
    if (providers && providers.length) {
      childInjector = ReflectiveInjector.fromResolvedProviders(providers, parentInjector);
    }
    */

    let component = location.createComponent(componentFactory, location.length, childInjector);
    return this.projectComponentInputs(component, options);
  }

  appendNextToRoot<T>(
    componentClass: Type<T>,
    options?: any): ComponentRef<T> {

    const location = this.getRootViewContainerRef();

    /*
    let providers;
    if(componentOptionsClass && options) {
      providers = ReflectiveInjector.resolve([
       { provide: componentOptionsClass, useValue: options }
     ]);
    }
    */

    return this.appendNextToLocation(componentClass, location, options);
  }

  projectComponentInputs(component, options) {
    if(options) {
      const props = Object.getOwnPropertyNames(options);
      for(const prop of props) {
        component.instance[prop] = options[prop];
      }
    }

    return component;
  }
}
