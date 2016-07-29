
export function layout(d, normalize) {
  let stacks = [], stack;

  let groups = group(d);

  for (let i = 0; i < d.length; i++) {
    let d0 = 0;
    stacks.push(stack = []);
    stack.id = d[i].label;

    for (var j = 0; j < groups.length; j++) {
      if (!d[i].values) {
        d[i].values = {};
      }
      stack.push({
        value: +d[i].values[groups[j]]|| 0,
        label: d[i].label,
        group: groups[j],
        d0: d0,
        d1: d0 += +d[i].values[groups[j]] || 0
      });
    }
    if (normalize) {
      stack.forEach(k => {
        k.d0 /= d0;
        k.d1 /= d0;
        k.total = d0;
      });
    }
  }
  stacks.series = groups.map(function (d) {
    return {label: d};
  });
  stacks.series.meta = d.meta.slice(1);
  return stacks;
}

function group(data) {
  var groups = [];

  for (var i = 0; i < data.length; i++) {
    for (var key in data[i].values) {
      if (groups.indexOf(key) === -1) {
        groups.push(key);
      }
    }
  }

  return groups;
}
