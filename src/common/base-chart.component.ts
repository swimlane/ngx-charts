import { OnChanges } from "@angular/core";

export abstract class BaseChart implements OnChanges {
  ngOnChanges(changes) {

  }

  abstract update()

  abstract setColors()

  abstract click(data)
}
