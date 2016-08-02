import { OnChanges } from "@angular/core";

export class BaseChart implements OnChanges {
  ngOnChanges(changes) {
    if (changes.scheme) {
      this.setColors();
    }
  }

  update() {
    console.warn('update needs to be implemented in the chart');
  }

  setColors() {
    console.warn('setColors needs to be implemented in the chart');
  }

  click(data) {
    console.warn('click needs to be implemented in the chart');
  }
}
