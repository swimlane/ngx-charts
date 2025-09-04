import {
  Component,
  Input,
  Output,
  EventEmitter,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef
} from '@angular/core';
import { treemap, stratify } from 'd3-hierarchy';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';

@Component({
  selector: 'ngx-charts-tree-map',
  template: `
    <ngx-charts-chart [view]="[width, height]" [showLegend]="false" [animations]="animations">
      <svg:g [attr.transform]="transform" class="tree-map chart">
        <svg:g
          ngx-charts-tree-map-cell-series
          [colors]="colors"
          [data]="data"
          [dims]="dims"
          [tooltipDisabled]="tooltipDisabled"
          [tooltipTemplate]="tooltipTemplate"
          [valueFormatting]="valueFormatting"
          [labelFormatting]="labelFormatting"
          [gradient]="gradient"
          [animations]="animations"
          (select)="onClick($event)"
        />
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: ['./tree-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TreeMapComponent extends BaseChartComponent {
  @Input() declare results: DataItem[];
  @Input() tooltipDisabled: boolean = false;
  @Input() valueFormatting: any;
  @Input() labelFormatting: any;
  @Input() gradient: boolean = false;

  @Output() select = new EventEmitter();

  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  domain: any;
  transform: any;
  colors: ColorHelper;
  treemap: any;
  data: DataItem;
  margin: number[] = [10, 10, 10, 10];

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin
    });

    this.domain = this.getDomain();

    this.treemap = treemap<any>().size([this.dims.width, this.dims.height]);

    const rootNode = {
      name: 'root',
      value: 0,
      isRoot: true
    };

    const root = stratify<any>()
      .id(d => {
        let label = d.name;

        if (label.constructor.name === 'Date') {
          label = label.toLocaleDateString();
        } else {
          label = label.toLocaleString();
        }
        return label;
      })
      .parentId(d => (d.isRoot ? null : 'root'))([rootNode, ...this.results])
      .sum(d => d.value);

    this.data = this.treemap(root);

    this.setColors();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  onClick(data: DataItem): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, this.domain, this.customColors);
  }
}
