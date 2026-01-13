import {
  Component,
  SimpleChanges,
  Input,
  Output,
  EventEmitter,
  OnChanges,
  ChangeDetectionStrategy,
  TemplateRef
} from '@angular/core';
import { max } from 'd3-array';
import { pie } from 'd3-shape';
import { ColorHelper } from '../common/color.helper';
import { formatLabel } from '../common/label.helper';
import { DataItem } from '../models/chart-data.model';
import { PieData } from './pie-label.helper';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { areActiveEntriesEqual } from '../common/legend/legend.helper';
import {
  calculateLabelPositions,
  labelVisible,
  defaultTooltipText,
  getPieSeriesLabel,
  getPieSeriesLabelText,
  isPieArcActive
} from './pie-series.helper';
import { PieArcConfig } from './pie-arc.config';

@Component({
  selector: 'g[ngx-charts-pie-series]',
  templateUrl: './pie-series.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class PieSeriesComponent implements OnChanges {
  @Input() colors: ColorHelper;
  @Input() series: DataItem[] = [];
  @Input() dims: ViewDimensions;
  @Input() innerRadius: number = 60;
  @Input() outerRadius: number = 80;
  @Input() explodeSlices: boolean;
  @Input() showLabels: boolean;
  @Input() gradient: boolean;
  @Input() activeEntries: any[];
  @Input() labelFormatting: any;
  @Input() trimLabels: boolean = true;
  @Input() maxLabelLength: number = 10;
  @Input() tooltipText: (o: any) => any;
  @Input() tooltipDisabled: boolean = false;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  @Output() dblclick = new EventEmitter();

  max: number;
  data: PieData[];

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  ngOnChanges(changes: SimpleChanges): void {
    let shouldUpdate = false;

    for (const propName in changes) {
      if (propName === 'activeEntries') {
        const current = changes[propName].currentValue;
        const previous = changes[propName].previousValue;
        if (!areActiveEntriesEqual(previous, current)) {
          shouldUpdate = true;
        }
      } else {
        shouldUpdate = true;
      }
    }

    if (shouldUpdate) {
      this.update();
    }
  }

  update(): void {
    const pieGenerator = pie<any, any>()
      .value(d => d.value)
      .sort(null);

    const arcData = pieGenerator(this.series) as any as PieData[];

    this.max = max(arcData, d => d.value);

    this.data = calculateLabelPositions(arcData, this.outerRadius, this.showLabels);
    this.tooltipText = this.tooltipText || defaultTooltipText;
  }

  labelVisible(myArc): boolean {
    return labelVisible(myArc, this.showLabels);
  }

  getTooltipTitle(a) {
    return this.tooltipTemplate ? undefined : this.tooltipText(a);
  }

  labelText(myArc): string {
    return getPieSeriesLabelText(myArc, this.labelFormatting);
  }

  color(myArc): any {
    return this.colors.getColor(getPieSeriesLabel(myArc));
  }

  trackBy(index, item): string {
    return item.data.name;
  }

  onClick(data): void {
    this.select.emit(data);
  }

  isActive(entry): boolean {
    return isPieArcActive(entry, this.activeEntries);
  }

  getArcConfig(arc): PieArcConfig {
    return {
      fill: this.color(arc),
      startAngle: arc.startAngle,
      endAngle: arc.endAngle,
      innerRadius: this.innerRadius,
      outerRadius: this.outerRadius,
      cornerRadius: 0,
      value: arc.data.value,
      max: this.max,
      explodeSlices: this.explodeSlices,
      gradient: this.gradient,
      animate: this.animations,
      pointerEvents: true,
      isActive: this.isActive(arc.data)
    };
  }
}
