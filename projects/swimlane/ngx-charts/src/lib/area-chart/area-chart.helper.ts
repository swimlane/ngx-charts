import { scaleLinear, scalePoint, scaleTime } from 'd3-scale';
import { getUniqueXDomainValues, getScaleType } from '../common/domain.helper';
import { ScaleType } from '../common/types/scale-type.enum';

export function getXDomain(results: any[]): { domain: any[]; xSet: any[]; scaleType: ScaleType } {
  const values = getUniqueXDomainValues(results);
  const scaleType = getScaleType(values);
  let domain = [];
  let xSet = [];

  if (scaleType === ScaleType.Time) {
    const min = Math.min(...values);
    const max = Math.max(...values);
    domain = [new Date(min), new Date(max)];
    xSet = [...values].sort((a, b) => a.getTime() - b.getTime());
  } else if (scaleType === ScaleType.Linear) {
    const numValues = values.map(v => Number(v));
    const min = Math.min(...numValues);
    const max = Math.max(...numValues);
    domain = [min, max];
    xSet = [...numValues].sort((a, b) => a - b);
  } else {
    domain = values;
    xSet = values;
  }

  return { domain, xSet, scaleType };
}

export function getXDomainAdvanced(results: any[], xScaleMin: any, xScaleMax: any): { domain: any[]; xSet: any[]; scaleType: ScaleType } {
  let values = getUniqueXDomainValues(results);
  const scaleType = getScaleType(values);
  let domain = [];
  let xSet = [];

  if (scaleType === ScaleType.Linear) {
    values = values.map(v => Number(v));
  }

  let min;
  let max;
  if (scaleType === ScaleType.Time || scaleType === ScaleType.Linear) {
    min = xScaleMin ? xScaleMin : Math.min(...values);
    max = xScaleMax ? xScaleMax : Math.max(...values);
  }

  if (scaleType === ScaleType.Time) {
    domain = [new Date(min), new Date(max)];
    xSet = [...values].sort((a, b) => a.getTime() - b.getTime());
  } else if (scaleType === ScaleType.Linear) {
    domain = [min, max];
    xSet = [...values].sort((a, b) => a - b);
  } else {
    domain = values;
    xSet = values;
  }

  return { domain, xSet, scaleType };
}

export function getXScale(domain: any[], width: number, scaleType: ScaleType, roundDomains: boolean): any {
  let scale;

  if (scaleType === ScaleType.Time) {
    scale = scaleTime();
  } else if (scaleType === ScaleType.Linear) {
    scale = scaleLinear();
  } else if (scaleType === ScaleType.Ordinal) {
    scale = scalePoint().padding(0.1);
  }

  scale.range([0, width]).domain(domain);

  return roundDomains ? scale.nice() : scale;
}

export function getYScale(domain: any[], height: number, roundDomains: boolean): any {
  const scale = scaleLinear().range([height, 0]).domain(domain);
  return roundDomains ? scale.nice() : scale;
}

export function getYStackedDomain(results: any[], xSet: any[], scaleType: ScaleType, yScaleMin: number, yScaleMax: number): [number, number] {
  const domain = [];

  for (const val of xSet) {
    let sum = 0;
    for (const group of results) {
      const d = group.series.find(item => {
        let a = item.name;
        let b = val;
        if (scaleType === ScaleType.Time) {
          a = a.valueOf();
          b = b.valueOf();
        }
        return a === b;
      });

      if (d) {
        sum += d.value;
      }
    }
    domain.push(sum);
  }

  const min = yScaleMin !== undefined ? yScaleMin : Math.min(0, ...domain);
  const max = yScaleMax !== undefined ? yScaleMax : Math.max(...domain);
  return [min, max];
}

export function updateNormalizedSeries(results: any[], xSet: any[], scaleType: ScaleType): void {
  for (const val of xSet) {
    let d0 = 0;
    let total = 0;

    for (const group of results) {
      const d = group.series.find(item => {
        let a = item.name;
        let b = val;
        if (scaleType === ScaleType.Time) {
          a = a.valueOf();
          b = b.valueOf();
        }
        return a === b;
      });
      if (d) {
        total += d.value;
      }
    }

    for (const group of results) {
      let d = group.series.find(item => {
        let a = item.name;
        let b = val;
        if (scaleType === ScaleType.Time) {
          a = a.valueOf();
          b = b.valueOf();
        }
        return a === b;
      });

      if (d) {
        d.d0 = d0;
        d.d1 = d0 + d.value;
        d0 += d.value;
      } else {
        d = { name: val, value: 0, d0, d1: d0 };
        group.series.push(d);
      }

      if (total > 0) {
        d.d0 = (d.d0 * 100) / total;
        d.d1 = (d.d1 * 100) / total;
      } else {
        d.d0 = 0;
        d.d1 = 0;
      }
    }
  }
}

export function updateStackedSeries(results: any[], xSet: any[], scaleType: ScaleType): void {
  for (const val of xSet) {
    let d0 = 0;
    for (const group of results) {
      let d = group.series.find(item => {
        let a = item.name;
        let b = val;
        if (scaleType === ScaleType.Time) {
          a = a.valueOf();
          b = b.valueOf();
        }
        return a === b;
      });

      if (d) {
        d.d0 = d0;
        d.d1 = d0 + d.value;
        d0 += d.value;
      } else {
        d = { name: val, value: 0, d0, d1: d0 };
        group.series.push(d);
      }
    }
  }
}