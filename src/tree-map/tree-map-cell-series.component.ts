import { Component, Input, Output, EventEmitter } from '@angular/core';
import { OnInit } from "@angular/core/esm";

@Component({
  selector: 'g[treeMapCellSeries]',
  template: `
    <svg:g treeMapCell *ngFor="let c of cells"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      (clickHandler)="click($event)"
    />
  `
})
export class TreeMapCellSeries implements OnInit {
  cells: any[];
  @Input() data;
  @Input() dims;
  @Input() colors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.cells = this.getCells();
  }

  getCells() {
    return this.data
      .filter((d) => {
        return d.depth === 1;
      })
      .map((d, index) => {
        return {
          x: d.x,
          y: d.y,
          width: d.dx,
          height: d.dy,
          fill: this.colors(d.label),
          label: d.label,
          value: d.value,
          valueType: d.valueType
        };
      });
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
