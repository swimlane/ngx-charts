import {
  ChangeDetectionStrategy,
  Component,
  ContentChild,
  ElementRef,
  EventEmitter,
  Input,
  OnInit,
  Output,
  TemplateRef,
  ViewEncapsulation
} from '@angular/core';
import { BaseChartComponent } from '@swimlane/ngx-charts/common/base-chart.component';
import { LegendOptions, LegendPosition } from '@swimlane/ngx-charts/common/types/legend.model';
import { DataItem, GeoMapChartSeries } from '@swimlane/ngx-charts/models/chart-data.model';
import { ColorHelper } from '@swimlane/ngx-charts/common/color.helper';
import { ScaleType } from '@swimlane/ngx-charts/common/types/scale-type.enum';
import {Results, ViewDimensions} from '@swimlane/ngx-charts/common/types/view-dimension.interface';
import { geoEquirectangular, geoMercator, geoPath } from 'd3-geo';
import { select } from 'd3-selection';

@Component({
  selector: 'ngx-charts-geo-map',
  template: ` <ngx-charts-chart
    [view]="[width, height]"
    [showLegend]="legend"
    [legendOptions]="legendOptions"
    [activeEntries]="activeEntries"
    [animations]="animations"
    (legendLabelClick)="onClick($event)"
  >
  </ngx-charts-chart>`,
  styleUrls: ['../common/base-chart.component.scss', './geo-map.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GeoMapComponent<T extends GeoMapChartSeries> extends BaseChartComponent implements OnInit {
  @Input() results: T;
  @Input() labels: boolean = false;
  @Input() legend: boolean = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: LegendPosition = LegendPosition.Right;
  @Input() explodeSlices: boolean = false;
  @Input() doughnut: boolean = false;
  @Input() arcWidth: number = 0.25;
  @Input() gradient: boolean;
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled: boolean = false;
  @Input() labelFormatting: any;
  @Input() trimLabels: boolean = true;
  @Input() maxLabelLength: number = 10;
  @Input() tooltipText: any;
  @Input() drawFn: (params: {
    element: ElementRef;
    selector: string;
    results: T;
    compInstance: GeoMapComponent<T>;
  }) => any;
  @Output() dblclick = new EventEmitter();
  // optional margins
  @Input() margins: number[];
  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  @ContentChild('mapTpl') mapTpl: TemplateRef<any>;

  data: DataItem[];
  colors: ColorHelper;
  domain: string[];
  dims: ViewDimensions;
  legendOptions: LegendOptions;
  geoJSON: any;
  projections: any;

  ngOnInit() {
    super.ngOnInit();
    this.projections = geoEquirectangular()
      .scale(150) // 地图缩放比例
      .translate([this.width / 2, this.height / 2]); // 平移至中心
  }

  update() {
    super.update();
    this.legendOptions = this.getLegendOptions();
    this.geoJSON = (this.results as GeoMapChartSeries).GeoJSON;

    if (!this.geoJSON) return;

    if (this.drawFn) {
      this.drawFn({
        element: this.chartElement,
        selector: '.ngx-charts',
        results: this.results,
        compInstance: this
      });
    } else {
      /**
       * TODO: 感觉有问题，我怎么知道需要绘制多少轮廓线，可能州级别和国家轮廓线清晰度不一样
       */
      const projection = geoMercator()
        .center([107, 31]) //地图中心位置,107是经度，31是纬度
        .scale(600) //设置缩放量
        .translate([this.width / 2, this.height / 2]); // 设置平移量

      const path = geoPath(projection);
      const svg = select(this.chartElement.nativeElement).select('.ngx-charts');
      const g = svg.append('g');
      const states = g
        .selectAll('path')
        .data(this.geoJSON['features']) // 绑定数据
        .enter()
        .append('path')
        .style('fill', 'white')
        .style('stroke-width', '10px')
        .attr('d', path);
    }
  }

  getDomain(): string[] {
    return this.results.map(d => d.label);
  }

  onClick(data: DataItem | string): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, ScaleType.Ordinal, this.domain, this.customColors);
  }

  getLegendOptions(): LegendOptions {
    return {
      scaleType: ScaleType.Ordinal,
      domain: this.domain,
      colors: this.colors,
      title: this.legendTitle,
      position: this.legendPosition
    };
  }
}
