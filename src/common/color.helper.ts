import { range } from 'd3-array';
import { scaleBand, scaleLinear, scaleOrdinal, scaleQuantile } from 'd3-scale';

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
    this.customColors = customColors;

    this.scale = this.generateColorScheme(scheme, type, this.domain);
  }

  generateColorScheme(scheme, type, domain) {
    if (typeof(scheme) === 'string') {
      scheme = colorSets.find(cs => {
        return cs.name === scheme;
      });
    }
    let colorScale;
    if (type === 'quantile') {
      colorScale = scaleQuantile()
        .range(scheme.domain)
        .domain(domain);

    } else if (type === 'ordinal') {
      colorScale = scaleOrdinal()
        .range(scheme.domain)
        .domain(domain);

    } else if (type === 'linear') {
      // linear schemes must have at least 2 colors
      const colorDomain = [...scheme.domain];
      if (colorDomain.length === 1) {
        colorDomain.push(colorDomain[0]);
        this.colorDomain = colorDomain;
      }

      const points = range(0, 1, 1.0 / colorDomain.length);
      colorScale = scaleLinear()
        .domain(points)
        .range(colorDomain);
    }

    return colorScale;
  }

  getColor(value) {
    if (this.scaleType === 'linear') {
      const valueScale = scaleLinear()
        .domain(this.domain)
        .range([0, 1]);

      return (this.scale(valueScale(value)));
    } else {

      if(typeof this.customColors === 'function') {
        return this.customColors(value);
      }

      const formattedValue = value.toString();
      let found: any; // todo type customColors
      if (this.customColors && this.customColors.length > 0) {
        found = this.customColors.find((mapping) => {
          return mapping.name.toLowerCase() === formattedValue.toLowerCase();
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
    if (start === undefined) {
      start = this.domain[0];
    }

    const valueScale = scaleLinear()
      .domain(this.domain)
      .range([0, 1]);

    const colorValueScale = scaleBand()
      .domain(this.colorDomain)
      .range([0, 1]);

    const endColor = this.getColor(value);

    // generate the stops
    const startVal = valueScale(start);
    const startColor = this.getColor(start);

    const endVal = valueScale(value);
    let i = 1;
    let currentVal = startVal;
    const stops = [];

    stops.push({
      color: startColor,
      offset: startVal,
      originalOffset: startVal,
      opacity: 1
    });

    while (currentVal < endVal && i < this.colorDomain.length) {
      const color = this.colorDomain[i];
      const offset = colorValueScale(color);
      if (offset <= startVal) {
        i++;
        continue;
      }

      if (offset.toFixed(4) >= (endVal - colorValueScale.bandwidth()).toFixed(4)) {
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

    if (stops[stops.length - 1].offset < 100) {
      stops.push({
        color: endColor,
        offset: endVal,
        opacity: 1
      });
    }

    if (endVal === startVal) {
      stops[0].offset = 0;
      stops[1].offset = 100;
    } else {
      // normalize the offsets into percentages
      if (stops[stops.length - 1].offset !== 100) {
        for (const s of stops) {
          s.offset = ((s.offset - startVal) / (endVal - startVal)) * 100;
        }
      }
    }

    return stops;
  }
}
