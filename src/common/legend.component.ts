import { Component, Input, OnInit, OnChanges } from '@angular/core';
import { trimLabel } from './trim-label.helper';

@Component({
  selector: 'legend',
  template: `
    <div >
      <header class="legend-title"
        style="white-space: nowrap; overflow: hidden;">
        <span class="legend-icon incon-eye-1"></span>
        <span class="legend-title-text">{{title}}</span>
      </header>

      <div class="legend-wrap">
        <ul class="legend-labels" style="white-space: nowrap;">
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
  `
})
export class Legend implements OnInit, OnChanges {
  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;

  legendItems: any;

  ngOnInit() {
    this.update();
  }

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
        trimmedLabel: trimLabel(label) || '(empty)',
        backgroundColor: this.colors(label)
      };
    });
  }
}
