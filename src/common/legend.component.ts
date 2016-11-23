import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy
 } from '@angular/core';

@Component({
  selector: 'legend',
  template: `
    <div [style.width]="width + 'px'">
      <header class="legend-title"
        style="white-space: nowrap; overflow: hidden;">
        <span class="legend-icon incon-eye-1"></span>
        <span class="legend-title-text">{{title}}</span>
      </header>

      <div class="legend-wrap">
        <ul class="legend-labels"
          style="white-space: nowrap;"
          [style.max-height]="height - 45 + 'px'">
          <li *ngFor="let legendItem of legendItems" [class]="legendItem.className">
            <span
              [title]="legendItem.label"
              class="legend-label-color"
              [style.background-color]="colors(legendItem.label)">
            </span>

            <span [title]="legendItem.label" class="legend-label-text">
              {{legendItem.trimmedLabel}}
            </span>

          </li>
        </ul>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Legend implements OnChanges {
  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;
  @Input() width;

  legendItems: any;

  ngOnChanges() {
    this.update();
  }

  update() {
    this.legendItems = this.getLegendItems();
  }

  getLegendItems() {
    return this.data.map((label, index) => {
      return {
        className: 'legend-label',
        label: label,
        trimmedLabel: label || '(empty)',
        backgroundColor: this.colors(label)
      };
    });
  }
}
