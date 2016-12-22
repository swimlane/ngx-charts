import {
  Component,
  SimpleChanges,
  Input,
  OnChanges,
  ChangeDetectionStrategy
} from '@angular/core';

@Component({
  selector: 'g[ngx-charts-grid-panel-series]',
  template: `
    <svg:g ngx-charts-grid-panel *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [class.grid-panel]="true"
      [class.odd]="gridPanel.class === 'odd'"
      [class.even]="gridPanel.class === 'even'">
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GridPanelSeriesComponent implements OnChanges {
  gridPanels: any[];

  @Input() data;
  @Input() dims;
  @Input() xScale;
  @Input() yScale;
  @Input() orient;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.gridPanels = this.getGridPanels();
  }

  getGridPanels(): any[] {
    return this.data.map((d, i) => {
      let offset, width, height, x, y, className;
      className = 'odd';

      if (this.orient === 'vertical') {
        let position: number = this.xScale(d.name);
        let positionIndex = Number.parseInt((position / this.xScale.step()).toString());

        if (positionIndex % 2 === 1) {
          className = 'even';
        }
        offset = this.xScale.bandwidth() * this.xScale.paddingInner();
        width = this.xScale.bandwidth() + offset;
        height = this.dims.height;
        x = this.xScale(d.name) - offset/2;
        y = 0;
      } else if (this.orient === 'horizontal') {
        let position = this.yScale(d.name);
        let positionIndex = Number.parseInt((position / this.yScale.step()).toString());

        if (positionIndex % 2 === 1) {
          className = 'even';
        }
        offset = this.yScale.bandwidth() * this.yScale.paddingInner();

        width = this.dims.width;
        height = this.yScale.bandwidth() + offset;
        x = 0;
        y = this.yScale(d.name) - offset/2;
      }

      return {
        name: d.name,
        class: className,
        height: height,
        width: width,
        x: x,
        y: y
      };
    });
  }
}
