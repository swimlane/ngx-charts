import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';

@Component({
  selector: 'pie-chart',
  template: `
    <chart
      [colors]="colors"
      [legend]="legend"
      [view]="view"
      [legendData]="domain">
      <svg:g [attr.transform]="translation" class="pie-chart chart">
        <svg:g pieSeries
          [colors]="colors"
          [showLabels]="labels"
          [series]="data"
          [innerRadius]="innerRadius"
          [outerRadius]="outerRadius"
          [explodeSlices]="explodeSlices"
          [gradient]="gradient"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `
})
export class PieChart extends BaseChart implements OnChanges {
  outerRadius: number;
  innerRadius: number;
  data: any;
  colors: Function;
  domain: any;

  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;
  @Input() labels = false;
  @Input() legend = false;
  @Input() explodeSlices = false;
  @Input() doughnut = false;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

  translation: string;

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    let dims = calculateViewDimensions(this.view, this.margin, false, false, this.legend, 9);
    let xOffset = this.margin[3] + dims.width / 2;
    let yOffset = this.margin[0] + dims.height / 2;
    this.translation = `translate(${xOffset}, ${yOffset})`;
    this.outerRadius = Math.min(dims.width, dims.height);
    if (this.labels) {
      // make room for labels
      this.outerRadius /= 3;
    } else {
      this.outerRadius /= 2;
    }
    this.innerRadius = 0;
    if (this.doughnut) {
      this.innerRadius = this.outerRadius * 0.75;
    }

    this.domain = this.getDomain();

    // sort data according to domain
    this.data = this.results.sort((a, b) => {
      return this.domain.indexOf(a.name) - this.domain.indexOf(b.name);
    });

    this.setColors();
  }

  getDomain() {
    return this.results.map(d => d.name);
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
