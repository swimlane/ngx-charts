import { isPlatformBrowser } from '@angular/common';
import {
  Component,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ElementRef,
  ViewChild,
  SimpleChanges,
  AfterViewInit,
  ChangeDetectionStrategy,
  Inject,
  PLATFORM_ID
} from '@angular/core';
import { Orientation } from '../types/orientation.enum';
import { TextAnchor } from '../types/text-anchor.enum';
import {
  getXAxisTicks,
  getXAxisTickChunks,
  getXAxisHeight,
  updateXAxisTicks,
  tickTransform,
  gridLineTransform,
  tickTrim
} from './x-axis.helper';

@Component({
  selector: 'g[ngx-charts-x-axis-ticks]',
  templateUrl: './x-axis-ticks.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class XAxisTicksComponent implements OnChanges, AfterViewInit {
  @Input() scale;
  @Input() orient: Orientation;
  @Input() tickArguments: number[] = [5];
  @Input() tickValues: any[];
  @Input() tickStroke: string = '#ccc';
  @Input() trimTicks: boolean = true;
  @Input() maxTickLength: number = 16;
  @Input() tickFormatting;
  @Input() showGridLines = false;
  @Input() gridLineHeight: number;
  @Input() width: number;
  @Input() rotateTicks: boolean = true;
  @Input() wrapTicks = false;
  @Input() referenceLines: any[];
  @Input() showRefLabels: boolean = false;
  @Input() showRefLines: boolean = false;
  @Output() dimensionsChanged = new EventEmitter();

  verticalSpacing: number = 20;
  innerTickSize: number = 6;
  tickPadding: number = 3;
  textAnchor: TextAnchor = TextAnchor.Middle;
  maxAllowedLength: number = 16;
  adjustedScale: any;
  textTransform: string;
  ticks: any[];
  tickFormat: (o: any) => any;
  height: number = 0;
  approxHeight: number = 10;
  maxPossibleLengthForTickIfWrapped = 16;
  transform: (o: any) => string;
  refMax: number;
  refMin: number;
  referenceLineLength: number = 0;
  referenceAreaPath: string;
  tickSpacing: number;
  x1: number;
  x2: number;
  y1: number;
  y2: number;
  dx: string;
  dy: string;

  @ViewChild('ticksel') ticksElement: ElementRef;

  get isWrapTicksSupported() {
    return this.wrapTicks && this.scale.step;
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any) { }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  ngAfterViewInit(): void {
    setTimeout(() => this.updateDims());
  }

  updateDims(): void {
    if (!isPlatformBrowser(this.platformId)) {
      this.dimensionsChanged.emit({ height: this.approxHeight });
      return;
    }
    const height = getXAxisHeight(this.ticksElement);
    if (height !== this.height) {
      this.height = height;
      this.dimensionsChanged.emit({ height: this.height });
      setTimeout(() => this.updateDims());
    }
  }

  update(): void {
    updateXAxisTicks(this);
    setTimeout(() => this.updateDims());
  }

  tickTransform(tick: number): string {
    return tickTransform(tick, this.adjustedScale, this.verticalSpacing);
  }
  gridLineTransform(): string {
    return gridLineTransform(this.verticalSpacing);
  }
  tickTrim(label: string): string {
    return tickTrim(label, this.trimTicks, this.maxTickLength);
  }
  tickChunks(label: string): string[] {
    return getXAxisTickChunks(
      label,
      this.maxTickLength,
      this.scale.bandwidth ? this.scale.bandwidth() : 0,
      this.rotateTicks,
      this.scale.step ? this.scale.step() : 0,
      this.tickTrim.bind(this),
      this.maxPossibleLengthForTickIfWrapped,
      isPlatformBrowser(this.platformId),
      this.approxHeight
    );
  }
}
