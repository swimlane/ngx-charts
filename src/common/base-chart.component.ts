import { OnChanges } from "@angular/core";

export abstract class BaseChart implements OnChanges {
  ngOnChanges(changes) {
    // if (changes.scheme) {
    //   this.setColors();
    // }
  }

  abstract update()

  abstract setColors()

  abstract click(data)
}
