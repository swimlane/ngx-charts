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
  ViewChild
} from '@angular/core';
import d3 from '../d3';
import { BaseChart } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { colorHelper } from '../utils/color-sets';

@Component({
  selector: 'gauge',
  template: `
    <chart
      [legend]="legend"
      [legendData]="colorScale"
      [data]="valueDomain"
      [view]="[width, height]">

      <svg:g [attr.transform]="transform" class="gauge chart">
        <svg:g pieArc
          class="background-arc"
          [startAngle]="0"
          [endAngle]="backgroundArc.endAngle"
          [innerRadius]="backgroundArc.innerRadius"
          [outerRadius]="backgroundArc.outerRadius"
          [cornerRadius]="backgroundArc.cornerRadius"
          [data]="backgroundArc.data"
          [animate]="false"
          [pointerEvents]="false">
        </svg:g>

        <svg:g pieArc
          [startAngle]="0"
          [endAngle]="valueArc.endAngle"
          [innerRadius]="valueArc.innerRadius"
          [outerRadius]="valueArc.outerRadius"
          [cornerRadius]="valueArc.cornerRadius"
          [fill]="colors(value)"
          [data]="valueArc.data"
          [animate]="true"
          (clickHandler)="click($event)">
        </svg:g>

        <svg:g *ngFor="let tick of ticks.big"
          class="gauge-tick gauge-tick-large"
          transform="rotate(-90)"
          [class.highlighted]="tick.highlighted">
          <svg:path
            [attr.d]="tick.line"
          />
        </svg:g>

        <svg:g *ngFor="let tick of ticks.big"
          class="gauge-tick gauge-tick-large"
          transform="rotate(-90)"
          [ngClass]="{'highlighted': tick.highlighted}">
          <svg:text
            [style.textAnchor]="tick.textAnchor"
            [attr.transform]="tick.textTransform"
            alignment-baseline="central">
            {{tick.text}}
          </svg:text>
        </svg:g>

        <svg:g *ngFor="let tick of ticks.small"
          class="gauge-tick gauge-tick-small"
          transform="rotate(-90)"
          [class.highlighted]="tick.highlighted">
          <svg:path
            [attr.d]="tick.line"
          />
        </svg:g>

        <svg:g transform="rotate(120)">
          <svg:text #textEl
            [style.textAnchor]="'middle'"
            [attr.transform]="textTransform"
            alignment-baseline="central">
            {{displayValue()}}
          </svg:text>
        </svg:g>
      </svg:g>
    </chart>
  `
})
export class Gauge extends BaseChart implements OnChanges, OnDestroy, AfterViewInit {
  dims: ViewDimensions;
  valueDomain: any;
  valueScale: any;

  color: any;
  colors: Function;
  colorScale: any;
  transform: string;
  margin = [40, 100, 40, 100];
  backgroundArc: any;
  valueArc: any;
  angleSpan: number = 240;
  innerRadius: number;
  outerRadius: number;
  resizeScale: number = 1;
  textTransform: string = '';
  ticks: any;

  @Input() view;
  @Input() scheme;
  @Input() customColors;
  @Input() gradient: boolean;
  @Input() value: number = 0;
  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() units: string;
  @Input() bigSegments: number = 10;
  @Input() smallSegments: number = 5;

  @Output() clickHandler = new EventEmitter();

  @ViewChild('textEl') textEl: ElementRef;

  constructor(private element: ElementRef, zone: NgZone) {
    super(element, zone);
  }

  ngAfterViewInit(): void {
    this.bindResizeEvents(this.view);
    setTimeout(() => this.scaleText());
  }

  ngOnDestroy() {
    this.unbindEvents();
  }

  ngOnChanges() {
    this.update();
  }

  update() {
    super.update();

    if (!this.value) {
      this.value = 0;
    }

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      columns: 12
    });

    this.valueDomain = this.getValueDomain();
    this.valueScale = this.getValueScale();

    this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;
    this.innerRadius = this.outerRadius - 10;

    this.backgroundArc = {
      endAngle: this.angleSpan * Math.PI / 180,
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      cornerRadius: 10,
      data: {
        value: 100,
        name: 'Value'
      }
    };

    this.valueArc = {
      endAngle: Math.min(this.valueScale(this.value), this.angleSpan) * Math.PI / 180,
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      cornerRadius: 10,
      data: {
        value: this.value,
        name: 'Value'
      }
    };

    this.setColors();
    this.ticks = this.getTicks();

    let xOffset = this.margin[3] + this.dims.width / 2;
    let circleHeight = this.outerRadius / 2 + 20;
    let yOffset = this.margin[0] + this.dims.height / 2 + circleHeight / 2;
    this.transform = `translate(${xOffset}, ${yOffset}) rotate(-${this.angleSpan/2})`;
    this.scaleText();
  }

  getValueDomain() {
    return [this.min, this.max];
  }

  getValueScale() {
    return d3.scaleLinear()
      .range([0, this.angleSpan])
      .domain(this.valueDomain);
  }

  getTicks() {
    let bigTickSegment = this.angleSpan / this.bigSegments;
    let smallTickSegment = bigTickSegment / (this.smallSegments);
    let tickLength = 20;
    let ticks = {
      big: [],
      small: []
    };

    let startDistance = this.outerRadius + 10;
    let textDist = startDistance + tickLength + 10;

    for (let i = 0; i <= this.bigSegments; i++) {
      let angleDeg = i * bigTickSegment;
      let angle = angleDeg * Math.PI / 180;
      let textAnchor = 'middle';
      if (angleDeg < 90) {
        textAnchor = 'end';
      } else if (angleDeg >= 180) {
        textAnchor = 'start';
      }

      ticks.big.push({
        line: this.getTickPath(startDistance, tickLength, angle),
        textAnchor: textAnchor,
        text: Number.parseInt(this.valueScale.invert(angleDeg).toString()).toLocaleString(),
        textTransform: `translate(${textDist * Math.cos(angle)}, ${textDist * Math.sin(angle)}) rotate(210)`,
        highlighted: this.valueScale.invert(angleDeg) <= this.value
      });

      if (i === this.bigSegments) {
        continue;
      }

      for (let j = 1; j <= this.smallSegments; j++) {
        let smallAngleDeg = angleDeg + j * smallTickSegment;
        let smallAngle = smallAngleDeg * Math.PI / 180;

        ticks.small.push({
          line: this.getTickPath(startDistance, tickLength/2, smallAngle),
          highlighted: this.valueScale.invert(smallAngleDeg) <= this.value
        });
      }
    }

    return ticks;
  }

  getTickPath(startDistance, tickLength, angle) {
    let y1 = startDistance * Math.sin(angle);
    let y2 = (startDistance + tickLength) * Math.sin(angle);
    let x1 = startDistance * Math.cos(angle);
    let x2 = (startDistance + tickLength) * Math.cos(angle);

    let points = [{x: x1, y: y1}, {x: x2, y: y2}];
    let line = d3.line().x(d => d.x).y(d => d.y);
    return line(points);
  }

  displayValue() {
    if (this.units) {
      return `${this.value.toLocaleString()} ${this.units}`;
    } else {
      return this.value.toLocaleString();
    }
  }

  scaleText() {
    let width = this.textEl.nativeElement.getBoundingClientRect().width;
    if (width === 0) {
      return;
    }
    let oldScale = this.resizeScale;
    let availableSpace = this.outerRadius;
    this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;
    if (this.resizeScale !== oldScale) {
      this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
      setTimeout(() => { this.update(); });
    }
  }

  click(data) {
    this.clickHandler.emit(data);
  }

  setColors() {
    this.colors = colorHelper(this.scheme, 'ordinal', [this.value], this.customColors);
  }
}
