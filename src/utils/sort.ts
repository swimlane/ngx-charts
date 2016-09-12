export function sortLinear(data, property, direction = 'asc') {
  return data.sort((a, b) => {
    if (direction === 'asc') {
      return a[property] - b[property];
    } else {
      return b[property] - a[property];
    }
  });
}
