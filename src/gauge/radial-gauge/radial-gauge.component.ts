import { Component, AfterViewInit, ViewEncapsulation, 
  ChangeDetectionStrategy, Input } from '@angular/core';

import { ScaleLinear, scaleLinear } from 'd3-scale';
import { range, max, min } from 'd3-array';
import { line, curveLinear, Line } from 'd3-shape';

import { BaseChartComponent } from './../../common/base-chart.component';
import { ColorHelper } from '../../common/color.helper';

@Component({
  selector: 'ngx-charts-radial-gauge',
  templateUrl: './radial-gauge.component.html',
  styleUrls: ['./radial-gauge.component.css'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RadialGaugeComponent extends BaseChartComponent implements AfterViewInit {

  public arcs = [];
  public dimensions: any = {};
  public displayingValue: string;
  
  @Input() public displayValue: string;
  @Input() public showValue: boolean = true;
  @Input() public showUnit: boolean = true;
  @Input() public value: number = 20;
  @Input() public minValue = 0;
  @Input() public maxValue = 100;

  @Input() public minAngle = -90;
  @Input() public maxAngle = 90;
  @Input() public innerArcRadius: number;
  @Input() public outerArcRadius: number;

  @Input() public majorTicks = 5;
  @Input() public axisRadius: number;

  @Input() public pointerWidth: number;
  @Input() public pointerHeadLength: number;
  @Input() public pointerTailLength: number;
  @Input() public pointerColor: string;

  private colors: ColorHelper;

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
  private degreeRange: number;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();

    setTimeout(() => {
      console.log('afterViewInit');
    });
  }

  public update(): void {
    super.update();

    // console.log('width', this.width);
    // console.log('height', this.height);

    // this.ticks = this.getScale().ticks(this.majorTicks);
    this.ticks = this.getTicks();
    this.degreeRange = this.getDegreeRange();

    this.dimensions = this.getDimensions();

    // console.log(this.dimensions);

    this.displayingValue = this.getValueOr(this.displayValue, this.value.toString());

    this.colors = new ColorHelper(this.scheme, this.schemeType, 
      [this.minValue, this.maxValue], this.customColors);

    this.arcs = this.getArcs();

    // console.log('bigSegments', this.majorTicks);
    // console.log('min', this.minValue);
    // console.log('max', this.maxValue);
    // console.log('minAngle', this.minAngle);
    // console.log('span', this.getDegreeRange());
    // console.log('valueScale', this.getScale());
    // console.log('textScale', this.dimensions.axisTextScale);
    console.log('majorTicks', this.majorTicks);
    console.log('scale', this.getScale()(100));
    console.log('ticks', this.ticks);
    console.log('arcs', this.arcs);
  }

  public getTranslate(): string {
    const twidth = this.width / 2;
    const theight = this.height / 2;
    return `translate(${twidth}, ${theight})`;
  }

  public movePointer(): string {
    return `rotate(${this.getPointerLocation()})`;
  }

  public getTextTransform(): string {
    const scale: number = this.getElementScale(0.005);
    return `scale(${scale}, ${scale})`;
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
          innerRadius: this.dimensions.innerArcRadius,
          outerRadius: this.dimensions.outerArcRadius,
          // color: this.getValueOr(this.segments[i].color, 
          //   this.colors.getColor(this.segments[i].minValue))
        };
        result.push(arc);
      }
    } else {
      for(let i = 0; i < this.majorTicks; i++) {
        const arc = {
          startAngle: this.getTickAngle(i),
          endAngle: this.getTickAngle(i + 1),
          innerRadius: this.dimensions.innerArcRadius,
          outerRadius: this.dimensions.outerArcRadius,
          // color: this.colors.getColor(this.ticks[i])
        };
        result.push(arc);
      }
    }
    return result;
  }

  private getDimensions(): any {
    return {
      innerArcRadius: this.getValueOrFactor(this.innerArcRadius, 0.1),
      outerArcRadius: this.getValueOrFactor(this.outerArcRadius, 0.28),
      axisRadius: this.getValueOrFactor(this.axisRadius, 0.27),
      pointerWidth: this.getValueOrFactor(this.pointerWidth, 0.03),
      pointerHeadLength: this.getValueOrFactor(this.pointerHeadLength, 0.3),
      pointerTailLength: this.getValueOrFactor(this.pointerTailLength, 0.01),
      axisTextScale: this.getElementScale(0.002)
    };
  }

  private getValueOr(value: any, or: any) {
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
    const degree = this.minAngle + 
      (this.ticks[index] * this.getDegreeRange() / this.getValueRange());
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

  private getTicks(): any {
    const result = [];
    for(let i = 0; i <= this.majorTicks; i++) {
      const tick = i * (this.getValueRange() / this.majorTicks);
      result.push(tick);
    }
    return result;
  }

  private getPointerData(): any {
    return [
      [this.dimensions.pointerWidth / 2, 0],
      [0, - this.dimensions.pointerHeadLength],
      [- this.dimensions.pointerWidth / 2, 0],
      [0, this.dimensions.pointerTailLength],
      [this.dimensions.pointerWidth / 2, 0]
    ];
    // return [
    //   [this.getValueOr(this.dimensions.pointerWidth / 2, 0), 0],
    //   [0, this.getValueOr(- this.dimensions.pointerHeadLength, 0)],
    //   [this.getValueOr(- this.dimensions.pointerWidth / 2, 0), 0],
    //   [0, this.getValueOr(this.dimensions.pointerTailLength, 0)],
    //   [this.getValueOr(this.dimensions.pointerWidth / 2, 0), 0]
    // ];
  }
}
