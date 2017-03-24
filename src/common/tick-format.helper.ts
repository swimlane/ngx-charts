import { timeFormat } from 'd3-time-format';

export function tickFormat(fieldType, groupByType): (label: string) => string {
  return function(label: string): string {
    if (label === 'No Value' || label === 'Other') {
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy') {
      const formatter = timeFormat('MM/DD/YYYY');
      return formatter(<any>label);
    }

    return label.toString();
  };
}
