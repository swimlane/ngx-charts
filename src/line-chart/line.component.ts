import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'g[line]',
  template: `
    <svg:path
      class="line"
      [attr.d]="path"
      fill="none"
      [attr.stroke]="stroke"
      stroke-width="1.5px"
      style="strokeDasharray: 2000; strokeDashoffset: 0"
    />
  `
})
export class Line {
  @Input() path;
  @Input() stroke;
  @Input() data;

  @Output() clickHandler = new EventEmitter();
}
