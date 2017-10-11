import { Component, OnInit, AfterViewInit, ViewEncapsulation, 
  ChangeDetectionStrategy } from '@angular/core';

import { ScaleLinear, scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { line, curveLinear } from 'd3-shape';

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
  public translate: string = 'translate(150,150)';
  public textTransform: string = 'scale(0.7, 0.7)';
  public pointerTransform: string = '';
  
  public displayValue: string;
  public unit: string = 'percent'; // delete later

  public showValue: boolean = true;
  public showUnit: boolean = true;
  public value: number = 30;
  public majorTicks = 5;
  public minorTicks = 10;
  public minValue = 0;
  public maxValue = 100;
  public minAngle = -90;
  public maxAngle = 90;
  public innerArcRadius: number;
  public outerArcRadius: number;
  public axisRadius: number;
  public pointerWidth: number = 10;

  public scale: ScaleLinear<number, number>;
  public d: any;

  private segments = [
    // {
    //   minValue: 0,
    //   maxValue: 30,
    //   color: 'red'
    // },
    // {
    //   minValue: 30,
    //   maxValue: 60,
    //   color: 'yellow'
    // },
    // {
    //   minValue: 60,
    //   maxValue: 100,
    //   color: 'green'
    // }
  ];

  private ticks: number[];
  private tickData: number[];
  private degreeRange: number;

  ngOnInit(): void {
    this.scale = this.getScale();
    this.ticks = this.scale.ticks(this.majorTicks);
    this.tickData = range(this.majorTicks).map(() => { return 1 / this.majorTicks; });
    this.degreeRange = this.getDegreeRange();

    this.displayValue = this.displayValue == null 
    ? this.value.toString()
    : this.displayValue;

    this.innerArcRadius = this.innerArcRadius == null 
    ? this.calculateInnerRadius() 
    : this.innerArcRadius;

    this.outerArcRadius = this.outerArcRadius == null 
    ? this.calculateOuterRadius() 
    : this.outerArcRadius;

    this.axisRadius = this.axisRadius == null
    ? this.calculateAxisRadius()
    : this.axisRadius;

    this.arcs = this.getArcs();

    this.d = this.getPointer();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    setTimeout(() => {

      console.log('afterViewInit');

      console.log('ticks', this.ticks);
      console.log('ticksData', this.tickData);
      console.log('degreeRange', this.degreeRange);
      console.log('arcs', this.arcs);
      console.log('innerRadius', this.innerArcRadius);
      console.log('outerRadius', this.outerArcRadius);
      console.log('axisRadius', this.axisRadius);
      console.log('pointerLine', this.getPointer());
    });
  }

  // public startAngle(value: number, index: number) {

  //   // const ratio = d * i;
  //   // return this.deg2rad(this.minAngle + (ratio * this.getRange()));
  // }

  // public endAngle(d, i) {
  //    const ratio = d * (i + 1);
  //    return this.deg2rad(this.minAngle + (ratio * this.getRange()));
  // }

  private getArcs(): any {
    const result = [];

    if (this.segments != null && this.segments.length > 0) {
      for(const i in this.segments) {
        const arc = {
          startAngle: this.getSegmentAngle(this.segments[i].minValue),
          endAngle: this.getSegmentAngle(this.segments[i].maxValue),
          innerRadius: this.innerArcRadius,
          outerRadius: this.outerArcRadius
        };
        result.push(arc);
      }
    } else {
      for(let i = 0; i < this.majorTicks; i++) {
        const arc = {
          startAngle: this.getTickAngle(i),
          endAngle: this.getTickAngle(i + 1),
          innerRadius: this.innerArcRadius,
          outerRadius: this.outerArcRadius
        };
        result.push(arc);
      }
    }

    return result;
  }

  private getSegmentAngle(value: number): number {
    const degree =  this.minAngle + (value * this.getDegreeRange() / this.getValueRange());
    return this.deg2rad(degree);
  }

  private getTickAngle(index: number): number {
    const degree = this.minAngle + (this.ticks[index] * this.getDegreeRange() / this.getValueRange());
    return this.deg2rad(degree);
  }

  private deg2rad(degree: number): number {
    return degree * Math.PI / 180;
  }

  private getDegreeRange(): number {
    return this.maxAngle - this.minAngle;
  }

  private getValueRange(): number {
    return this.maxValue - this.minValue;
  }

  private newAngle(angle: number): number {
    const ratio = this.scale(angle);
    console.log(ratio);
    const newAngle = this.minAngle + (ratio * this.getDegreeRange());
    return newAngle;
  }

  private getScale(): ScaleLinear<number, number> {
    // return scaleLinear().range([0, 1]).domain([this.minValue, this.maxValue]);
    return scaleLinear()
    .range([0, this.getDegreeRange()])
    .nice()
    .domain([this.minValue, this.maxValue]);
  }

  private calculateInnerRadius(): number {
    if(this.width > this.height) {
      return this.height * 0.2;
    } else {
      return this.width * 0.2;
    }
  }

  private calculateOuterRadius(): number {
    if(this.width > this.height) {
      return this.height * 0.4;
    } else {
      return this.width * 0.4;
    }
  }

  private calculateAxisRadius(): number {
    if(this.width > this.height) {
      return this.height * 0.35;
    } else {
      return this.width * 0.35;
    }
  }

  private getPointer(): any {
    const pointerLine = line().curve(curveLinear);
    return pointerLine(this.getPointerData());
  }

  private getPointerData(): any {
    const pointerHeadLength = 140;
    const pointerTailLength = 5;
    return [
      [this.pointerWidth / 2, 0],
      [0, - (pointerHeadLength)],
      [- (this.pointerWidth / 2), 0],
      [0, pointerTailLength],
      [this.pointerWidth / 2, 0]
    ];
  }
}
