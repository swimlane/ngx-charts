import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  OnDestroy,
  AfterViewInit,
  ElementRef,
  NgZone,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';
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
      [view]="[width, height]" >
      <svg:g [attr.transform]="transform" class="pie-grid chart">
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

            swui-tooltip
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="series.label + ': ' + series.value.toLocaleString()"
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
            {{series.total.toLocaleString()}}
          </svg:text>

        </svg:g>
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PieGrid extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
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

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

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
      const baselineLabelHeight = 20;
      const padding = 10;
      let label = d.data.name;
      let value = d.data.value;
      let radius = d3.min([d.width -padding, d.height - baselineLabelHeight]) / 2;
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
        transform: `translate(${d.x + (d.width - padding) / 2} , ${d.y + (d.height - baselineLabelHeight) / 2 })`,
        colors: colors,
        innerRadius: innerRadius,
        outerRadius: radius,
        label: trimLabel(label),
        total: `Total: ${value.toLocaleString()}`,
        value: value,
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
      .reduce((sum, d) => { return sum + d; }, 0);
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colorScale = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
