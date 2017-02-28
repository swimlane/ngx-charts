import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-heat-map-cell-series]',
  template: `
    <svg:g
      ngx-charts-heat-map-cell
      *ngFor="let c of cells; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [data]="c.data"
      (select)="onClick($event, c.label, c.series)"
      [gradient]="gradient"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="getTooltipText(c)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeatCellSeriesComponent implements OnChanges {

  @Input() data;
  @Input() colors;
  @Input() xScale;
  @Input() yScale;
  @Input() gradient: boolean;
  @Input() tooltipDisabled: boolean = false;

  @Output() select = new EventEmitter();

  cells: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cells = this.getCells();
  }

  getCells() {
    const cells = [];

    this.data.map((row) => {
      row.series.map((cell) => {
        const value = cell.value;

        const label = cell.name;
        let tooltipLabel = label;
        if (tooltipLabel.constructor.name === 'Date') {
          tooltipLabel = tooltipLabel.toLocaleDateString();
        }

        cells.push({
          x: this.xScale(row.name),
          y: this.yScale(cell.name),
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: this.colors.getColor(value),
          data: value,
          label,
          series: row.name
        });
      });
    });

    return cells;
  }

  getTooltipText({ label, data, series }): string {
    return `
      <span class="tooltip-label">${series} • ${label}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
  }

  trackBy(index, item): string {
    return item.tooltipText;
  }

  onClick(value, label, series): void {
    this.select.emit({
      name: label,
      value,
      series
    });
  }

}
