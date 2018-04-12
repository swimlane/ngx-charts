import {
  Component,
  OnChanges,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-tree-map-cell-series]',
  template: `
    <svg:g ngx-charts-tree-map-cell *ngFor="let c of cells; trackBy:trackBy"
      [data]="c"
      [x]="c.x"
      [y]="c.y"
      [width]="c.width"
      [height]="c.height"
      [fill]="c.fill"
      [label]="c.label"
      [value]="c.value"
      [valueType]="c.valueType"
      [valueFormatting]="valueFormatting"
      [labelFormatting]="labelFormatting"
      [gradient]="gradient"
      [animations]="animations"
      (select)="onClick($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="'top'"
      [tooltipType]="'tooltip'"
      [tooltipTitle]="tooltipTemplate ? undefined : getTooltipText(c)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="c.data">
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMapCellSeriesComponent implements OnChanges {

  @Input() data;
  @Input() dims;
  @Input() colors;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() gradient: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

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

        const data = {
          name: label,
          value: d.value
        };

        return {
          data,
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
