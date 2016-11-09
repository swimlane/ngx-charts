import d3 from '../d3';

export function gridLayout(dims, data, minWidth) {
  let rows = 1;
  let xScale: any = d3.scaleBand();
  let yScale: any = d3.scaleBand();
  let dataLength = data.length;
  let width = dims.width;
  let height = dims.height;

  if (width > minWidth) {
    while (width / dataLength < minWidth) {
      rows += 1;
      dataLength = Math.ceil(data.length / rows);
    }
  }

  let columns = dataLength;

  let xDomain = [];
  let yDomain = [];
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

  let res = [];
  let total = getTotal(data);
  let cardWidth = xScale.bandwidth();
  let cardHeight = yScale.bandwidth();

  for (let i = 0; i < data.length; i++) {
    res[i] = {};
    res[i].data = {
      name: data[i].name,
      value: data[i].value
    };
    res[i].x = xScale(i % columns);
    res[i].y = yScale(Math.floor(i / columns));
    res[i].width = cardWidth;
    res[i].height = cardHeight;
    res[i].data.percent = res[i].data.value / total;
    res[i].data.total = total;
  }

  return res;
}

function getTotal(results) {
  return results
    .map(d => d.value)
    .reduce((sum, val) => { return sum + val; }, 0);
}
