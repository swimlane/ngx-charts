import {
  Component,
  OnChanges,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-tree-map-cell-series]',
  template: `
    <svg:g ngx-charts-tree-map-cell *ngFor="let c of cells; trackBy:trackBy"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="getTooltipText(c)"
    />
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellSeriesComponent implements OnChanges {

  @Input() data;
  @Input() dims;
  @Input() colors;
  @Input() tooltipDisabled: boolean = false;

  @Output() select = new EventEmitter();

  cells: any[];

  ngOnChanges(changes: SimpleChanges): void {
    this.cells = this.getCells();
  }

  getCells(): any[] {
    return this.data.children
      .filter((d) => {
        return d.depth === 1;
      })
      .map((d, index) => {
        const label = d.id;

        return {
          x: d.x0,
          y: d.y0,
          width: d.x1 - d.x0,
          height: d.y1 - d.y0,
          fill: this.colors.getColor(label),
          label,
          value: d.value,
          valueType: d.valueType
        };
      });
  }

  getTooltipText({ label, value }): string {
    return `
      <span class="tooltip-label">${label}</span>
      <span class="tooltip-val">${value.toLocaleString()}</span>
    `;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  trackBy(index, item): string {
    return item.label;
  }
}
