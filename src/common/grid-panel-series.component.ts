import {
  Component,
  Input,
  OnChanges
} from '@angular/core';

@Component({
  selector: 'g[gridPanelSeries]',
  template: `
    <svg:g gridPanel *ngFor="let gridPanel of gridPanels"
      [height]="gridPanel.height"
      [width]="gridPanel.width"
      [x]="gridPanel.x"
      [y]="gridPanel.y"
      [fill]="gridPanel.color">
    </svg:g>
  `
})
export class GridPanelSeries implements OnChanges {
  gridPanels: any[];

  @Input() data;
  @Input() dims;
  @Input() xScale;
  @Input() yScale;
  @Input() orient;

  ngOnChanges() {
    this.update();
  }

  update() {
    this.gridPanels = this.getGridPanels();
  }

  getGridPanels() {
    return this.data.map((d, i) => {
      let color = 'rgba(255,255,255,0.02)';
      let offset, width, height, x, y;

      if (this.orient === 'vertical') {
        let position: number = this.xScale(d.name);
        let positionIndex = Number.parseInt((position / this.xScale.step()).toString());

        if (positionIndex % 2 === 1) {
          color = 'rgba(255,255,255,0)';
        }
        offset = this.xScale.bandwidth() * this.xScale.paddingInner();
        width = this.xScale.bandwidth() + offset;
        height = this.dims.height;
        x = this.xScale(d.name) - offset/2;
        y = 0;
      } else if (this.orient === 'horizontal') {
        let position = this.yScale(d.name);
        let positionIndex = Number.parseInt((position / this.yScale.step()).toString());

        console.log('position', positionIndex);
        if (positionIndex % 2 === 1) {
          color = 'rgba(255,255,255,0)';
        }
        offset = this.yScale.bandwidth() * this.yScale.paddingInner();

        width = this.dims.width;
        height = this.yScale.bandwidth() + offset;
        x = 0;
        y = this.yScale(d.name) - offset/2;
      }

      return {
        name: d.name,
        color: color,
        height: height,
        width: width,
        x: x,
        y: y
      };
    });
  }
}
