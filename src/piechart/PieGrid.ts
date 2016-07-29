import { Component, Input, Output, EventEmitter } from '@angular/core';
import { calculateViewDimensions } from '../common/viewDimensions';
import { colorHelper } from '../utils/colorSets';
import { Chart } from '../common/charts/Chart';
import { BaseChart } from '../BaseChart';
import { PieGridSeries } from './PieGridSeries';
import { trimLabel } from '../common/trimLabel';
import { gridLayout } from '../common/gridLayout';

@Component({
  selector: 'pie-grid',
  directives: [Chart, PieGridSeries],
  template: `
    <chart
      [legend]="false"
      [view]="view" >
      <svg:g [attr.transform]="transform" class="pie-grid-chart">
        <svg:g
          *ngFor="let series of series"
          class="pie-grid-item"
          [attr.transform]="series.transform">

          <svg:g pie-grid-series
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
export class PieGrid extends BaseChart {
  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();

  ngOnInit() {
    this.dims = calculateViewDimensions(this.view, this.margin, false, false, false);
    this.setColors();

    // sort data according to domain
    let sortedData = this.results.series[0];
    sortedData.array = sortedData.array.sort((a, b) => {
      return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1])
    })

    this.data = gridLayout(this.dims, sortedData, 150);
    this.transform = `translate(${this.margin[3]} , ${this.margin[0]})`;

    this.series = this.getSeries();
  }

  getSeries(){
    return this.data.map((d) => {
      let label = d.data.label[0][0];
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
            value: d.data.total - value,
            label: [['other']],
            formattedLabel: ['other']
          }
        }]
      }
    })
  }

  click(data){
    this.clickHandler.emit(data);
  }

  setColors(){
    this.colorScale = colorHelper(this.scheme, 'ordinal', this.results.d0Domain, this.customColors);
  }

}
