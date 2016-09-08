export abstract class BaseChart {
  results: any[];

  update() {
    this.results = this.cloneData(this.results);
  }

  // Clones the data into a new object
  cloneData(data) {
    let results = [];

    for (let item of data){
      let copy = {
        name: item['name']
      };

      if (item['value']) {
        copy['value'] = item['value'];
      };

      if (item['series']) {
        copy['series'] = [];
        for (let seriesItem of item['series']){
          let seriesItemCopy = Object.assign({}, seriesItem);
          copy['series'].push(seriesItemCopy);
        }
      }

      results.push(copy);
    }

    return results;
  }

  abstract setColors()

  abstract click(data, group)
}
