import { Component, Input } from '@angular/core';

@Component({
  selector: 'g[grid-panel]',
  template: `
    <svg:rect
      [attr.height]="height"
      [attr.width]="width"
      [attr.x]="x"
      [attr.y]="y"
      stroke="none"
      [attr.fill]="fill"
      class="gridpanel"
    />
  `
})
export class GridPanel {
  @Input() path;
  @Input() fill;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
}
