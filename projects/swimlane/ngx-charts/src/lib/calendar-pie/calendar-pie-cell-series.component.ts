import {
  Component,
  Input,
  SimpleChanges,
  Output,
  EventEmitter,
  OnChanges,
  OnInit,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { DataItem, Series } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { Color } from 'd3-color';

interface Cell {
  cell: DataItem;
  data: number;
  fill: string;
  height: number;
  label: string;
  row: Series;
  series: string;
  width: number;
  x: number;
  y: number;
}
@Component({
  selector: 'g[ngx-charts-calendar-pie-cell-series]',
  template: `
  <svg:g
    ngx-charts-calendar-pie-cell
    *ngFor="let c of cells; trackBy: trackBy"
    [x]="c.x"
    [y]="c.y"
    [width]="c.width"
    [height]="c.height"
    [fill]="c.fill"
    [data]="c.data"
    (select)="onClick(c.cell)"
    (activate)="activate.emit(c.cell)"
    (deactivate)="deactivate.emit(c.cell)"
    [gradient]="gradient"
    [animations]="animations"
    ngx-tooltip
    [tooltipDisabled]="tooltipDisabled"
    [tooltipPlacement]="placementTypes.Top"
    [tooltipType]="styleTypes.tooltip"
    [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(c)"
    [tooltipTemplate]="tooltipTemplate"
    [tooltipContext]="{ series: c.series, name: c.label, value: c.data }"
  >
    <svg:g
      ngx-charts-pie-chart
      class="pie-chart-calendar"
      [view]="[100, 100]"
      [scheme]="scheme"
      [results]="c.data.series"
      [animations]="animations"
      [legend]="false"
      [explodeSlices]="false"
      [labels]="false"
      [doughnut]="false"
      [tooltipDisabled]="true"
      [calendar]="true">
    </svg:g>
  </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarPieCellSeriesComponent implements OnChanges, OnInit {
  @Input() data;
  @Input() colors;
  @Input() xScale;
  @Input() yScale;
  @Input() gradient: boolean;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: any;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;
  @Input() scheme: string | Color = "cool";
  @Input() pieResults: any[];

  @Output() select: EventEmitter<DataItem> = new EventEmitter();
  @Output() activate: EventEmitter<DataItem> = new EventEmitter();
  @Output() deactivate: EventEmitter<DataItem> = new EventEmitter();

  cells: Cell[];

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  ngOnInit() {
    if (!this.tooltipText) {
      this.tooltipText = this.getTooltipText;
    }
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.cells = this.getCells();

    console.log("cells", this.cells)
  }

  getCells(): Cell[] {
    const cells = [];

    this.data.map(row => {
      row.series.map(cell => {
        const value = cell.value;
        cell.series = row.name;

        cells.push({
          row,
          cell,
          x: this.xScale(row.name),
          y: this.yScale(cell.name),
          width: this.xScale.bandwidth(),
          height: this.yScale.bandwidth(),
          fill: this.colors.getColor(value),
          data: value,
          label: formatLabel(cell.name),
          series: row.name
        });
      });
    });
    console.log("cells", this.cells);

    return cells;
  }

  getTooltipText({ label, data, series }: { label: string; data: number; series: string }): string {
    return `
      <span class="tooltip-label">${escapeLabel(series)} • ${escapeLabel(label)}</span>
      <span class="tooltip-val">${data.toLocaleString()}</span>
    `;
  }

  trackBy(index: number, item): string {
    return item.label;
  }

  onClick(data): void {
    this.select.emit(data);
  }
}
