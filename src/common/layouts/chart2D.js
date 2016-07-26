
export function layout(d) {
  let groups = [], group;

  let series = [];

  for (var i = 0; i < d.length; i++) {
    groups.push(group = []);
    group.label = d[i].label;
    if (!d[i].values) {
      d[i].values = {};
    }
    for (let key in d[i].values) {
      group.push({
        value: d[i].values[key],
        label: d[i].label,
        group: key
      });
      if (series.indexOf(key) === -1) {
        series.push(key);
      }
    }
  }
  groups.series = series.map(function (d) {
    return {label: d};
  });
  groups.series.meta = d.meta.slice(1);
  return groups;
}


