import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewEncapsulation
} from '@angular/core';
import { DataItem, StringOrNumberOrDate } from '../../models/chart-data.model';
import { ColorHelper } from '../color.helper';
import { AdvancedLegendItem, calculateTotal, getAdvancedLegendItems } from './advanced-legend.helper';

@Component({
  selector: 'ngx-charts-advanced-legend',
  templateUrl: './advanced-legend.component.html',
  styleUrls: ['./advanced-legend.component.scss'],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  standalone: false
})
export class AdvancedLegendComponent implements OnChanges {
  @Input() width: number;
  @Input() data: DataItem[];
  @Input() colors: ColorHelper;
  @Input() label: string = 'Total';
  @Input() animations: boolean = true;
  @Input() roundPercentages: boolean = true;
  @Output() select = new EventEmitter();
  @Output() activate = new EventEmitter();
  @Output() deactivate = new EventEmitter();
  legendItems: AdvancedLegendItem[] = [];
  total: number;
  roundedTotal: number;
  @Input() valueFormatting: (value: StringOrNumberOrDate) => any;
  @Input() labelFormatting: (value: string) => string = label => label;
  @Input() percentageFormatting: (value: number) => any = percentage => percentage;
  defaultValueFormatting: (value: StringOrNumberOrDate) => string = value => value.toLocaleString();

  ngOnChanges(changes: SimpleChanges): void {
    this.update();
  }
  update(): void {
    this.total = calculateTotal(this.data);
    this.roundedTotal = this.total;
    this.legendItems = getAdvancedLegendItems(
      this.data,
      this.total,
      this.colors,
      this.labelFormatting,
      this.percentageFormatting,
      this.roundPercentages
    );
  }
  trackBy(index: number, item: AdvancedLegendItem) {
    return item.label;
  }
}
