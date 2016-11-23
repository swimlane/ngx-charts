import {
  Component,
  Input,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[gridPanel]',
  template: `
    <svg:rect
      [attr.height]="height"
      [attr.width]="width"
      [attr.x]="x"
      [attr.y]="y"
      stroke="none"
      class="gridpanel"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPanel {
  @Input() path;
  @Input() width;
  @Input() height;
  @Input() x;
  @Input() y;
}
