import { Component, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';
import { gridLayout } from '../common/grid-layout.helper';
import d3 from '../d3';

@Component({
  selector: 'pie-grid',
  template: `
    <chart
      [legend]="false"
      [view]="view" >
      <svg:g [attr.transform]="transform" class="pie-grid-chart">
        <svg:g
          *ngFor="let series of series"
          class="pie-grid-item"
          [attr.transform]="series.transform">

          <svg:g pieGridSeries
            [colors]="series.colors"
            [data]="series.data"
            [innerRadius]="series.innerRadius"
            [outerRadius]="series.outerRadius"
            (clickHandler)="click($event)"
          />

          <svg:text
            class="label"
            dy="-0.5em"
            x="0"
            y="5"
            text-anchor="middle">
            {{series.percent}}
          </svg:text>

          <svg:text
            class="label"
            dy="0.5em"
            x="0"
            y="5"
            text-anchor="middle">
            {{series.label}}
          </svg:text>

          <svg:text
            class="label"
            dy="1.23em"
            x="0"
            [attr.y]="series.outerRadius"
            text-anchor="middle">
            {{series.total}}
          </svg:text>

        </svg:g>
      </svg:g>
    </chart>
  `
})
export class PieGrid extends BaseChart implements OnChanges {
  dims: ViewDimensions;
  data: any[];
  transform: string;
  series: any[];
  domain: any[];
  colorScale: Function;
  margin = [20, 20, 20, 20];

  @Input() view;
  @Input() results;
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);
    this.domain = this.getDomain();

    this.data = gridLayout(this.dims, this.results, 150);
    this.transform = `translate(${this.margin[3]} , ${this.margin[0]})`;

    this.series = this.getSeries();
    this.setColors();
  }

  getDomain() {
    return this.results.map(d => d.name);
  }

  getSeries() {
    let total = this.getTotal();
    return this.data.map((d) => {
      let label = d.data.name;
      let value = d.data.value;
      let radius = d3.min([d.width, d.height]) / 2.1;
      let innerRadius = radius * 0.75;

      let count = 0;

      let colors = () => {
        count += 1;
        if (count === 1) {
          return 'rgba(100,100,100,0.3)';
        } else {
          return this.colorScale(label);
        }
      };

      return {
        transform: `translate(${d.x + d.width / 2} , ${d.y + d.height / 2})`,
        colors: colors,
        innerRadius: innerRadius,
        outerRadius: radius,
        label: trimLabel(label),
        total: `Total: ${d3.format(".2f")(value)}`,
        percent: d3.format(".1p")(d.data.percent),
        data: [d, {
          data: {
            other: true,
            value: total - value,
            name: d.data.name
          }
        }]
      };
    });
  }

  getTotal() {
    return this.results
      .map(d => d.value)
      .reduce((sum, d) => sum + d);
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colorScale = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
