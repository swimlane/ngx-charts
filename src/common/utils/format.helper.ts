const defaultFormat = {
  style: 'currency',
  locale: 'en-US',
  currency: 'USD',
  maximumFractionDigits: 0,
  durationFormat: 'long'
};

const durationUnits = {
  seconds: {
    long: 'seconds',
    short: 'sec'
  },
  minutes: {
    long: 'minutes',
    short: 'min'
  },
  hours: {
    long: 'hours',
    short: 'hr'
  }
};

/**
 * Format the number
 * @param  {number} value
 * @param  {string} type
 * @param  {object} options
 * @return {string} formatted results
 */
export function formatNumber(
  value: number,
  type: string,
  options: any = {}): string {

  options = Object.assign(options, defaultFormat);

  if (type === 'currency') {
    options.style = 'currency';
    return value.toFixed(1).toLocaleString(options.locale.toString(), options);
  } else if (type === 'duration') {
    if (value < 60) {
      const str = value.toFixed(1).toLocaleString(options.locale, options);
      const format = durationUnits.seconds[options.durationFormat];
      return `${str} ${format}`;
    } else if (value < 3600) {
      const str = (value/60).toFixed(1).toLocaleString(options.locale, options);
      const format = durationUnits.minutes[options.durationFormat];
      return `${str} ${format}`;
    } else {
      const str = (value/3600).toFixed(1).toLocaleString(options.locale, options);
      const format = durationUnits.hours[options.durationFormat];
      return `${str} ${format}`;
    }
  }

  return value.toFixed(1).toLocaleString(options.locale);
}
