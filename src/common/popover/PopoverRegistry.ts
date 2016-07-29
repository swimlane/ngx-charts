/**
 * Registering to deal with popovers
 * @param {function} $animate
 */
export class PopoverRegistry {
  private static _instance:PopoverRegistry = new PopoverRegistry();

  popovers: any;
  instance: any;

  constructor(){
    "ngInject";

    if(PopoverRegistry._instance){
      throw new Error("Error: Instantiation failed: Use PopoverRegistry.getInstance() instead of new.");
    }
    PopoverRegistry._instance = this;

    this.popovers = {};

    setInterval(this.cleanUp.bind(this), 1000);
  }

  public static getInstance(){
    return PopoverRegistry._instance;
  }

  add(id, object){
    this.popovers[id] = object;
  }

  find(id){
    this.popovers[id];
  }

  remove(id){
    if (!this.popovers[id]) return;

    if (this.popovers[id].popoverScope) {
      this.popovers[id].popoverScope.$destroy();
    }

    if (this.popovers[id].popover){
      this.popovers[id].popover.remove();
    }

    delete this.popovers[id];
  }

  removeGroup (group, currentId){
    let ids = Object.keys(this.popovers);
    for (let id of ids) {

      let popoverOb = this.popovers[id];
      if (!popoverOb){
        continue;
      }

      if (id === currentId) return;

      if (popoverOb.group && popoverOb.group === group){
        popoverOb.popover.removeClass('sw-popover-animation');
        setTimeout(() => {
          popoverOb.popover.remove();
          if (popoverOb.popoverScope) {
            popoverOb.popoverScope.$destroy();
          }
          delete this.popovers[id];
        }, 50)
      }
    }
  }

  /**
   * Deletes orphan popovers whose elements are no longer present
   * in the document
   */
  cleanUp(){
    let ids = Object.keys(this.popovers);
    for (let id of ids){
      let element = this.popovers[id].element;
      if (element && element[0]){
        element = element[0];
      }
      if (element && !document.contains(element)){
        this.remove(id);
      }
    }
  }
};
