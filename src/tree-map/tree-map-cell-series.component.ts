import {
  Component,
  OnChanges,
  Input,
  Output,
  EventEmitter
} from '@angular/core';

@Component({
  selector: 'g[treeMapCellSeries]',
  template: `
    <svg:g treeMapCell *ngFor="let c of cells; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      (clickHandler)="click($event)"

      swui-tooltip
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="c.tooltipText"
    />
  `
})
export class TreeMapCellSeries implements OnChanges {
  cells: any[];
  @Input() data;
  @Input() dims;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.cells = this.getCells();
  }

  getCells() {
    return this.data.children
      .filter((d) => {
        return d.depth === 1;
      })
      .map((d, index) => {
        return {
          x: d.x0,
          y: d.y0,
          width: d.x1 - d.x0,
          height: d.y1 - d.y0,
          fill: this.colors(d.id),
          label: d.id,
          value: d.value,
          valueType: d.valueType,
          tooltipText: `${d.id}: ${d.value}`
        };
      });
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  trackBy(index, item) {
    return item.label;
  }
}
