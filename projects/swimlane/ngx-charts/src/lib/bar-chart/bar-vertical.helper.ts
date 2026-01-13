import { scaleBand, scaleLinear } from 'd3-scale';

export function getGroupScale(domain: string[], width: number, groupPadding: number): any {
  const spacing = domain.length / (width / groupPadding + 1);
  return scaleBand()
    .rangeRound([0, width])
    .paddingInner(spacing)
    .paddingOuter(spacing / 2)
    .domain(domain);
}

export function getInnerScale(domain: string[], width: number, barPadding: number): any {
  const spacing = domain.length / (width / barPadding + 1);
  return scaleBand().rangeRound([0, width]).paddingInner(spacing).domain(domain);
}

export function getValueScale(domain: [number, number], height: number, roundDomains: boolean): any {
  const scale = scaleLinear().range([height, 0]).domain(domain);
  return roundDomains ? scale.nice() : scale;
}

export function getGroupDomain(results: any[]): string[] {
  const domain = [];
  for (const group of results) {
    if (!domain.includes(group.label)) {
      domain.push(group.label);
    }
  }
  return domain;
}

export function getInnerDomain(results: any[]): string[] {
  const domain = [];
  for (const group of results) {
    for (const d of group.series) {
      if (!domain.includes(d.label)) {
        domain.push(d.label);
      }
    }
  }
  return domain;
}

export function getValueDomain(results: any[], yScaleMax?: number): [number, number] {
  const domain = [];
  for (const group of results) {
    for (const d of group.series) {
      if (!domain.includes(d.value)) {
        domain.push(d.value);
      }
    }
  }
  const min = Math.min(0, ...domain);
  const max = yScaleMax ? Math.max(yScaleMax, ...domain) : Math.max(0, ...domain);
  return [min, max];
}

export function updateVerticalNormalizedSeries(results: any[], innerDomain: string[]): void {
  for (const group of results) {
    let d0 = 0;
    let total = 0;

    for (const d of group.series) {
      total += d.value;
    }

    for (const label of innerDomain) {
      let d = group.series.find(item => item.label === label);
      if (d) {
        d.d0 = d0;
        d.d1 = d0 + d.value;
        d0 += d.value;
      } else {
        d = {
          label,
          name: label,
          value: 0,
          d0,
          d1: d0
        };
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
