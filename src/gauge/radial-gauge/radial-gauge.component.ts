import { range } from 'd3-array';
import { Component, OnInit, AfterViewInit, ViewEncapsulation, 
  ChangeDetectionStrategy } from '@angular/core';

import { ScaleLinear, scaleLinear } from 'd3-scale';

import { BaseChartComponent } from './../../common/base-chart.component';

@Component({
  selector: 'ngx-charts-radial-gauge',
  templateUrl: './radial-gauge.component.html',
  styleUrls: ['./radial-gauge.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialGaugeComponent extends BaseChartComponent implements OnInit, AfterViewInit {

  public arcs = [];
  public translate: string;

  private majorTicks = 5;
  private minValue = 0;
  private maxValue = 100;
  private minAngle = -90;
  private maxAngle = 90;

  private scale: ScaleLinear<number, number>;
  private ticks: number[];
  private tickData: number[];
  private range: number;

  ngOnInit(): void {
    this.scale = this.getScale();
    this.ticks = this.scale.ticks(this.majorTicks);
    this.tickData = range(this.majorTicks).map(() => { return 1 / this.majorTicks; });
    this.range = this.getRange();
    this.arcs = this.getArcs();

    this.translate = 'translate(150,150)';
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => {
      console.log('afterViewInit');

      console.log(this.newAngle(10));
      console.log(this.newAngle(20));
    });
  }

  public startAngle(d, i) {
    const min = this.minAngle;
    const max = this.maxAngle;
    return (min + (d * i * (max - min))) * Math.PI / 180;
    // const ratio = d * i;
    // return this.deg2rad(this.minAngle + (ratio * this.getRange()));
  }

  public endAngle(d, i) {
    const min = this.minAngle;
    const max = this.maxAngle;
    return (min + (d * (i + 1) * (max - min))) * Math.PI / 180;
    // const ratio = d * (i + 1);
    // return this.deg2rad(this.minAngle + (ratio * this.getRange()));
  }

  private getArcs(): any {
    const result = [];

    const arc = {
      startAngle: 0,
      endAngle: 3,
      innerRadius: 20,
      outerRadius: 40
    };
    result.push(arc);

    return result;
  }

  private deg2rad(degree: number): number {
    return degree * Math.PI / 180;
  }

  private getRange(): number {
    return this.maxAngle - this.minAngle;
  }

  private newAngle(angle: number): number {
    const ratio = this.scale(angle);
    const newAngle = this.minAngle + (ratio * this.getRange());
    return newAngle;
  }

  private getScale(): ScaleLinear<number, number> {
    return scaleLinear().range([0, 1]).domain([this.minValue, this.maxValue]);
  }
}
