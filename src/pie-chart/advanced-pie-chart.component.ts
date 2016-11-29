import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  NgZone,
  ElementRef,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
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
    <div 
      [style.width.px]="width"
      [style.height.px]="height">
      <div class="advanced-pie chart"
        [style.width.px]="dims.width"
        [style.height.px]="dims.height">
        <chart
          [colors]="colors"
          (legendLabelClick)="legendLabelClick.emit($event)"
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
      <div [style.width.px]="width - dims.width" class="advanced-pie-legend-wrapper">
        <div class="advanced-pie-legend"
          [style.margin-top.px]="(height - 215) / 2"
          [style.width.px]="width - dims.width - margin[1]">
          <div class="total-value">
            {{roundedTotal.toLocaleString()}}
          </div>
          <div class="total-label">
            {{totalLabel}}
          </div>
          <div class="legend-items-container">
            <div class="legend-items">
              <div 
                *ngFor="let legendItem of legendItems"
                tabindex="-1"
                (click)="legendLabelClick.emit(legendItem)"
                class="legend-item">
                <div 
                  class="item-color"
                  [style.background]="colors(legendItem.label)">
                </div>
                <div class="item-value">{{legendItem.value.toLocaleString()}}</div>
                <div class="item-label">{{legendItem.label}}</div>
                <div class="item-percent">{{legendItem.percentage.toLocaleString()}}%</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AdvancedPieChart extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  
  @Input() view;
  @Input() results;
  @Input() margin = [20, 20, 20, 20];
  @Input() scheme;
  @Input() customColors;
  @Input() gradient: boolean;

  @Output() clickHandler = new EventEmitter();
  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();

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
  legendWidth: number;

  constructor(private element: ElementRef, private cd: ChangeDetectorRef, zone: NgZone) {
    super(element, zone, cd);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
  }

  ngOnDestroy() {
    this.unbindEvents();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();

    this.zone.run(() => {
      this.dims = calculateViewDimensions({
        width: this.width * 4 / 12.0,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();
      this.setColors();

      let xOffset = this.dims.width / 2;
      let yOffset = this.margin[0] + this.dims.height / 2;
      this.legendWidth = this.width - this.dims.width - this.margin[1];

      this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2.5;
      this.innerRadius = this.outerRadius * 0.75;

      this.transform = `translate(${xOffset} , ${yOffset})`;

      this.total = this.getTotal();
      this.roundedTotal = Math.round(this.total);

      this.totalLabel = 'total';

      this.legendItems = this.getLegendItems();
    });
  }

  getTotal() {
    return this.results
      .map(d => d.value)
      .reduce((sum, d) => { return sum + d; }, 0);
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
