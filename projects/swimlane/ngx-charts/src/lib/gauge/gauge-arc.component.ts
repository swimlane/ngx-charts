import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy, TemplateRef } from '@angular/core';
import { formatLabel, escapeLabel } from '../common/label.helper';
import { ColorHelper } from '../common/color.helper';
import { DataItem } from '../models/chart-data.model';
import { PlacementTypes } from '../common/tooltip/position';
import { StyleTypes } from '../common/tooltip/style.type';
import { PieArcConfig } from '../pie-chart/pie-arc.config';

export interface ArcItem {
  data: DataItem;
  endAngle: number;
  innerRadius: number;
  outerRadius: number;
}

@Component({
  selector: 'g[ngx-charts-gauge-arc]',
  template: `
    <svg:g
      ngx-charts-pie-arc
      class="background-arc"
      [config]="bgConfig"
      [data]="backgroundArc.data"
    ></svg:g>
    <svg:g
      ngx-charts-pie-arc
      [config]="valueConfig"
      [data]="valueArc.data"
      (select)="select.emit($event)"
      (activate)="activate.emit($event)"
      (deactivate)="deactivate.emit($event)"
      ngx-tooltip
      [tooltipDisabled]="tooltipDisabled"
      [tooltipPlacement]="placementTypes.Top"
      [tooltipType]="styleTypes.tooltip"
      [tooltipTitle]="tooltipTemplate ? undefined : tooltipText(valueArc)"
      [tooltipTemplate]="tooltipTemplate"
      [tooltipContext]="valueArc.data"
    ></svg:g>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class GaugeArcComponent {
  @Input() backgroundArc: ArcItem;
  @Input() valueArc: ArcItem;
  @Input() cornerRadius: number;
  @Input() colors: ColorHelper;
  @Input() isActive: boolean = false;
  @Input() tooltipDisabled: boolean = false;
  @Input() valueFormatting: (value: any) => string;
  @Input() tooltipTemplate: TemplateRef<any>;
  @Input() animations: boolean = true;

  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();

  placementTypes = PlacementTypes;
  styleTypes = StyleTypes;

  get bgConfig(): PieArcConfig {
    return {
      fill: '',
      startAngle: 0,
      endAngle: this.backgroundArc.endAngle,
      innerRadius: this.backgroundArc.innerRadius,
      outerRadius: this.backgroundArc.outerRadius,
      cornerRadius: this.cornerRadius,
      value: 0,
      max: 0,
      explodeSlices: false,
      gradient: false,
      animate: false,
      pointerEvents: false,
      isActive: false
    };
  }

  get valueConfig(): PieArcConfig {
    return {
      fill: this.colors.getColor(this.valueArc.data.name),
      startAngle: 0,
      endAngle: this.valueArc.endAngle,
      innerRadius: this.valueArc.innerRadius,
      outerRadius: this.valueArc.outerRadius,
      cornerRadius: this.cornerRadius,
      value: this.valueArc.data.value as number,
      max: 0,
      explodeSlices: false,
      gradient: false,
      animate: this.animations,
      pointerEvents: true,
      isActive: this.isActive
    };
  }

  tooltipText(arc: ArcItem): string {
    const label = formatLabel(arc.data.name);
    let val;

    if (this.valueFormatting) {
      val = this.valueFormatting(arc.data.value);
    } else {
      val = formatLabel(arc.data.value);
    }

    return `
      <span class="tooltip-label">${escapeLabel(label)}</span>
      <span class="tooltip-val">${val}</span>
    `;
  }
}