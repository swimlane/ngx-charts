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
import d3 from '../d3';
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';

@Component({
  selector: 'tree-map',
  template: `
    <chart
      [legend]="false"
      [view]="[width, height]"
      (legendLabelClick)="legendLabelClick.emit($event)">
      <svg:g [attr.transform]="transform" class="tree-map chart">
        <svg:g treeMapCellSeries
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          (clickHandler)="click($event)"
        />
      </svg:g>
    </chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class TreeMap extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {

  @Input() view;
  @Input() results;
  @Input() scheme;
  @Input() customColors;

  @Output() clickHandler = new EventEmitter();
  @Output() legendLabelClick: EventEmitter<any> = new EventEmitter();

  dims: any;
  domain: any;
  transform: any;
  colors: any;
  treemap: any;
  data: any;
  margin = [10, 10, 10, 10];

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
        columns: 12
      });

      this.domain = this.getDomain();

      this.treemap = d3.treemap()
        .size([this.dims.width, this.dims.height]);

      let rootNode = {
        name: 'root',
        value: 0,
        isRoot: true
      };

      let root = d3.stratify()
        .id(d => {
          let label = d.name;

          if (label.constructor.name === 'Date') {
            label = label.toLocaleDateString();
          } else {
            label = label.toLocaleString();
          }
          return label;
        })
        .parentId(d => { return d.isRoot ? null : 'root'; })
        ([rootNode, ...this.results])
        .sum(d => d.value);

      this.data = this.treemap(root);

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
