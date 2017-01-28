import d3 from '../d3';
import { colorSets } from '../utils/color-sets';

export class ColorHelper {
  scale: any;
  scaleType: any;
  colorDomain: any[];
  domain: any;
  customColors: any;

  constructor(scheme, type, domain, customColors?) {
    if (typeof(scheme) === 'string') {
      scheme = colorSets.find(cs => {
        return cs.name === scheme;
      });
    }
    this.colorDomain = scheme.domain;
    this.scaleType = type;
    this.domain = domain;

    this.scale = this.generateColorScheme(scheme, type, domain);
  }

  generateColorScheme(scheme, type, domain) {
    if (typeof(scheme) === 'string') {
      scheme = colorSets.find(cs => {
        return cs.name === scheme;
      });
    }
    let colorScale;
    if (type === 'quantile') {
      colorScale = d3.scaleQuantile()
        .range(scheme.domain)
        .domain(domain);

    } else if (type === 'ordinal') {
      colorScale = d3.scaleOrdinal()
        .range(scheme.domain)
        .domain(domain);

    } else if (type === 'linear') {
      colorScale = d3.scaleLinear()
        .domain(d3.range(0, 1, 1.0 / (scheme.domain.length - 1)))
        .range(scheme.domain);
    }

    return colorScale;
  }

  getColor(value) {
    if (this.scaleType === 'linear') {
      const valueScale = d3.scaleLinear()
        .domain(this.domain)
        .range([0, 1]);

      return (this.scale(valueScale(value)));
    } else {
      const formattedValue = value.toString();
      let found: any; // todo type customColors
      if (this.customColors && this.customColors.length > 0) {
        found = this.customColors.find((mapping) => {
          return mapping.name === formattedValue.toLowerCase();
        });
      }

      if (found) {
        return found.value;
      } else {
        return this.scale(value);
      }
    }
  }

  getLinearGradientStops(value, start) {
    if (!start) {
      start = this.domain[0];
    }

    const valueScale = d3.scaleLinear()
      .domain(this.domain)
      .range([0, 1]);

    const colorValueScale = d3.scaleBand()
      .domain(this.colorDomain)
      .range([0, 1]);

    const endColor = this.getColor(value);

    // generate the stops
    const startVal = valueScale(start);
    const startColor = this.getColor(start);

    const endVal = valueScale(value);
    let i = 0;
    let currentVal = startVal;
    const stops = [];
    stops.push({
      color: startColor,
      offset: 0,
      opacity: 1
    });

    while (currentVal < endVal && i < this.colorDomain.length) {
      const color = this.colorDomain[i];
      const offset = colorValueScale(color);
      if (offset <= startVal) {
        i++;
        continue;
      }
      if (offset >= endVal) {
        break;
      }

      stops.push({
        color,
        offset,
        opacity: 1
      });
      currentVal = offset;
      i++;
    }

    stops.push({
      color: endColor,
      offset: endVal,
      opacity: 1
    });

    // normalize the offsets into percentages
    for (const s of stops) {
      s.offset = Math.floor(((s.offset - startVal) / (endVal - startVal)) * 100);
    }

    return stops;
  }
}
