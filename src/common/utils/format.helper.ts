export function formatNumber(number, type, options){
  if (!options){
    options = {};
  }

  if (!options.locale){
    options.locale = 'en-US';
  }
  if (!options.currency){
    options.currency = 'USD';
  }
  if (!options.maximumFractionDigits){
    options.maximumFractionDigits = 0;
  }
  if (!options.durationFormat){
    options.durationFormat = 'long';
  }

  let durationUnits = {
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
  }

  if (type === 'currency'){
    options.style = 'currency';
    return number.toFixed(1).toLocaleString(options.locale, options);
  } else if (type === 'duration'){
    if (number < 60){
      return `${number.toFixed(1).toLocaleString(options.locale, options)} ${durationUnits.seconds[options.durationFormat]}`;
    } else if (number < 3600){
      return `${(number/60).toFixed(1).toLocaleString(options.locale, options)} ${durationUnits.minutes[options.durationFormat]}`;
    } else {
      return `${(number/3600).toFixed(1).toLocaleString(options.locale, options)} ${durationUnits.hours[options.durationFormat]}`;
    }
  }

  return number.toFixed(1).toLocaleString(options.locale);
}
