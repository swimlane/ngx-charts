import {
  ApplicationRef, ComponentFactoryResolver, ComponentRef, Injectable,
  Injector, EmbeddedViewRef, Type
} from '@angular/core';

/**
 * Injection service is a helper to append components
 * dynamically to a known location in the DOM, most
 * noteably for dialogs/tooltips appending to body.
 * 
 * @export
 * @class InjectionService
 */
@Injectable()
export class InjectionService {

  private _container: ComponentRef<any>;

  constructor(
    private applicationRef: ApplicationRef,
    private componentFactoryResolver: ComponentFactoryResolver,
    private injector: Injector) {
  }

  /**
   * Gets the root view container to inject the component to.
   * 
   * @returns {ComponentRef<any>}
   * 
   * @memberOf InjectionService
   */
  getRootViewContainer(): ComponentRef<any> {
    if(this._container) return this._container;

    const rootComponents = this.applicationRef['_rootComponents'];
    if (rootComponents.length) return rootComponents[0];

    throw new Error('View Container not found! ngUpgrade needs to manually set this via setRootViewContainer.');
  }

  /**
   * Overrides the default root view container. This is useful for 
   * things like ngUpgrade that doesn't have a ApplicationRef root.
   * 
   * @param {any} container
   * 
   * @memberOf InjectionService
   */
  setRootViewContainer(container): void {
    this._container = container;
  }

  /**
   * Gets the html element for a component ref.
   * 
   * @param {ComponentRef<any>} componentRef
   * @returns {HTMLElement}
   * 
   * @memberOf InjectionService
   */
  getComponentRootNode(componentRef: ComponentRef<any>): HTMLElement {
    return (componentRef.hostView as EmbeddedViewRef<any>).rootNodes[0] as HTMLElement;
  }

  /**
   * Gets the root component container html element.
   * 
   * @returns {HTMLElement}
   * 
   * @memberOf InjectionService
   */
  getRootViewContainerNode(): HTMLElement {
    return this.getComponentRootNode(this.getRootViewContainer());
  }

  /**
   * Projects the bindings onto the component
   * 
   * @param {ComponentRef<any>} component
   * @param {*} options
   * @returns {ComponentRef<any>}
   * 
   * @memberOf InjectionService
   */
  projectComponentBindings(component: ComponentRef<any>, bindings: any): ComponentRef<any> {
    if(bindings) {
      if (bindings.inputs !== undefined) {
        let bindingKeys = Object.getOwnPropertyNames(bindings.inputs);
        for (let bindingName of bindingKeys) {
          component.instance[bindingName] = bindings.inputs[bindingName];
        }
      }

      if (bindings.outputs !== undefined) {
        let eventKeys = Object.getOwnPropertyNames(bindings.outputs);
        for (let eventName of eventKeys) {
          component.instance[eventName] = bindings.outputs[eventName];
        }
      }
    }

    return component;
  }

  /**
   * Appends a component to a adjacent location
   * 
   * @template T
   * @param {Type<T>} componentClass
   * @param {*} [options={}]
   * @param {Element} [location=this.getRootViewContainerNode()]
   * @returns {ComponentRef<any>}
   * 
   * @memberOf InjectionService
   */
  appendComponent<T>(
    componentClass: Type<T>, 
    bindings: any = {}, 
    location: Element = this.getRootViewContainerNode()): ComponentRef<any> {
      
    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let componentRef = componentFactory.create(this.injector);
    let appRef: any = this.applicationRef;
    let componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentBindings(componentRef, bindings);

    appRef.attachView(componentRef.hostView);

    componentRef.onDestroy(() => {
      appRef.detachView(componentRef.hostView);
    });
    
    location.appendChild(componentRootNode);

    return componentRef;
  }

}
