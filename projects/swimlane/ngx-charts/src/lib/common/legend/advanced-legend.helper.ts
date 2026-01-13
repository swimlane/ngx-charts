import { DataItem, StringOrNumberOrDate } from '../../models/chart-data.model';
import { ColorHelper } from '../color.helper';
import { formatLabel } from '../label.helper';
import { trimLabel } from '../trim-label.helper';
import { roundPercentagesWithDecimals } from '../percentage.helper';

export interface AdvancedLegendItem {
  value: StringOrNumberOrDate;
  _value: StringOrNumberOrDate;
  color: string;
  data: DataItem;
  label: string;
  displayLabel: string;
  originalLabel: string;
  percentage: string;
}

export function calculateTotal(data: DataItem[]): number {
  return data.map(d => Number(d.value)).reduce((sum, d) => sum + d, 0);
}

export function getAdvancedLegendItems(
  data: DataItem[],
  total: number,
  colors: ColorHelper,
  labelFormatting: (value: string) => string,
  percentageFormatting: (value: number) => any,
  roundPercentages: boolean
): AdvancedLegendItem[] {
  const values = data.map(d => Number(d.value));
  const percentages = roundPercentages
    ? roundPercentagesWithDecimals(values)
    : values.map(v => (total > 0 ? (v / total) * 100 : 0));

  return (data as any).map((d, index) => {
    const label = formatLabel(d.name);
    const percentage = percentages[index];
    const formattedLabel = typeof labelFormatting === 'function' ? labelFormatting(label) : label;
    return {
      _value: d.value,
      data: d,
      value: d.value,
      color: colors.getColor(label),
      label: formattedLabel,
      displayLabel: trimLabel(formattedLabel, 20),
      originalLabel: d.name,
      percentage: percentageFormatting
        ? percentageFormatting(parseFloat(percentage.toLocaleString()))
        : percentage.toLocaleString()
    };
  });
}
