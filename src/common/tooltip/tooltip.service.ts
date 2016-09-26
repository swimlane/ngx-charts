import { Injectable, ComponentRef } from '@angular/core';

@Injectable()
export class TooltipService {

  components = new Map();

  register(id: string, component: any, callback: any) {
    this.components.set(id, { component, callback });
  }

  destroy(id: string) {
    const obj: any = this.components.get(id);

    if(obj && obj.component) {
      if(obj.callback) obj.callback(true);
      obj.component.destroy();
      this.components.delete(id);
    }
  }

  destroyAll() {
    this.components.forEach((v: any, k: string) => this.destroy(k));
  }

}
