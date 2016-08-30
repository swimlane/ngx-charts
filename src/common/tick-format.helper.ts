import * as moment from "moment";

export function tickFormat(fieldType, groupByType): Function {
  return function(label: string): string {
    if (label === 'No Value' || label === 'Other') {
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy') {
      return moment(label).format("MM/DD/YYYY");
    }

    return label.toString();
  };
}
