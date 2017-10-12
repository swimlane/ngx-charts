import { scaleBand } from 'd3-scale';

export function gridSize(dims, len, minWidth) {
  let rows = 1;
  let cols = len;
  const width = dims.width;

  if (width > minWidth) {
    while (width / cols < minWidth) {
      rows += 1;
      cols = Math.ceil(len / rows);
    }
  }

  return [cols, rows];
}

export function gridLayout(dims, data, minWidth, designatedTotal) {
  const xScale: any = scaleBand<number>();
  const yScale: any = scaleBand<number>();
  const width = dims.width;
  const height = dims.height;

  const [columns, rows] = gridSize(dims, data.length, minWidth);

  const xDomain = [];
  const yDomain = [];
  for (let i = 0; i < rows; i++) {
    yDomain.push(i);
  }
  for (let i = 0; i < columns; i++) {
    xDomain.push(i);
  }
  xScale.domain(xDomain);
  yScale.domain(yDomain);

  xScale.rangeRound([0, width], 0.1);
  yScale.rangeRound([0, height], 0.1);

  const res = [];
  const total = designatedTotal ? designatedTotal : getTotal(data);
  const cardWidth = xScale.bandwidth();
  const cardHeight = yScale.bandwidth();

  for (let i = 0; i < data.length; i++) {
    res[i] = {};
    res[i].data = {
      name: data[i] ? data[i].name : '',
      value: data[i] ? data[i].value : undefined,
      extra: data[i] ? data[i].extra : undefined,
    };
    res[i].x = xScale(i % columns);
    res[i].y = yScale(Math.floor(i / columns));
    res[i].width = cardWidth;
    res[i].height = cardHeight;
    res[i].data.percent = (total > 0) ? res[i].data.value / total : 0;
    res[i].data.total = total;
  }

  return res;
}

function getTotal(results) {
  return results
    .map(d => d ? d.value : 0)
    .reduce((sum, val) => sum + val, 0);
}
