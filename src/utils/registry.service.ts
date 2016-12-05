import { Injectable } from '@angular/core';

@Injectable()
export class RegistryService {

  components = new Map();

  register(id: string, component: any, callback?: any): void {
    this.components.set(id, { component, callback });
  }

  get(id: string): any {
    let obj: any = this.components.get(id);
    if(obj) {
      return obj.component;
    }
  }

  destroy(id: string): void {
    const obj: any = this.components.get(id);

    if(obj && obj.component) {
      this.components.delete(id);
      
      if(obj.callback) {
        obj.callback(true);
      }

      obj.component.destroy();
    }
  }

  destroyAll(): void {
    this.components.forEach((v: any, k: string) => this.destroy(k));
  }

}
