export function trimLabel(s, max = 16): string {
  if(typeof s !== 'string') {
    if(typeof s === 'number') {
      return s + '';
    } else {
      return '';
    }
  }

  if(s.length <= max) {
    return s;
  } else {
    return `${s.slice(0, max).trim()}...`;
  }
}
