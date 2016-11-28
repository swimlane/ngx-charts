import * as moment from 'moment';
export function sortLinear(data, property, direction = 'asc') {
  return data.sort((a, b) => {
    if (direction === 'asc') {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  });
}

export function sortByDomain(data, property, direction = 'asc', domain) {
  return data.sort((a, b) => {
    let aVal = a[property];
    let bVal = b[property];

    let aIdx = domain.indexOf(aVal);
    let bIdx = domain.indexOf(bVal);

    if (direction === 'asc') {
      return aIdx - bIdx;
    } else {
      return bIdx - aIdx;
    }
  });
}

export function sortByTime(data, property, direction = 'asc') {
  return data.sort((a, b) => {
    let aDate = moment(a[property]);
    let bDate = moment(b[property]);

    if (direction === 'asc') {
      if (aDate.isAfter(bDate)) return 1;
      if (bDate.isAfter(aDate)) return -1;
      return 0;
    } else {
      if (aDate.isAfter(bDate)) return -1;
      if (bDate.isAfter(aDate)) return 1;
      return 0;
    }
  });
}
