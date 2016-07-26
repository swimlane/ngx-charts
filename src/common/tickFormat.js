export function tickFormat(fieldType, groupByType){
  return function(label){
    if (label === 'No Value' || label === 'Other'){
      return label;
    }
    if (fieldType === 'date' && groupByType === 'groupBy'){
      return moment(label).format("MM/DD/YYYY");
    }

    return label.toString();
  }
}
