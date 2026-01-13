import {
  Component,
  Input,
  Output,
  SimpleChanges,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef,
  PLATFORM_ID,
  Inject,
  OnInit
} from '@angular/core';
import { ColorHelper } from '../common/color.helper';
import { BubbleChartSeries } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { ScaleType } from '../common/types/scale-type.enum';
import { isPlatformServer } from '@angular/common';
import { getBubbleCircles, getBubbleTooltipText } from './bubble-series.helper';
import { bubbleSeriesAnimations } from './bubble-series.animations';

@Component({
  selector: 'g[ngx-charts-bubble-series]',
  templateUrl: './bubble-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  animations: bubbleSeriesAnimations,
  standalone: false
})
export class BubbleSeriesComponent implements OnChanges, OnInit {
  @Input() data: BubbleChartSeries;
  @Input() xScale;
  @Input() yScale;
  @Input() rScale;
  @Input() xScaleType: ScaleType;
  @Input() yScaleType: ScaleType;
  @Input() colors: ColorHelper;
  @Input() visibleValue;
  @Input() activeEntries: any[] = [];
  @Input() xAxisLabel: string;
  @Input() yAxisLabel: string;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  circles: any[];
  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;
  isSSR = false;

  constructor(@Inject(PLATFORM_ID) private platformId: any) {}

  ngOnInit() {
    this.isSSR = isPlatformServer(this.platformId);
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.circles = getBubbleCircles(
      this.data,
      this.xScale,
      this.yScale,
      this.rScale,
      this.xScaleType,
      this.yScaleType,
      this.colors,
      this.activeEntries
    );
  }

  getTooltipText(circle): string {
    return getBubbleTooltipText(circle, this.xAxisLabel, this.yAxisLabel);
  }

  onClick(data): void {
    this.select.emit(data);
  }

  activateCircle(circle): void {
    circle.barVisible = true;
    this.activate.emit({ name: this.data.name });
  }

  deactivateCircle(circle): void {
    circle.barVisible = false;
    this.deactivate.emit({ name: this.data.name });
  }

  trackBy(index, circle): string {
    return `${circle.data.series} ${circle.data.name}`;
  }
}
