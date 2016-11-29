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
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';
import { gridLayout } from '../common/grid-layout.helper';

@Component({
  selector: 'number-card',
  template: `
    <chart
      [legend]="false"
      (legendLabelClick)="legendLabelClick.emit($event)"
      [view]="[width, height]">
      <svg:g [attr.transform]="transform" class="number-card chart">
        <svg:g cardSeries
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class NumberCard extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {

  @Input() view;
  @Input() results;
  @Input() margin = [10, 10, 10, 10];
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();
  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();

  dims: ViewDimensions;
  data: any[];
  colors: Function;
  transform: string;
  domain: any[];

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
        margins: this.margin
      });

      this.domain = this.getDomain();

      this.data = gridLayout(this.dims, this.results, 150);

      this.setColors();
      this.transform = `translate(${ this.dims.xOffset } , ${ this.margin[0] })`;
    });
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
