import d3 from '../d3';

export var colorSets = [
  {
    'name': 'flame',
    'base': '#590012', // Base Color for Gradients
    'group': 'general',
    'domain': ['#A10A28', '#D3342D', '#EF6D49', '#FAAD67', '#FDDE90', '#DBED91', '#A9D770', '#6CBA67', '#2C9653', '#146738']
  },
  {
    'name': 'ocean',
    'base': '#0340B9', // Base Color for Gradients
    'group': 'general',
    'domain': ['#1D68FB', '#33C0FC', '#4AFFFE', '#AFFFFF', '#FFFC63', '#FDBD2D', '#FC8A25', '#FA4F1E', '#FA141B', '#BA38D1']
  },
  {
    'name': 'forest',
    'base': '#258203', // Base Color for Gradients
    'group': 'general',
    'domain': ['#55C22D', '#C1F33D', '#3CC099', '#AFFFFF', '#8CFC9D', '#76CFFA', '#BA60FB', '#EE6490', '#C42A1C', '#FC9F32']
  },
  {
    'name': 'horizon',
    'base': '#026CCB', // Base Color for Gradients
    'group': 'general',
    'domain': ['#2597FB', '#65EBFD', '#99FDD0', '#FCEE4B', '#FEFCFA', '#FDD6E3', '#FCB1A8', '#EF6F7B', '#CB96E8', '#EFDEE0']
  },
  {
    'name': 'neons',
    'base': '#B20000', // Base Color for Gradients
    'group': 'general',
    'domain': ['#FF3333', '#FF33FF', '#CC33FF', '#0000FF', '#33CCFF', '#33FFFF', '#33FF66', '#CCFF33', '#FFCC00', '#FF6600']
  },
  {
    'name': 'picnic',
    'base': '#A37C00', // Base Color for Gradients
    'group': 'general',
    'domain': ['#FAC51D', '#66BD6D', '#FAA026', '#29BB9C', '#E96B56', '#55ACD2', '#B7332F', '#2C83C9', '#9166B8', '#92E7E8']
  },
  {
    'name': 'night',
    'base': '#48025F',
    'group': 'general',
    'domain': ["#2B1B5A", "#501356", "#183356", "#28203F", "#391B3C", "#1E2B3C", "#120634", "#2D0432", "#051932", "#453080", "#75267D", "#2C507D", "#4B3880", "#752F7D", "#35547D"]
  },
  {
    'name': 'nightLights',
    'base': '#4e31a5',
    'group': 'general',
    'domain': ["#4e31a5", "#9c25a7", "#3065ab", "#57468b", "#904497", "#46648b", "#32118d", "#a00fb3", "#1052a2", "#6e51bd", "#b63cc3", "#6c97cb", "#8671c1", "#b455be", "#7496c3"]
  },

  {
    'name': 'yellowGreen',
    'group': 'gradient',
    'domain': ["#f7fcb9", "#addd8e", "#31a354"]
  },

  {
    'name': 'purpleRed',
    'group': 'gradient',
    'domain': ["#e7e1ef", "#c994c7", "#dd1c77"]
  },

  {
    'name': 'yellowGreenBlue',
    'group': 'gradient',
    'domain': ["#edf8b1", "#7fcdbb", "#2c7fb8"]
  },

];

export function generateColorScale(scheme, type, domain) {
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

export function colorHelper(scheme, type, domain, customColors?) {
  let colorScale = generateColorScale(scheme, type, domain);
  let colorScaleFunction = function(value) {
    if (type === 'linear') {
      let valueScale = d3.scaleLinear()
        .domain(domain)
        .range([0, 1]);

      return (colorScale(valueScale(value)));
    } else {
      let formattedValue = value.toString();
      let found: any = undefined; // todo type customColors
      if (customColors && customColors.length > 0) {
        found = customColors.find((mapping) => {
          return mapping.name === formattedValue.toLowerCase();
        });
      }

      if (found) {
        return found.value;
      } else {
        return colorScale(value);
      }
    }
  };

  return colorScaleFunction;
}
