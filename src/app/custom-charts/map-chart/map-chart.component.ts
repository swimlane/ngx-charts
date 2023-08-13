import {
  Component,
  Input,
  ViewEncapsulation,
  Output,
  EventEmitter,
  OnInit
} from '@angular/core';

import {
  BaseChartComponent,
  ViewDimensions,
  ColorHelper,
  calculateViewDimensions,
} from 'projects/swimlane/ngx-charts/src/public-api';
import { LegendPosition } from '../../../../projects/swimlane/ngx-charts/src/lib/common/types/legend.model';
import * as L from 'leaflet';

@Component({
  selector: 'map-chart-component',
  template: `
    <div 
      class="map-container" 
      [style.flexDirection]="legendPosition === LegendPosition.Right ? 'row' : 'column'"
    >
      <div id="map" [style.width.px]="dims.width" [style.height.px]="dims.height"></div>
      <ngx-charts-legend
        *ngIf="legend"
        class="chart-legend"
        [horizontal]="legendPosition === LegendPosition.Below"
        [data]="domain"
        [title]="legendTitle"
        [colors]="colors"
        [height]="height"
        [width]="legendWidth"
        [includedEntries]="filteredDomain"
        (labelClick)="legendOnClick($event)"
      >
      </ngx-charts-legend>
    </div>
  `,
  styleUrls: ['./map-chart.component.scss', '../../../../projects/swimlane/ngx-charts/src/lib/common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MapChartComponent extends BaseChartComponent implements OnInit {
  @Input() legend = false;
  @Input() legendTitle: string = 'Legend';
  @Input() legendPosition: string = 'right';
  @Input() mapZoom: number;
  @Input() initCoordX: any;
  @Input() initCoordY: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  dims: ViewDimensions;
  transform: string;
  colors: ColorHelper;
  margin: any[] = [10, 20, 10, 20];
  legendOptions: any;
  legendWidth
  mapInitialize: boolean = false;
  map: any;
  markersLayer: any;
  domain: any[];
  filteredDomain: any[];
  includedEntries: any[];

  readonly LegendPosition = LegendPosition;

  trackBy(index, item): string {
    return `${item.name}`;
  }

  update(): void {
    super.update();
    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      showXAxis: false,
      showYAxis: false,
      showXLabel: false,
      showYLabel: false,
      showLegend: this.legend,
      legendType: this.schemeType,
      legendPosition: this.legendPosition as any
    });

    this.domain = this.getDomain();
    if (!this.filteredDomain) {
      this.filteredDomain = this.domain;
    }

    this.colors = new ColorHelper(this.scheme, this.schemeType, this.domain, this.customColors);

    this.addMarkers();
    
    this.updateLegend();

    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
    console.log(this.scheme);
  }
  
  ngOnInit() {
    this.mapInit();
  }


  mapInit(): void {
    this.map = L.map('map', {
      center: [this.initCoordX, this.initCoordY],
      zoom: this.mapZoom
    });

    setTimeout(() => {
      this.map.invalidateSize(true);
    }, 0);

    const tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      maxZoom: 18,
      minZoom: 3,
      attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    });

    tiles.addTo(this.map);

    this.markersLayer = L.layerGroup();
    this.markersLayer.addTo(this.map);

    this.mapInitialize = true;
  }

  getDomain(): any[] {
    let values = [];
    for (const d of this.results) {
      values.push(d.name);
    }
    return values;
  }

  addMarkers(): void {
    if (!this.mapInitialize) return;
    this.markersLayer.clearLayers();
    for (const d of this.results) {
      if (this.filteredDomain.includes(d.name)) {
        for (const location of d.series) {
          const markerHtmlStyles = `
            background-color: ${this.colors.getColor(d.name)};
            width: 2rem;
            height: 2rem;
            display: block;
            left: -1rem;
            top: -1rem;
            position: relative;
            border-radius: 2rem 2rem 0;
            transform: rotate(45deg);
            border: 1px solid #FFFFFF;
          `;
          const icon = L.divIcon({
            iconAnchor: [0, 24],
            tooltipAnchor: [-6, 0],
            popupAnchor: [0, -36],
            html: `<span style="${markerHtmlStyles}" />`
          });
          const marker = L.marker(location.value, {icon: icon});

          marker.bindTooltip(location.name, {
            direction: 'top',
            offset: L.point(7, -40),
            className: 'map-tooltip',
            opacity: 0.75
          }).openTooltip();

          this.markersLayer.addLayer(marker);
        }
      }
    }
  }

  updateLegend(): void {
    let legendColumns = 0;
    if (this.legend) {

      if (this.legendPosition === LegendPosition.Right) {
        legendColumns = 2;
      }
    }

    const chartColumns = 12 - legendColumns;

    const chartWidth = Math.floor((this.width * chartColumns) / 12.0);
    this.legendWidth =
      this.legendPosition === LegendPosition.Right
        ? Math.floor((this.width * legendColumns) / 12.0)
        : chartWidth;
  }

  legendOnClick(data) {
    this.select.emit(data);
    var index = this.filteredDomain.indexOf(data);
    if (index !== -1) {
      this.filteredDomain.splice(index, 1);
    }
    else {
      this.filteredDomain.push(data);
    }
    this.update();
  }
}
