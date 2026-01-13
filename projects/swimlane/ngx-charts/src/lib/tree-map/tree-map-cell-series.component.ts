import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { TreeMapCellConfig } from './tree-map-cell.config';

@Component({
  selector: 'g[ngx-charts-tree-map-cell-series]',
  template: `
    <svg:g
      ngx-charts-tree-map-cell
      *ngFor="let c of cells; trackBy: trackBy"
      [config]="getCellConfig(c)"
      [data]="c.data"
      (select)="onClick($event)"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TreeMapCellSeriesComponent {
  @Input() data;
  @Input() dims;
  @Input() colors;
  @Input() valueFormatting: (value: any) => string;
  @Input() labelFormatting: (cell: any) => string;
  @Input() gradient: boolean = false;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();

  cells: any[];

  ngOnChanges(changes): void {
    this.cells = this.getCells();
  }

  getCells() {
    return this.data.children.filter(d => {
      return d.depth === 1;
    });
  }

  getCellConfig(c): TreeMapCellConfig {
    return {
      fill: this.colors.getColor(c.label),
      x: c.x0,
      y: c.y0,
      width: c.x1 - c.x0,
      height: c.y1 - c.y0,
      label: c.label,
      value: c.value,
      valueFormatting: this.valueFormatting,
      labelFormatting: this.labelFormatting,
      gradient: this.gradient,
      animations: this.animations
    };
  }

  onClick(data): void {
    this.select.emit(data);
  }

  trackBy(index, item): string {
    return item.label;
  }
}