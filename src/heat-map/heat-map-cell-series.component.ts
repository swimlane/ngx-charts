import { Component, Input, Output, EventEmitter, OnInit, OnChanges } from '@angular/core';

@Component({
  selector: 'g[heatMapCellSeries]',
  template: `
    <svg:g heatMapCell *ngFor="let c of cells"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (clickHandler)="click($event)"
      sw-popover
      [popoverSpacing]="15"
      [popoverText]="c.tooltipText"
      [popoverGroup]="'charts'"
      [gradient]="gradient"
    />
  `
})
export class HeatCellSeries implements OnInit, OnChanges {
  cells: any[];

  @Input() data;
  @Input() colors;
  @Input() xScale;
  @Input() yScale;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.update();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.cells = this.getCells();
  }

  getCells() {
    let cells = [];
    this.data.map((row) => {
      row.series.map((cell) => {
        let value = cell.value;
        let label = cell.name;
        cells.push({
          x: this.xScale(row.name),
          y: this.yScale(cell.name),
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: this.colors(value),
          data: value,
          tooltipText: `${label}: ${value}`
        });
      });
    });

    return cells;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

}
