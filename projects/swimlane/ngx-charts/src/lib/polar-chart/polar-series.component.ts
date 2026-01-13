import {
  Component,
  Input,
  OnChanges,
  SimpleChanges,
  ChangeDetectionStrategy,
  TemplateRef,
  Output,
  EventEmitter
} from '@angular/core';

import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import { ScaleType } from '../common/types/scale-type.enum';
import {
  PolarChartCircle,
  getAngle,
  getRadius,
  getLineGenerator,
  sortData,
  defaultTooltipText
} from './polar-series.helper';

@Component({
  selector: 'g[ngx-charts-polar-series]',
  templateUrl: './polar-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PolarSeriesComponent implements OnChanges {
  @Input() name;
  @Input() data;
  @Input() xScale; // Theta
  @Input() yScale; // R
  @Input() colors;
  @Input() scaleType;
  @Input() curve: any;
  @Input() activeEntries: any[];
  @Input() rangeFillOpacity: number;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipText: (o: any) => string;
  @Input() gradient: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  path: string;
  circles: PolarChartCircle[];
  circleRadius: number = 3;

  areaPath: string;
  gradientId: string;
  gradientUrl: string;
  hasGradient: boolean;
  gradientStops: any[];
  areaGradientStops: any[];
  seriesColor: string;

  active: boolean;
  inactive: boolean;

  barOrientation = BarOrientation;
  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }

  update(): void {
    this.updateGradients();

    const line = getLineGenerator(this.scaleType, this.xScale, this.yScale, this.curve);

    const data = sortData(this.data.series, this.scaleType, this.xScale);

    const seriesName = this.data.name;
    const linearScaleType = this.colors.scaleType === ScaleType.Linear;
    const min = this.yScale.domain()[0];
    this.seriesColor = this.colors.getColor(linearScaleType ? min : seriesName);

    this.path = line(data) || '';

    this.circles = data.map(d => {
      const a = getAngle(d, this.scaleType, this.xScale);
      const r = getRadius(d, this.yScale);
      const value = d.value;

      const color = this.colors.getColor(linearScaleType ? Math.abs(value) : seriesName);

      const cData = Object.assign({}, d, {
        series: seriesName,
        value,
        name: d.name
      });

      return {
        data: cData,
        cx: r * Math.sin(a),
        cy: -r * Math.cos(a),
        value,
        color,
        label: d.name
      };
    });

    this.active = this.isActive(this.data);
    this.inactive = this.isInactive(this.data);
    this.tooltipText = this.tooltipText || (c => defaultTooltipText(c.label, c.value, this.data.name));
  }

  isActive(entry: any): boolean {
    if (!this.activeEntries) return false;
    return this.activeEntries.some(d => entry.name === d.name);
  }

  isInactive(entry: any): boolean {
    if (!this.activeEntries || this.activeEntries.length === 0) return false;
    return !this.activeEntries.some(d => entry.name === d.name);
  }

  updateGradients() {
    this.hasGradient = this.gradient || this.colors.scaleType === ScaleType.Linear;

    if (!this.hasGradient) {
      return;
    }

    this.gradientId = 'grad' + id().toString();
    this.gradientUrl = `url(#${this.gradientId})`;

    if (this.colors.scaleType === ScaleType.Linear) {
      const values = this.data.series.map(d => d.value);
      const max = Math.max(...values);
      const min = Math.min(...values);
      this.gradientStops = this.colors.getLinearGradientStops(max, min);
    } else {
      this.gradientStops = undefined;
    }
  }
}
