
export function layout(d, normalize) {
  let groups = [], group;
  groups.series = [];

  let series = getSeries(d);
  let totals = {};

  for (let i = 0; i < series.length; i++) {
    groups.push(group = []);
    group.label = series[i];
    groups.series.push({label: series[i]});

    for (let j = 0; j < d.length; j++) {
      if (!d[j].values) {
        d[j].values = {};
      }
      if (!totals[d[j].label]) {
        totals[d[j].label] = 0;
      }
      totals[d[j].label] += d[j].values[series[i]] || 0;
      group.push({
        value: d[j].values[series[i]] || 0,
        label: d[j].label,
        group: series[i]
      });
    }
  }

  if (normalize) {
    for (let k = 0; k < groups.length; k++) {
      for (let m = 0; m < groups[k].length; m++) {
        groups[k][m].total = totals[groups[k][m].label];
      }
    }
  }

  groups.series.meta = d.meta.slice(1);

  return groups;
}

function getSeries(data) {
  var series = [];

  for (var i = 0; i < data.length; i++) {
    for (var key in data[i].values) {
      if (series.indexOf(key) === -1) {
        series.push(key);
      }
    }
  }

  return series;
}
