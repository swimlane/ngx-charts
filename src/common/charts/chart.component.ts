import {
  Component,
  Input,
  OnChanges,
  ViewContainerRef
} from '@angular/core';
import { InjectionService } from '../../utils/injection.service';

@Component({
  providers: [InjectionService],
  selector: 'chart',
  template: `
    <div [style.width]="view[0] + 'px'">
      <svg
        class="ng2d3"
        [attr.width]="view[0] * chartWidth / 12.0"
        [attr.height]="view[1]">

        <ng-content></ng-content>
      </svg>

      <scale-legend
        *ngIf="legend && legendType === 'scaleLegend'"
        class="legend"
        [valueRange]="data"
        [colors]="legendData"
        [height]="view[1]"
        [width]="view[0] * legendWidth / 12.0">
      </scale-legend>

      <legend
        *ngIf="legend && legendType === 'legend'"
        class="legend"
        [data]="legendData"
        [title]="legendTitle"
        [colors]="colors"
        [height]="view[1]"
        [width]="view[0] * legendWidth / 12.0">
      </legend>
    </div>
`
})
export class Chart implements OnChanges {
  @Input() view;
  @Input() legend = false;
  @Input() data;
  @Input() legendData;
  @Input() legendTitle = 'Legend';
  @Input() colors;
  chartWidth: any;

  title: any;
  legendWidth: any;
  legendType: any;

  constructor(private vcr: ViewContainerRef, private injectionService: InjectionService) {
    this.injectionService.setRootViewContainerRef(vcr);
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    this.legendWidth = 0;

    if (this.legend) {
      this.legendType = this.getLegendType();

      if (this.legendType === 'scaleLegend') {
        this.legendWidth = 1;
      } else {
        this.legendWidth = 2;
      }
    }

    this.chartWidth = 12 - this.legendWidth;
  }

  getLegendType() {
    if (typeof this.legendData === 'function') {
      return 'scaleLegend';
    } else {
      return 'legend';
    }
  }
}
