import d3 from '../d3';

export function getScaleType(values): string {
  let date = true;
  let num = true;

  for (const value of values) {
    if (!isDate(value)) {
      date = false;
    }

    if (typeof value !== 'number') {
      num = false;
    }
  }

  if (date) return 'time';
  if (num) return 'linear';
  return 'ordinal';
}

function isDate(value: any): boolean {
  if (value instanceof Date) {
    return true;
  }

  return false;
}

export function getDomain(values, scaleType, autoScale): number[] {
    let domain: number[] = [];

    if (scaleType === 'time') {
      const min = Math.min(...values);
      const max = Math.max(...values);
      domain = [min, max];
    } else if (scaleType === 'linear') {
      values = values.map(v => Number(v));
      let min = Math.min(...values);
      const max = Math.max(...values);
      if (!autoScale) {
        min = Math.min(0, min);
      }
      domain = [min, max];
    } else {
      domain = values;
    }

    return domain;
}

export function getScale(domain, range: number[], scaleType, roundDomains): any {
  let scale: any;

  if (scaleType === 'time') {
    scale = d3.scaleTime()
      .range(range)
      .domain(domain);
  } else if (scaleType === 'linear') {
    scale = d3.scaleLinear()
      .range(range)
      .domain(domain);

    if (roundDomains) {
      scale = scale.nice();
    }
  } else if (scaleType === 'ordinal') {
    scale = d3.scalePoint()
      .range(range)
      .domain(domain);
  }

  return scale;
}
