import { Component, OnInit } from '@angular/core';
import { single, multi, countries } from './data';
import chartGroups from './chartTypes';
import '../src/ng2d3.scss';
import './demo.scss';

@Component({
  selector: 'app',
  template: `
    <main>
      <div class="chart-col">
        <div class="chart-view">
          <bar-vertical
            *ngIf="chartType === 'bar-vertical'"
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
            (clickHandler)="clickHandler($event)">
          </bar-vertical>

          <bar-horizontal
            *ngIf="chartType === 'bar-horizontal'"
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
            (clickHandler)="clickHandler($event)">
          </bar-horizontal>

          <bar-vertical-2d
            *ngIf="chartType === 'bar-vertical-2d'"
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
            (clickHandler)="clickHandler($event)">
          </bar-vertical-2d>

          <bar-horizontal-2d
            *ngIf="chartType === 'bar-horizontal-2d'"
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
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-2d>

          <bar-vertical-stacked
            *ngIf="chartType === 'bar-vertical-stacked'"
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
            (clickHandler)="clickHandler($event)">
          </bar-vertical-stacked>

          <bar-horizontal-stacked
            *ngIf="chartType === 'bar-horizontal-stacked'"
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
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-stacked>

          <bar-vertical-normalized
            *ngIf="chartType === 'bar-vertical-normalized'"
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
            (clickHandler)="clickHandler($event)">
          </bar-vertical-normalized>

          <bar-horizontal-normalized
            *ngIf="chartType === 'bar-horizontal-normalized'"
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
            (clickHandler)="clickHandler($event)">
          </bar-horizontal-normalized>

          <pie-chart
            *ngIf="chartType === 'pie-chart'"
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
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            [gradient]="gradient"
            (clickHandler)="clickHandler($event)">
          </advanced-pie-chart>

          <pie-grid
            *ngIf="chartType === 'pie-grid'"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            (clickHandler)="clickHandler($event)">
          </pie-grid>

          <line-chart
            *ngIf="chartType === 'line-chart'"
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
            [autoScale]="autoScale"
            (clickHandler)="clickHandler($event)">
          </line-chart>

          <area-chart
            *ngIf="chartType === 'area-chart'"
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
            [autoScale]="autoScale"
            (clickHandler)="clickHandler($event)">
          </area-chart>

          <area-chart-stacked
            *ngIf="chartType === 'area-chart-stacked'"
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
          </area-chart-stacked>

          <area-chart-normalized
            *ngIf="chartType === 'area-chart-normalized'"
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
          </area-chart-normalized>

          <heat-map
            *ngIf="chartType === 'heat-map'"
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

          <number-card
            *ngIf="chartType === 'number-card'"
            [view]="view"
            [scheme]="colorScheme"
            [results]="single"
            (clickHandler)="clickHandler($event)">
          </number-card>
        </div>
      </div>

      <div class="sidebar">
        <h1>
          ng2<strong>d3</strong>
          <small>Angular2 D3 Chart Framework</small>
        </h1>

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

        <h3>Data</h3>
        <select>
          <option>Country</option>
        </select>

        <pre *ngIf="chart.inputFormat === 'singleSeries'">{{single | json}}</pre>
        <pre *ngIf="chart.inputFormat === 'multiSeries'">{{multi | json}}</pre>

        <div>
          <label>
            <input type="checkbox" [checked]="realTimeData" (change)="realTimeData = $event.target.checked">
            Real-time
          </label>
        </div>

        <h3>Options</h3>

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

        <div *ngIf="chart.options.includes('gradient')">
          <label>
            <input type="checkbox" [checked]="gradient" (change)="gradient = $event.target.checked">
            Use gradients
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
      </div>
    </main>
  `
})
export class App implements OnInit {
  chartType = 'bar-vertical';
  chartGroups: any[];
  chart: any;
  realTimeData: boolean = true;
  countries: any[];
  single: any[];
  multi: any[];

  view: any[] = [900, 400];

  // options
  showXAxis = true;
  showYAxis = true;
  gradient = false;
  showLegend = true;
  showXAxisLabel = true;
  xAxisLabel = 'Country';
  showYAxisLabel = true;
  yAxisLabel = 'Population';

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };

  // pie
  showLabels = true;
  explodeSlices = false;
  doughnut = false;

  // line, area
  autoScale = true;

  constructor() {
    Object.assign(this, {single, multi, countries, chartGroups});
  }

  ngOnInit() {
    this.selectChart(this.chartType);

    setInterval(this.updateData.bind(this), 1000);
  }

  updateData() {
    if (!this.realTimeData) {
      return;
    }

    let country = this.countries[Math.floor(Math.random() * this.countries.length)];
    let add = Math.random() < 0.7;
    let remove = Math.random() < 0.5;

    if (remove) {
      if (this.single.length > 1) {
        let index = Math.floor(Math.random() * this.single.length);
        this.single.splice(index, 1);
        this.single = [ ...this.single ];
      }

      if (this.multi.length > 1) {
        let index = Math.floor(Math.random() * this.multi.length);
        this.multi.splice(index, 1);
        this.multi = [ ...this.multi ];
      }
    }

    if (add) {
      // single
      let entry = {
        name: country,
        value: Math.floor(1000000 + Math.random() * 20000000)
      };
      this.single = [ ...this.single, entry ];

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

      this.multi = [ ...this.multi, multiEntry ];
    }
  }

  selectChart(chartSelector) {
    this.chartType = chartSelector;
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
}
