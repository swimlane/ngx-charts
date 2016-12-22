import { Injectable, ComponentRef } from '@angular/core';
import { InjectionService } from '.';

@Injectable()
export abstract class InjectionRegistery {

  protected abstract type: any;

  protected defaults: any = {};
  protected components: Map<any, any> = new Map();

  constructor(protected injectionService: InjectionService) { }

  getByType(type: any = this.type) {
    return this.components.get(type);
  }

  create(bindings: any): any {
    return this.createByType(this.type, bindings);
  }

  createByType(type: any, bindings: any): any {
    bindings = this.assignDefaults(bindings);

    const component = this.injectComponent(type, bindings);
    this.register(type, component);

    return component;
  }

  destroy(instance): void {
    let compsByType = this.components.get(instance.componentType);

    if(compsByType) {
      const idx = compsByType.indexOf(instance);

      if(idx > -1) {
        let component = compsByType[idx];
        component.destroy();
        compsByType.splice(idx, 1);
      }
    }
  }

  destroyAll(): void {
    this.destroyByType(this.type);
  }

  destroyByType(type): void {
    let comps = this.components.get(type);
    
    if(comps) {
      for(let comp of comps) {
        this.destroy(comp);
      }
    }
  }

  protected assignDefaults(bindings): any {
    const { inputs, outputs } = this.defaults;

    if(!bindings.inputs && !bindings.outputs) {
      bindings = { inputs: bindings };
    }

    if(inputs) {
      bindings.inputs = Object.assign(inputs, bindings.inputs);
    }

    if(outputs) {
      bindings.outputs = Object.assign(outputs, bindings.outputs);
    }

    return bindings;
  }

  protected injectComponent(type, bindings): ComponentRef<any> {
    return this.injectionService.appendComponent(type, bindings);
  }

  protected register(type, component): void {
    if(!this.components.has(type)) {
      this.components.set(type, []);
    }

    let types = this.components.get(type);
    types.push(component);
  }

}
