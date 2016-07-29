import { Component, Input } from '@angular/core';
import { GridPanel } from './GridPanel';

@Component({
  selector: 'g[grid-panel-series]',
  directives: [GridPanel],
  template: `
    <svg:g grid-panel *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [fill]="gridPanel.color">
    </svg:g>
  `
})
export class GridPanelSeries {
  @Input() data;
  @Input() dims;
  @Input() xScale;
  @Input() yScale;
  @Input() orient;

  ngOnInit() {
    this.gridPanels = this.getGridPanels();
  }

  getGridPanels(){
    return this.data.map((d,i) => {
      let color = 'rgba(255,255,255,0.02)';
      let offset, width, height, x, y;

      if (this.orient === 'vertical') {
        let position = this.xScale(d.name);
        let positionIndex = this.xScale.range().indexOf(position);
        if (positionIndex % 2 === 1){
          color = 'rgba(255,255,255,0)';
        }
        offset = this.xScale.range()[0]/2;
        width = this.xScale.rangeBand() + 2 * offset;
        height = this.dims.height;
        x = this.xScale(d.name) - offset;
        y = 0;
      } else if (this.orient === 'horizontal') {
        let position = this.yScale(d.name);
        let positionIndex = this.yScale.range().indexOf(position);
        if (positionIndex % 2 === 1){
          color = 'rgba(255,255,255,0)';
        }
        offset = this.yScale.range()[0]/2;
        width = this.dims.width;
        height = this.yScale.rangeBand() + 2 * offset;
        x = 0;
        y = this.yScale(d.name) - offset;
      }

      return {
        name: d.name,
        color: color,
        offset: offset,
        height: height,
        width: width,
        x: x,
        y: y
      }
    });
  }
}
