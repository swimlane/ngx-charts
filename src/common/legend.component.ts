import {
  Component,
  Input,
  OnChanges,
  ChangeDetectionStrategy,
  Output,
  EventEmitter
 } from '@angular/core';

@Component({
  selector: 'legend',
  template: `
    <div [style.width.px]="width">
      <header class="legend-title">
        <span class="legend-icon icon-eye"></span>
        <span class="legend-title-text">{{title}}</span>
      </header>
      <div class="legend-wrap">
        <ul class="legend-labels"
          [style.max-height.px]="height - 45">
          <li
            tabindex="-1"
            *ngFor="let legendItem of legendItems"
            (click)="labelClick.emit(legendItem)"
            [class]="legendItem.className">
            <span
              [title]="legendItem.label"
              class="legend-label-color"
              [style.background-color]="legendItem.backgroundColor">
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
export class LegendComponent implements OnChanges {

  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;
  @Input() width;

  @Output() labelClick: EventEmitter<any> = new EventEmitter();

  legendItems: any;

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    this.legendItems = this.getLegendItems();
  }

  getLegendItems(): any[] {
    let items = [];
    this.data.map((label, index) => {
      let formattedLabel = label;
      if (formattedLabel.constructor.name === 'Date') {
        formattedLabel = formattedLabel.toLocaleDateString();
      } else {
        formattedLabel = formattedLabel.toLocaleString();
      }

      let idx = items.findIndex((i) => {
        return i.label === formattedLabel;
      });

      if (idx === -1) {
        items.push({
          className: 'legend-label',
          label: formattedLabel,
          trimmedLabel: formattedLabel || '(empty)',
          backgroundColor: this.colors(label)
        });
      };
    });

    return items;
  }
}
