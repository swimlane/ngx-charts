import d3 from '../d3';

export function tickFormat(fieldType, groupByType): Function {
  return function(label: string): string {
    if (label === 'No Value' || label === 'Other') {
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy') {
      const formatter = d3.timeFormat('MM/DD/YYYY');
      return formatter(label);
    }

    return label.toString();
  };
}
