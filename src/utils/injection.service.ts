import {
  ApplicationRef,
  ComponentFactoryResolver,
  ComponentRef,
  Injectable,
  Injector,
  ViewContainerRef,
  EmbeddedViewRef,
  Type
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
   * Projects the inputs onto the component
   *
   * @param {ComponentRef<any>} component
   * @param {*} options
   * @returns {ComponentRef<any>}
   *
   * @memberOf InjectionService
   */
  projectComponentInputs(component: ComponentRef<any>, options: any): ComponentRef<any> {
    if(options) {
      const props = Object.getOwnPropertyNames(options);
      for(const prop of props) {
        component.instance[prop] = options[prop];
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
    options: any = {},
    location: Element = this.getRootViewContainerNode()): ComponentRef<any> {

    let componentFactory = this.componentFactoryResolver.resolveComponentFactory(componentClass);
    let componentRef = componentFactory.create(this.injector);
    let appRef: any = this.applicationRef;
    let componentRootNode = this.getComponentRootNode(componentRef);

    // project the options passed to the component instance
    this.projectComponentInputs(componentRef, options);

    // ApplicationRef's attachView and detachView methods are in Angular ^2.2.1 but not before.
    // The `else` clause here can be removed once 2.2.1 is released.
    if (appRef['attachView']) {
      appRef.attachView(componentRef.hostView);

      componentRef.onDestroy(() => {
        appRef.detachView(componentRef.hostView);
      });
    } else {
      // When creating a component outside of a ViewContainer, we need to manually register
      // its ChangeDetector with the application. This API is unfortunately not published
      // in Angular <= 2.2.0. The change detector must also be deregistered when the component
      // is destroyed to prevent memory leaks.
      let changeDetectorRef = componentRef.changeDetectorRef;
      appRef.registerChangeDetector(changeDetectorRef);

      componentRef.onDestroy(() => {
        appRef.unregisterChangeDetector(changeDetectorRef);

        // Normally the ViewContainer will remove the component's nodes from the DOM.
        // Without a ViewContainer, we need to manually remove the nodes.
        if (componentRootNode.parentNode) {
          componentRootNode.parentNode.removeChild(componentRootNode);
        }
      });
    }

    location.appendChild(componentRootNode);

    return componentRef;
  }

}
