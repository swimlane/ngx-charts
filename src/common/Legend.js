import { Component, Input, Output, EventEmitter } from '@angular/core';
import { trimLabel } from './trimLabel.js';

@Component({
  selector: 'legend',
  template: `
    <div >
      <h6 class="viz legend-title"
        style="white-space: nowrap; overflow: hidden;">
        <span class="legend-icon incon-eye-1"></span>
        <span class="legend-title-text">{{title}}</span>
      </h6>

      <div class="legend-wrap">
        <ul class="viz legend-labels" style="white-space: nowrap;">
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
export class Legend {
  @Input() data;
  @Input() title;
  @Input() colors;
  @Input() height;

  ngOnInit(){
    this.legendItems = this.getLegendItems();
  }

  getLegendItems(){
    let uniques = {};

    let uniqueItems = this.data.array.filter((d) => {
      let label;
      if (d.vals) {
        label = d.vals[0].formattedLabel[0];
      } else {
        label = d.name;
      }

      if (uniques[label]) {
        return false;
      }

      uniques[label] = true;
      return true;
    });

    return uniqueItems.map((item, index) => {
      let label;

      if (item.vals) {
        label = item.vals[0].formattedLabel[0];
      } else {
        label = item.name;
      }

      return {
        className: 'legend-label',
        label: label,
        trimmedLabel: trimLabel(label) || '(empty)',
        backgroundColor: this.colors(label)
      }
    });
  }
}
