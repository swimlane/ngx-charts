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
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { BaseChart } from '../common/base-chart.component';

@Component({
  selector: 'pie-chart',
  template: `
    <chart
      [colors]="colors"
      (legendLabelClick)="legendLabelClick.emit($event)"
      [legend]="legend"
      [view]="[width, height]"
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
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PieChart extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {

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
  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();

  translation: string;
  outerRadius: number;
  innerRadius: number;
  data: any;
  colors: Function;
  domain: any;
  dims: any;

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
        width: this.width,
        height: this.height,
        margins: this.margin,
        showLegend: this.legend,
        columns: 10
      });

      let xOffset = this.margin[3] + this.dims.width / 2;
      let yOffset = this.margin[0] + this.dims.height / 2;
      this.translation = `translate(${xOffset}, ${yOffset})`;
      this.outerRadius = Math.min(this.dims.width, this.dims.height);
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
    });
  }

  getDomain() {
    let items = [];
    this.results.map(d => {
      let label = d.name;
      if (label.constructor.name === 'Date') {
        label = label.toLocaleDateString();
      } else {
        label = label.toLocaleString();
      }

      if (items.indexOf(label) === -1) {
        items.push(label);
      }
    });

    console.log('items', items);
    return items;
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }

}
