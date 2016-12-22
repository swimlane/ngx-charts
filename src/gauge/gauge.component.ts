import {
  Component,
  Input,
  ElementRef,
  ViewChild,
  AfterViewInit,
  ChangeDetectionStrategy
} from '@angular/core';

import d3 from '../d3';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';

@Component({
  selector: 'ngx-charts-gauge',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="false">
      <svg:g [attr.transform]="transform" class="gauge chart">
        <svg:g *ngFor="let arc of arcs" [attr.transform]="rotation">
          <svg:g ngx-charts-gauge-arc
            [backgroundArc]="arc.backgroundArc"
            [valueArc]="arc.valueArc"
            [cornerRadius]="cornerRadius"
            [colors]="colors"
            (select)="onClick($event)">
          </svg:g>
        </svg:g>

        <svg:g ngx-charts-gauge-axis
          *ngIf="showAxis"
          [bigSegments]="bigSegments"
          [smallSegments]="smallSegments"
          [min]="min"
          [max]="max"
          [radius]="outerRadius"
          [angleSpan]="angleSpan"
          [valueScale]="valueScale"
          [startAngle]="startAngle">
        </svg:g>

        <svg:text #textEl
            [style.textAnchor]="'middle'"
            [attr.transform]="textTransform"
            alignment-baseline="central">
          <tspan x="0" dy="0">{{displayValue}}</tspan>
          <tspan x="0" dy="1.2em">{{units}}</tspan>
        </svg:text>
        
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GaugeComponent extends BaseChartComponent implements AfterViewInit {

  @Input() min: number = 0;
  @Input() max: number = 100;
  @Input() units: string;
  @Input() bigSegments: number = 10;
  @Input() smallSegments: number = 5;
  @Input() results: any[];
  @Input() showAxis: boolean = true;
  @Input() startAngle: number = -120;
  @Input() angleSpan: number = 240;
  @Input() schemeType: string = 'ordinal';

  @ViewChild('textEl') textEl: ElementRef;

  dims: ViewDimensions;
  domain: any[];
  valueDomain: any;
  valueScale: any;

  colors: ColorHelper;
  transform: string;
  margin: any[];
  
  outerRadius: number;
  textRadius: number; // max available radius for the text
  resizeScale: number = 1;
  rotation: string = '';
  textTransform: string = '';
  cornerRadius: number = 10;
  arcs: any[];
  displayValue: string;

  ngAfterViewInit(): void {
    super.ngAfterViewInit();
    setTimeout(() => this.scaleText());
  }

  update(): void {
    super.update();

    this.zone.run(() => {
      if (!this.showAxis) {
        this.margin = [10, 20, 10, 20];
      } else {
        this.margin = [60, 100, 60, 100];
      }

      // make the starting angle positive
      if (this.startAngle < 0) {
        this.startAngle = (this.startAngle % 360) + 360;
      }

      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin
      });

      this.domain = this.getDomain();
      this.valueDomain = this.getValueDomain();
      this.valueScale = this.getValueScale();
      this.displayValue = this.getDisplayValue();

      this.outerRadius = Math.min(this.dims.width, this.dims.height) / 2;

      this.arcs = this.getArcs();

      this.setColors();
 
      let xOffset = this.margin[3] + this.dims.width / 2;
      let yOffset = this.margin[0] + this.dims.height / 2;

      this.transform = `translate(${ xOffset }, ${ yOffset })`;
      this.rotation = `rotate(${ this.startAngle })`;
      this.scaleText();
    });
  }

  getArcs(): any[] {
    let arcs = [];

    let availableRadius = this.outerRadius * 0.7;

    let radiusPerArc = Math.min(availableRadius / this.results.length, 10);
    let arcWidth = radiusPerArc * 0.7;
    this.textRadius = this.outerRadius - this.results.length * radiusPerArc;
    this.cornerRadius = Math.floor(arcWidth / 2);

    let i = 0;
    for (let d of this.results) {
      let outerRadius = this.outerRadius - (i * radiusPerArc);
      let innerRadius = outerRadius - arcWidth;

      let backgroundArc = {
        endAngle: this.angleSpan * Math.PI / 180,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        data: {
          value: this.max,
          name: d.name
        }
      };

      let valueArc = {
        endAngle: Math.min(this.valueScale(d.value), this.angleSpan) * Math.PI / 180,
        innerRadius: innerRadius,
        outerRadius: outerRadius,
        data: {
          value: d.value,
          name: d.name
        }
      };

      let arc = {
        backgroundArc,
        valueArc
      };

      arcs.push(arc);
      i++;
    }

    return arcs;
  }

  getDomain(): any[] {
    return this.results.map(d => d.name);
  }

  getValueDomain(): any[] {
    let values = this.results.map(d => d.value);
    let dataMin = Math.min(...values);
    let dataMax = Math.max(...values);
    
    if (this.min !== undefined) {
      this.min = Math.min(this.min, dataMin);
    } else {
      this.min = dataMin;
    }

    if (this.max !== undefined) {
      this.max = Math.max(this.max, dataMax);
    } else {
      this.max = dataMax;
    }

    return [this.min, this.max];
  }

  getValueScale(): any {
    return d3.scaleLinear()
      .range([0, this.angleSpan])
      .domain(this.valueDomain);
  }

  getDisplayValue(): string {
    let value = this.results.map(d => d.value).reduce((a, b) => { return a + b; }, 0);
    return value.toLocaleString();
  }

  scaleText(): void {
    const { width } = this.textEl.nativeElement.getBoundingClientRect();
    if (width === 0) return;

    const oldScale = this.resizeScale;
    const availableSpace = this.textRadius;
    this.resizeScale = Math.floor((availableSpace / (width / this.resizeScale)) * 100) / 100;

    if (this.resizeScale !== oldScale) {
      this.textTransform = `scale(${this.resizeScale}, ${this.resizeScale})`;
      this.cd.markForCheck();
      setTimeout(() => { this.scaleText(); });
    }
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.domain, this.customColors);
  }
}
