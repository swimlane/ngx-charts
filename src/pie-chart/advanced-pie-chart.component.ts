import {Component, Input, Output, EventEmitter, OnChanges, NgZone, ElementRef} from '@angular/core';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';
import { trimLabel } from '../common/trim-label.helper';

export interface LegendItem {
  value: number;
  label: string;
  percentage: number;
}

@Component({
  selector: 'advanced-pie-chart',
  template: `
    <div class="advanced-pie chart"
      [style.width]="dims.width"
      [style.height]="view[1]">

      <chart
        [colors]="colors"
        [view]="[dims.width, dims.height]">

        <svg:g
          [attr.transform]="transform"
          class="pie chart">
          <svg:g pieSeries
            [colors]="colors"
            [showLabels]="labels"
            [series]="results"
            [innerRadius]="innerRadius"
            [outerRadius]="outerRadius"
            [gradient]="gradient"
            (clickHandler)="click($event)">
          </svg:g>
        </svg:g>
      </chart>
    </div>

    <div [style.width]="view[0] - dims.width">
      <div class="advanced-pie-legend"
        [style.margin-top]="(view[1] - 215)/2">

        <div class="total-value">
          {{roundedTotal}}
        </div>
        <div class="total-label">
          {{totalLabel}}
        </div>

        <div class="legend-items-container">
          <div class="legend-items">
            <div *ngFor="let legendItem of legendItems" class="legend-item">
              <div class="item-color"
                [style.background]="colors(legendItem.label)">
              </div>
              <div class="item-value">{{legendItem.value}}</div>
              <div class="item-label">{{legendItem.label}}</div>
              <div class="item-percent">{{legendItem.percentage}}%</div>
            </div>
          </div>
        </div>

      </div>
    </div>
  `
})
export class AdvancedPieChart extends BaseChart implements OnChanges {
  data: any;
  dims: ViewDimensions;
  domain: any[];
  outerRadius: number;
  innerRadius: number;
  transform: string;
  total: number;
  roundedTotal: number;
  totalLabel: string;
  legendItems: LegendItem;
  colors: Function;

  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();

  constructor(private element: ElementRef, zone: NgZone) {
    super(element, zone);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();
    this.dims = calculateViewDimensions([this.view[0] * 4 / 12.0, this.view[1]], this.margin, false, false, false);
    this.domain = this.getDomain();
    this.setColors();

    // TODO
    // sort data according to domain
    // this.data = this.results.series[0];
    // this.data.array = this.data.array.sort((a, b) => {
    //   return this.results.d0Domain.indexOf(a.vals[0].label[1]) - this.results.d0Domain.indexOf(b.vals[0].label[1]);
    // });

    let xOffset = this.margin[3] + this.dims.width / 2;
    let yOffset = this.margin[0] + this.dims.height / 2;

    this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
    this.innerRadius = this.outerRadius * 0.75;

    this.transform = `translate(${xOffset} , ${yOffset})`;

    this.total = this.getTotal();
    this.roundedTotal = Math.round(this.total);

    this.totalLabel = 'total';

    this.legendItems = this.getLegendItems();
  }

  getTotal() {
    return this.results
      .map(d => d.value)
      .reduce((sum, d) => sum + d);
  }

  getDomain() {
    return this.results.map(d => d.name);
  }

  getLegendItems(): LegendItem {
    return this.results.map((d, index) => {
      let label = d.name;
      let value = d.value;
      let percentage = Math.round(value / this.total * 100);
      return {
        value: Math.round(value),
        label: trimLabel(label, 20),
        percentage: percentage
      };
    });
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
