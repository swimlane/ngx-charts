import { Component, OnInit, AfterViewInit, ViewEncapsulation, 
  ChangeDetectionStrategy } from '@angular/core';

import { ScaleLinear, scaleLinear } from 'd3-scale';
import { range } from 'd3-array';
import { line, curveLinear, Line } from 'd3-shape';

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
  public textTransform: string = 'scale(1.1, 1.1)';
  
  public displayValue: string;
  public unit: string = 'percent'; // delete later

  public showValue: boolean = true;
  public showUnit: boolean = true;
  public value: number = 20;
  public majorTicks = 5;
  public minorTicks = 10;
  public minValue = 0;
  public maxValue = 100;
  public minAngle = -90;
  public maxAngle = 90;
  public innerArcRadius: number;
  public outerArcRadius: number;
  public axisRadius: number;
  public pointerWidth: number;
  public pointerHeadLength: number;
  public pointerTailLength: number;

  private segments = [
    {
      minValue: 0,
      maxValue: 30,
      color: 'red'
    },
    {
      minValue: 30,
      maxValue: 60,
      color: 'yellow'
    },
    {
      minValue: 60,
      maxValue: 100,
      color: 'green'
    }
  ];

  private ticks: number[];
  private degreeRange: number;

  ngOnInit(): void {
    this.ticks = this.getScale().ticks(this.majorTicks);
    this.degreeRange = this.getDegreeRange();

    this.displayValue = this.getValueOr(this.displayValue, this.value.toString());
    this.innerArcRadius = this.getValueOrFactor(this.innerArcRadius, 0.3);
    this.outerArcRadius = this.getValueOrFactor(this.outerArcRadius, 0.6);
    this.axisRadius = this.getValueOrFactor(this.axisRadius, 0.55);

    this.pointerWidth = this.getValueOrFactor(this.pointerWidth, 0.05);
    this.pointerHeadLength = this.getValueOrFactor(this.pointerHeadLength, 0.63);
    this.pointerTailLength = this.getValueOrFactor(this.pointerTailLength, 0.02);

    this.arcs = this.getArcs();
  }

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    setTimeout(() => {

      console.log('afterViewInit');

      console.log('ticks', this.ticks);
      console.log('degreeRange', this.degreeRange);
      console.log('arcs', this.arcs);
      console.log('innerRadius', this.innerArcRadius);
      console.log('outerRadius', this.outerArcRadius);
      console.log('axisRadius', this.axisRadius);
      console.log('pointerWidth', this.pointerWidth);
      console.log('pointerHeadLength', this.pointerHeadLength);
      console.log('pointerTailLength', this.pointerTailLength);
    });
  }

  public getTranslate(): string {
    const twidth = this.width / 2;
    const theight = this.height * 0.8;
    return `translate(${twidth}, ${theight})`;
  }

  public movePointer(): string {
    return `rotate(${this.getPointerLocation()})`;
  }

  public getPointer(): string {
    const pointerLine: Line<[number, number]> = line().curve(curveLinear);
    return pointerLine(this.getPointerData());
  }

  public getScale(): ScaleLinear<number, number> {
    return scaleLinear()
    .range([0, this.getDegreeRange()])
    .nice()
    .domain([this.minValue, this.maxValue]);
  }

  public getArcs(): any {
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

  private getValueOr(value: any, or: any) {
    console.log('value', value);
    console.log('or', or);
    console.log('result', value == null 
    ? or
    : value);

    return value == null 
    ? or
    : value;
  }

  private getValueOrFactor(value: number, factor: number) {
    return this.getValueOr(value, this.getElementScale(factor));
  }

  private getElementScale(factor: number): number {
    if(this.width > this.height) {
      return this.height * factor;
    } else {
      return this.width * factor;
    }
  }

  private getPointerLocation(): number {
    return this.rad2deg(this.getSegmentAngle(this.value));
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

  private rad2deg(rad: number) {
    return rad * 180 / Math.PI;
  }

  private getDegreeRange(): number {
    return this.maxAngle - this.minAngle;
  }

  private getValueRange(): number {
    return this.maxValue - this.minValue;
  }

  private getPointerData(): any {
    return [
      [this.pointerWidth / 2, 0],
      [0, - this.pointerHeadLength],
      [- this.pointerWidth / 2, 0],
      [0, this.pointerTailLength],
      [this.pointerWidth / 2, 0]
    ];
  }
}
