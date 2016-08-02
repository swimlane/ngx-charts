export function layout(d) {
  let data = [], item;

  for (let i = 0; i < d.length; i++) {
    item = {};
    item.label = d[i].label;
    item.value = d[i].value;
    item.group = '__all__';
    data.push(item);
  }
  data['label'] = '__all__';
  data['meta'] = d.meta.slice();

  return data;
}
