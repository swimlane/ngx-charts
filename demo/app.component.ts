import {Component, OnInit} from '@angular/core';
import d3 from '../src/d3';

import { colorSets } from '../src/utils/color-sets';
import '../src/ng2d3.scss';

import {single, multi, countries, generateData, generateGraph} from './data';
import chartGroups from './chartTypes';
import './demo.scss';

@Component({
  selector: 'app',
  template: `
    <main [class]="theme">
      <div class="chart-col">
          <bar-vertical
            *ngIf="chartType === 'bar-vertical'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-vertical>
          <bar-horizontal
            *ngIf="chartType === 'bar-horizontal'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-horizontal>
          <bar-vertical-2d
            *ngIf="chartType === 'bar-vertical-2d'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-vertical-2d>
          <bar-horizontal-2d
            *ngIf="chartType === 'bar-horizontal-2d'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-2d>
          <bar-vertical-stacked
            *ngIf="chartType === 'bar-vertical-stacked'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-vertical-stacked>
          <bar-horizontal-stacked
            *ngIf="chartType === 'bar-horizontal-stacked'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-stacked>
          <bar-vertical-normalized
            *ngIf="chartType === 'bar-vertical-normalized'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-vertical-normalized>
          <bar-horizontal-normalized
            *ngIf="chartType === 'bar-horizontal-normalized'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [legend]="showLegend"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [showGridLines]="showGridLines"
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-normalized>
          <pie-chart
            *ngIf="chartType === 'pie-chart'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            [legend]="showLegend"
            [explodeSlices]="explodeSlices"
            [labels]="showLabels"
            [doughnut]="doughnut"
            [gradient]="gradient"
            (clickHandler)="clickHandler($event)">
          </pie-chart>
          <advanced-pie-chart
            *ngIf="chartType === 'advanced-pie-chart'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            [gradient]="gradient"
            (clickHandler)="clickHandler($event)">
          </advanced-pie-chart>
          <pie-grid
            *ngIf="chartType === 'pie-grid'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            (clickHandler)="clickHandler($event)">
          </pie-grid>
          <line-chart
            *ngIf="chartType === 'line-chart'"
            [view]="view"
            class="chart-container"
            [scheme]="colorScheme"
            [results]="dateData"
            [legend]="showLegend"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [autoScale]="autoScale"
            [timeline]="timeline"
            [showGridLines]="showGridLines"
            [curve]="curve"
            (clickHandler)="clickHandler($event)">
          </line-chart>
          <force-directed-graph
            *ngIf="chartType === 'force-directed-graph'"
            class="chart-container"
            [legend]="showLegend"
            [links]="graph.links"
            [nodes]="graph.nodes"
            [scheme]="colorScheme"
            [view]="view"
            (clickHandler)="clickHandler($event)">
          </force-directed-graph>
          <area-chart
            *ngIf="chartType === 'area-chart'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="dateData"
            [legend]="showLegend"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [autoScale]="autoScale"
            [timeline]="timeline"
            [showGridLines]="showGridLines"
            [curve]="curve"
            (clickHandler)="clickHandler($event)">
          </area-chart>
          <area-chart-stacked
            *ngIf="chartType === 'area-chart-stacked'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="dateData"
            [legend]="showLegend"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [timeline]="timeline"
            [showGridLines]="showGridLines"
            [curve]="curve"
            (clickHandler)="clickHandler($event)">
          </area-chart-stacked>
          <area-chart-normalized
            *ngIf="chartType === 'area-chart-normalized'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="dateData"
            [legend]="showLegend"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            [timeline]="timeline"
            [showGridLines]="showGridLines"
            [curve]="curve"
            (clickHandler)="clickHandler($event)">
          </area-chart-normalized>
          <heat-map
            *ngIf="chartType === 'heat-map'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="multi"
            [legend]="showLegend"
            [gradient]="gradient"
            [xAxis]="showXAxis"
            [yAxis]="showYAxis"
            [showXAxisLabel]="showXAxisLabel"
            [showYAxisLabel]="showYAxisLabel"
            [xAxisLabel]="xAxisLabel"
            [yAxisLabel]="yAxisLabel"
            (clickHandler)="clickHandler($event)">
          </heat-map>
          <tree-map
            *ngIf="chartType === 'tree-map'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            (clickHandler)="clickHandler($event)">
          </tree-map>
          <number-card
            *ngIf="chartType === 'number-card'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            (clickHandler)="clickHandler($event)">
          </number-card>

          <gauge
            *ngIf="chartType === 'gauge'"
            class="chart-container"
            [view]="view"
            [scheme]="colorScheme"
            [value]="gaugeValue"
            [min]="gaugeMin"
            [max]="gaugeMax"
            [units]="gaugeUnits"
            [bigSegments]="gaugeLargeSegments"
            [smallSegments]="gaugeSmallSegments"
            (clickHandler)="clickHandler($event)">
          </gauge>
      </div>
      <div class="sidebar">
        <h1>
          ng2<strong>d3</strong>
          <small>Angular2 D3 Chart Framework</small>
        </h1>
        <h3>Theme</h3>
        <select
          [ngModel]="theme"
          (ngModelChange)="theme = $event">>
          <option [value]="'dark'">Dark</option>
          <option [value]="'light'">Light</option>
        </select>

        <h3>Chart Type</h3>
        <select
          [ngModel]="chartType"
          (ngModelChange)="selectChart($event)">
          <template ngFor let-group [ngForOf]="chartGroups">
            <optgroup [label]="group.name">
              <option *ngFor="let chart of group.charts" [value]="chart.selector">{{chart.name}}</option>
            </optgroup>
          </template>
        </select>

        <pre *ngIf="chart.inputFormat === 'singleSeries'">{{single | json}}</pre>
        <pre *ngIf="chart.inputFormat === 'multiSeries' && !linearScale">{{multi | json}}</pre>
        <pre *ngIf="chart.inputFormat === 'multiSeries' && linearScale">{{dateData | json}}</pre>
        <div>
          <label>
            <input type="checkbox" [checked]="realTimeData" (change)="realTimeData = $event.target.checked">
            Real-time
          </label>
        </div>
        <h3>Options</h3>
        <div>
          <label><strong>Dimensions</strong></label><br />
          <label>
            <input type="checkbox" [checked]="fitContainer" (change)="toggleFitContainer($event.target.checked)">
            Fit Container
          </label> <br />
          <div *ngIf="!fitContainer">
            <label>Width:</label><br />
            <input type="number" [(ngModel)]="width"><br />
            <label>Height:</label><br />
            <input type="number" [(ngModel)]="height"><br />
            <button (click)="applyDimensions()">Apply dimensions</button>
          </div>
        </div>
        <hr />
        <label>Color Scheme</label>
        <select
          [ngModel]="selectedColorScheme"
          (ngModelChange)="setColorScheme($event)">
          <option *ngFor="let scheme of colorSets" [value]="scheme.name">{{scheme.name}}</option>
        </select>

        <div *ngIf="chart.options.includes('showXAxis')">
          <label>
            <input type="checkbox" [checked]="showXAxis" (change)="showXAxis = $event.target.checked">
            Show X Axis
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('showYAxis')">
          <label>
            <input type="checkbox" [checked]="showYAxis" (change)="showYAxis = $event.target.checked">
            Show Y Axis
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('showGridLines')">
          <label>
            <input type="checkbox" [checked]="showGridLines" (change)="showGridLines = $event.target.checked">
            Show Grid Lines
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('gradient')">
          <label>
            <input type="checkbox" [checked]="gradient" (change)="gradient = $event.target.checked">
            Use Gradients
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('showLegend')">
          <label>
            <input type="checkbox" [checked]="showLegend" (change)="showLegend = $event.target.checked">
            Show Legend
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('showXAxisLabel')">
          <label>
            <input type="checkbox" [checked]="showXAxisLabel" (change)="showXAxisLabel = $event.target.checked">
            Show X Axis Label
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('xAxisLabel')">
          <label>X Axis Label:</label><br />
          <input type="text" [(ngModel)]="xAxisLabel"><br />
        </div>
        <div *ngIf="chart.options.includes('showYAxisLabel')">
          <label>
            <input type="checkbox" [checked]="showYAxisLabel" (change)="showYAxisLabel = $event.target.checked">
            Show Y Axis Label
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('yAxisLabel')">
          <label>Y Axis Label:</label><br />
          <input type="text" [(ngModel)]="yAxisLabel"><br />
        </div>
        <div *ngIf="chart.options.includes('showLabels')">
          <label>
            <input type="checkbox" [checked]="showLabels" (change)="showLabels = $event.target.checked">
            Show Labels
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('explodeSlices')">
          <label>
            <input type="checkbox" [checked]="explodeSlices" (change)="explodeSlices = $event.target.checked">
            Explode Slices
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('doughnut')">
          <label>
            <input type="checkbox" [checked]="doughnut" (change)="doughnut = $event.target.checked">
            Doughnut
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('autoScale')">
          <label>
            <input type="checkbox" [checked]="autoScale" (change)="autoScale = $event.target.checked">
            Auto Scale
          </label> <br />
        </div>
        <div *ngIf="chart.options.includes('timeline')">
          <label>
            <input type="checkbox" [checked]="timeline" (change)="timeline = $event.target.checked">
            Timeline
          </label> <br />
        </div>

        <div *ngIf="chart.options.includes('curve')">
          <label>Line Interpolation</label>
          <select
            [ngModel]="curveType"
            (ngModelChange)="setInterpolationType($event)">
            <option *ngFor="let interpolationType of interpolationTypes" [value]="interpolationType">{{interpolationType}}</option>
          </select>
        </div>

        <div *ngIf="chart.options.includes('min')">
          <label>Min value:</label><br />
          <input type="number" [(ngModel)]="gaugeMin"><br />
        </div>

        <div *ngIf="chart.options.includes('max')">
          <label>Max value:</label><br />
          <input type="number" [(ngModel)]="gaugeMax"><br />
        </div>

        <div *ngIf="chart.options.includes('value')">
          <label>Value:</label><br />
          <input type="number" [(ngModel)]="gaugeValue"><br />
        </div>

        <div *ngIf="chart.options.includes('largeSegments')">
          <label>Number of large segments:</label><br />
          <input type="number" [(ngModel)]="gaugeLargeSegments"><br />
        </div>

        <div *ngIf="chart.options.includes('smallSegments')">
          <label>Number of small segments:</label><br />
          <input type="number" [(ngModel)]="gaugeSmallSegments"><br />
        </div>

        <div *ngIf="chart.options.includes('units')">
          <label>Units:</label><br />
          <input type="text" [(ngModel)]="gaugeUnits"><br />
        </div>

      </div>
    </main>
  `
})

export class AppComponent implements OnInit {
  
  theme = "light";
  chartType = 'bar-vertical';
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = false;
  countries: any[];
  single: any[];
  multi: any[];
  dateData: any[];
  graph: { links: any[], nodes: any[] };
  linearScale: boolean = false;

  view: any[];
  width: number = 700;
  height: number = 300;
  fitContainer: boolean = false;

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';
  showGridLines = true;

  // line interpolation
  curveType: string = 'Linear';
  curve = d3.shape.curveLinear;
  interpolationTypes = ['Basis', 'Bundle', 'Cardinal', 'Catmull Rom', 'Linear', 'Monotone X', 'Monotone Y', 'Natural', 'Step', 'Step After', 'Step Before'];

  colorSets: any;
  colorScheme: any;
  selectedColorScheme: string;

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = true;
  timeline = false;

  // gauge
  gaugeValue: number = 60;
  gaugeMin: number = 0;
  gaugeMax: number = 100;
  gaugeLargeSegments: number = 10;
  gaugeSmallSegments: number = 5;
  gaugeUnits: string = 'alerts';

  constructor() {
    Object.assign(this, {
      single,
      multi,
      countries,
      chartGroups,
      colorSets,
      graph: generateGraph(50)
    });

    this.dateData = generateData(5);
    this.setColorScheme('cool');
  }

  ngOnInit() {
    this.selectChart(this.chartType);

    setInterval(this.updateData.bind(this), 1000);

    if (!this.fitContainer) {
      this.applyDimensions();
    }
  }

  updateData() {
    if (!this.realTimeData) {
      return;
    }

    this.gaugeValue = this.gaugeMin + Math.ceil(Math.random() * this.gaugeMax);

    let country = this.countries[Math.floor(Math.random() * this.countries.length)];
    let add = Math.random() < 0.7;
    let remove = Math.random() < 0.5;

    if (remove) {
      if (this.single.length > 1) {
        let index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [...this.single];
      }

      if (this.multi.length > 1) {
        let index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [...this.multi];
      }

      if (this.graph.nodes.length > 1) {
        let index = Math.floor(Math.random() * this.graph.nodes.length);
        let value = this.graph.nodes[index].value;
        this.graph.nodes.splice(index, 1);
        const nodes = [ ...this.graph.nodes ];

        const links = this.graph.links.filter(link => {
          return link.source !== value && link.source.value !== value &&
            link.target !== value && link.target.value !== value;
        });
        this.graph = { links, nodes };
      }
    }

    if (add) {
      // single
      let entry = {
        name: country,
        value: Math.floor(1000000 + Math.random() * 20000000)
      };
      this.single = [...this.single, entry];

      // multi
      let multiEntry = {
        name: country,
        series: [{
          name: "2010",
          value: Math.floor(1000000 + Math.random() * 20000000)
        }, {
          name: "2011",
          value: Math.floor(1000000 + Math.random() * 20000000)
        }]
      };

      this.multi = [...this.multi, multiEntry];

      // graph
      const node = { value: country };
      const nodes = [ ...this.graph.nodes, node];
      const link = {
        source: country,
        target: nodes[Math.floor(Math.random() * (nodes.length - 1))].value,
      };
      const links = [ ...this.graph.links, link];
      this.graph = { links, nodes };
    }
  }

  applyDimensions() {
    this.view = [this.width, this.height];
  }

  toggleFitContainer(event) {
    this.fitContainer = event;

    if (this.fitContainer) {
      this.view = undefined;
    } else {
      this.applyDimensions();
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;

    this.linearScale = this.chartType === 'line-chart' ||
      this.chartType === 'area-chart' ||
      this.chartType === 'area-chart-normalized' ||
      this.chartType === 'area-chart-stacked';

    for (let group of this.chartGroups) {
      for (let chart of group.charts) {
        if (chart.selector === chartSelector) {
          this.chart = chart;
          return;
        }
      }
    }
  }

  clickHandler(data) {
    console.log('Item clicked', data);
  }

  setInterpolationType(curveType) {
    this.curveType = curveType;
    if (curveType === 'Basis') {
      this.curve = d3.shape.curveBasis;
    }
    if (curveType === 'Bundle') {
      this.curve = d3.shape.curveBundle.beta(1);
    }
    if (curveType === 'Cardinal') {
      this.curve = d3.shape.curveCardinal;
    }
    if (curveType === 'Catmull Rom') {
      this.curve = d3.shape.curveCatmullRom;
    }
    if (curveType === 'Linear') {
      this.curve = d3.shape.curveLinear;
    }
    if (curveType === 'Monotone X') {
      this.curve = d3.shape.curveMonotoneX;
    }
    if (curveType === 'Monotone Y') {
      this.curve = d3.shape.curveMonotoneY;
    }
    if (curveType === 'Natural') {
      this.curve = d3.shape.curveNatural;
    }
    if (curveType === 'Step') {
      this.curve = d3.shape.curveStep;
    }
    if (curveType === 'Step After') {
      this.curve = d3.shape.curveStepAfter;
    }
    if (curveType === 'Step Before') {
      this.curve = d3.shape.curveStepBefore;
    }
  }

  setColorScheme(name) {
    this.selectedColorScheme = name;
    this.colorScheme = this.colorSets.find(s => s.name === name);
  }
}
