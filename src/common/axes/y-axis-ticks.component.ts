import {
  Component,
  Input,
  Output,
  OnChanges,
  ElementRef,
  ViewChild,
  EventEmitter,
  AfterViewInit,
  ChangeDetectionStrategy,
  SimpleChanges
} from '@angular/core';
import { trimLabel } from '../trim-label.helper';
import { reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
import { scaleBand } from 'd3-scale';

@Component({
  selector: 'g[ngx-charts-y-axis-ticks]',
  template: `
    <svg:g #ticksel>
      <svg:g *ngFor="let tick of ticks" class="tick"
        [attr.transform]="transform(tick)" >
        <title>{{tickFormat(tick)}}</title>
        <svg:text
          stroke-width="0.01"
          [attr.dy]="dy"
          [attr.x]="x1"
          [attr.y]="y1"
          [attr.text-anchor]="textAnchor"
          [style.font-size]="'12px'">
          {{trimLabel(tickFormat(tick))}}
        </svg:text>
      </svg:g>
    </svg:g>
  
    <svg:path *ngIf="referenceLines"
      class=""
      stroke="none"
      [attr.d]="path"
      [attr.fill]="fill"
      fill-opacity="0.15"
      [attr.transform]="gridLineTransform()"
    />
      <svg:g *ngIf="referenceLines"
      [attr.transform]="transform(referenceLines[0].max.value)">
    <svg:line
    class="max-ref-path refline-path gridline-path-horizontal"
      x1="0" stroke-dasharray="5, 5"
      [attr.x2]="gridLineWidth" [attr.transform]="gridLineTransform()"/>
    </svg:g>

    <svg:g *ngIf="referenceLines"
      [attr.transform]="transform(referenceLines[0].avg.value)">
    <svg:line
    class="avg-ref-path refline-path gridline-path-horizontal"
      x1="0" stroke-dasharray="5, 5"
      [attr.x2]="gridLineWidth" [attr.transform]="gridLineTransform()"/>
    </svg:g>
    <svg:g *ngIf="referenceLines"
      [attr.transform]="transform(referenceLines[0].min.value)">
    <svg:line
    class="min-ref-path refline-path gridline-path-horizontal"
      x1="0" stroke-dasharray="5, 5"
      [attr.x2]="gridLineWidth" [attr.transform]="gridLineTransform()"/>
    </svg:g>
    <svg:g [attr.transform]="transform(referenceLines[0].max.value)">
      <title>{{referenceLines[0].max.name}}</title>
      <svg:text
        stroke-width="0.01"
        [attr.dy]="dy"
        [attr.x]="gridLineWidth + outerTickSize + innerTickSize"
        [attr.text-anchor]="textAnchor"
        [style.font-size]="'12px'">
        {{referenceLines[0].max.name}}
      </svg:text>
    </svg:g>
    <svg:g [attr.transform]="transform(referenceLines[0].avg.value)">
      <title>{{referenceLines[0].avg.name}}</title>
      <svg:text
        stroke-width="0.01"
        [attr.dy]="dy"
        [attr.x]="gridLineWidth + outerTickSize + innerTickSize"
        [attr.text-anchor]="textAnchor"
        [style.font-size]="'12px'">
        {{referenceLines[0].avg.name}}
      </svg:text>
    </svg:g>
    <svg:g [attr.transform]="transform(referenceLines[0].min.value)">
      <title>{{referenceLines[0].min.name}}</title>
      <svg:text
        stroke-width="0.01"
        [attr.dy]="dy"
        [attr.x]="gridLineWidth + outerTickSize + innerTickSize"
        [attr.text-anchor]="textAnchor"
        [style.font-size]="'12px'">
        {{referenceLines[0].min.name}}
      </svg:text>
    </svg:g>
    <svg:g *ngFor="let tick of ticks"
      [attr.transform]="transform(tick)">
      <svg:g
        *ngIf="showGridLines"
        [attr.transform]="gridLineTransform()">
        <svg:line
          class="gridline-path gridline-path-horizontal"
          x1="0"
          [attr.x2]="gridLineWidth" />
      </svg:g>
    </svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class YAxisTicksComponent implements OnChanges, AfterViewInit {
path
radius = Math.min(this.height, 0);
edges: boolean[] = [false, false, false, false];

// path="M5,2h334.74745159539174a5,5 0 0 1 5,5v21a5,5 0 0 1 -5,5h-334.74745159539174h-5v-5v-21v-5h5z";
fill = '#666666';

  @Input() scale;
  @Input() orient;
  @Input() tickArguments = [5];
  @Input() tickValues;
  @Input() tickStroke = '#ccc';
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineWidth;
  @Input() height;
  @Input() referenceLines;

  @Output() dimensionsChanged = new EventEmitter();

  innerTickSize: any = 6;
  tickPadding: any = 3;
  tickSpacing: any;
  verticalSpacing: number = 20;
  textAnchor: any = 'middle';
  dy: any;
  x1: any;
  x2: any;
  y1: any;
  y2: any;
  adjustedScale: any;
  transform: (o: any) => string;
  tickFormat: (o: any) => string;
  ticks: any;
  width: number = 0;
  outerTickSize: number = 6;
  rotateLabels: boolean = false;
  trimLabel: any;
  refMax;
  refMin;
  refAvg;

  @ViewChild('ticksel') ticksElement: ElementRef;

  constructor() {
    this.trimLabel = trimLabel;
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngAfterViewInit(): void {
    if (this.referenceLines) {
      this.refMax = this.adjustedScale(this.referenceLines[0].max.value);
      this.refAvg = this.adjustedScale(this.referenceLines[0].avg.value);
      this.refMin = this.adjustedScale(this.referenceLines[0].min.value);
    }
    setTimeout(() => this.updateDims());
  }

  updateDims(): void {
    const width = parseInt(this.ticksElement.nativeElement.getBoundingClientRect().width, 10);
    if (width !== this.width) {
      this.width = width;
      this.dimensionsChanged.emit({ width });
      setTimeout(() => this.updateDims());
    }
  }

  getYScale(): any {

    return scaleBand()
      .rangeRound([0, this.height]);
  }

  update(): void {
    console.log(this.ticksElement)
    let scale;
    if (this.referenceLines) {
      this.path = roundedRect(0, this.refMax - this.innerTickSize, this.gridLineWidth - this.outerTickSize + this.innerTickSize, (this.refMin - this.refMax) - this.tickPadding, 0, this.edges);
    }
    const sign = this.orient === 'top' || this.orient === 'right' ? -1 : 1;
    this.tickSpacing = Math.max(this.innerTickSize, 0) + this.tickPadding;

    scale = this.scale;
    this.ticks = this.getTicks();

    if (this.tickFormatting) {
      this.tickFormat = this.tickFormatting;
    } else if (scale.tickFormat) {
      this.tickFormat = scale.tickFormat.apply(scale, this.tickArguments);
    } else {
      this.tickFormat = function(d) {
        if (d.constructor.name === 'Date') {
          return d.toLocaleDateString();
        }
        return d.toLocaleString();
      };
    }

    this.adjustedScale = scale.bandwidth ? function(d) {
      return scale(d) + scale.bandwidth() * 0.5;
    } : scale;

    switch (this.orient) {
      case 'top':
        this.transform = function(tick) {
          return 'translate(' + this.adjustedScale(tick) + ',0)';
        };
        this.textAnchor = 'middle';
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? '0em' : '.71em';
        break;
      case 'bottom':
        this.transform = function(tick) {
          return 'translate(' + this.adjustedScale(tick) + ',0)';
        };
        this.textAnchor = 'middle';
        this.y2 = this.innerTickSize * sign;
        this.y1 = this.tickSpacing * sign;
        this.dy = sign < 0 ? '0em' : '.71em';
        break;
      case 'left':
        this.transform = function(tick) {
          return 'translate(0,' + this.adjustedScale(tick) + ')';
        };
        this.textAnchor = 'end';
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = '.32em';
        break;
      case 'right':
        this.transform = function(tick) {
          return 'translate(0,' + this.adjustedScale(tick) + ')';
        };
        this.textAnchor = 'start';
        this.x2 = this.innerTickSize * -sign;
        this.x1 = this.tickSpacing * -sign;
        this.dy = '.32em';
        break;
      default:
    }

    setTimeout(() => this.updateDims());
  }

  getTicks(): any {
    const maxTicks = this.getMaxTicks(20);
    const maxScaleTicks = this.getMaxTicks(50);

    if (this.tickValues) {
      return this.tickValues;
    }
    if (this.scale.ticks) {
      return this.scale.ticks.call(this.scale, maxScaleTicks);
    }
    return reduceTicks(this.scale.domain(), maxTicks);
  }

  getMaxTicks(tickHeight: number): number {
    return Math.floor(this.height / tickHeight);
  }

  tickTransform(tick): string {
    return `translate(${this.adjustedScale(tick)},${this.verticalSpacing})`;
  }

  gridLineTransform(): string {
    return `translate(5,0)`;
  }

}
