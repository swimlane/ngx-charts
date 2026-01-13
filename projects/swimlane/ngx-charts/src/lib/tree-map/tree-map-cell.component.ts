import { Component, Input, Output, EventEmitter, ElementRef, OnChanges, ChangeDetectionStrategy, SimpleChanges } from '@angular/core';
import { id } from '../utils/id';
import { DataItem } from '../models/chart-data.model';
import { Gradient } from '../common/types/gradient.interface';
import { BarOrientation } from '../common/types/bar-orientation.enum';
import {
  getTreeMapCellGradientStops,
  getTreeMapCellFormattedValue,
  getTreeMapCellFormattedLabel,
  updateTreeMapCell,
  getTextColor
} from './tree-map.helper';
import { TreeMapCellConfig } from './tree-map-cell.config';

@Component({
  selector: 'g[ngx-charts-tree-map-cell]',
  templateUrl: './tree-map-cell.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class TreeMapCellComponent implements OnChanges {
  @Input() config: Partial<TreeMapCellConfig>;
  @Input() data: DataItem;
  @Output() select = new EventEmitter();

  gradientStops: Gradient[];
  gradientId: string;
  gradientUrl: string;
  element: HTMLElement;
  formattedLabel: string;
  formattedValue: string;
  initialized: boolean = false;
  orientation = BarOrientation;

  get configValues(): TreeMapCellConfig {
    const defaultConfig: TreeMapCellConfig = {
      fill: '',
      x: 0,
      y: 0,
      width: 0,
      height: 0,
      label: '',
      value: 0,
      valueFormatting: null,
      labelFormatting: null,
      gradient: false,
      animations: true
    };
    return { ...defaultConfig, ...this.config };
  }

  constructor(element: ElementRef) {
    this.element = element.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges): void {
    const config = this.configValues;
    updateTreeMapCell(this);

    this.formattedValue = getTreeMapCellFormattedValue(config.value, config.valueFormatting);
    this.formattedLabel = getTreeMapCellFormattedLabel(config.label, config.labelFormatting, this.data, config.value);

    if (!this.initialized || changes.config) {
      this.gradientId = 'grad' + id().toString();
      this.gradientUrl = `url(#${this.gradientId})`;
      this.gradientStops = getTreeMapCellGradientStops(config.fill);
      this.initialized = true;
    }
  }

  getTextColor(): string {
    return getTextColor(this.configValues.fill);
  }
  onClick(): void {
    this.select.emit(this.data);
  }
}