import { scaleBand, scaleLinear } from 'd3-scale';

export function getGroupScale(domain: string[], height: number, groupPadding: number): any {
  const spacing = domain.length / (height / groupPadding + 1);
  return scaleBand()
    .rangeRound([0, height])
    .paddingInner(spacing)
    .paddingOuter(spacing / 2)
    .domain(domain);
}

export function getInnerScale(domain: string[], height: number, barPadding: number): any {
  const spacing = domain.length / (height / barPadding + 1);
  return scaleBand().rangeRound([0, height]).paddingInner(spacing).domain(domain);
}

export function getValueScale(domain: [number, number], width: number, roundDomains: boolean): any {
  const scale = scaleLinear().range([0, width]).domain(domain);
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

export function getValueDomain(results: any[], xScaleMax?: number): [number, number] {
  const domain = [];
  for (const group of results) {
    for (const d of group.series) {
      if (!domain.includes(d.value)) {
        domain.push(d.value);
      }
    }
  }
  const min = Math.min(0, ...domain);
  const max = xScaleMax ? Math.max(xScaleMax, ...domain) : Math.max(0, ...domain);
  return [min, max];
}

export function updateBarNormalizedSeries(results: any[], innerDomain: string[]): void {
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