import parseDate = require('date-fns/parse');
import formatDate = require('date-fns/format');

export function tickFormat(fieldType, groupByType): Function {
  return function(label: string): string {
    if (label === 'No Value' || label === 'Other') {
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy') {
      return formatDate(parseDate(label), 'MM/DD/YYYY');
    }

    return label.toString();
  };
}
