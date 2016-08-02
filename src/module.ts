import angular from 'angular';
import 'common/services/stats/statsService.js';

import { adapter } from 'app/adapter.js';
import { vizContainer } from './core/vizContainer.js';
import vizTemplate from './viz.tpl.html!ngtpl';

import {
  BarVertical,
  BarVertical2D,
  BarVerticalStacked,
  BarVerticalNormalized,
  BarHorizontal,
  BarHorizontal2D,
  BarHorizontalStacked,
  BarHorizontalNormalized,
  DateBar,
  PieChart,
  PieGrid,
  AdvancedPieChart,
  LineChart,
  LineChart2D,
  AreaChart,
  AreaChartStacked,
  AreaChartNormalized,
  NumberCard,
  HeatMap,
  TreeMap
} from './viz.js';

export default angular
  .module('components.viz', ['services.stats', vizTemplate.name])
  .directive('vizContainer', vizContainer)

  .directive('barVertical', adapter.downgradeNg2Component(BarVertical))
  .directive('barVertical2D', adapter.downgradeNg2Component(BarVertical2D))
  .directive('barVerticalStacked', adapter.downgradeNg2Component(BarVerticalStacked))
  .directive('barVerticalNormalized', adapter.downgradeNg2Component(BarVerticalNormalized))
  .directive('barHorizontal', adapter.downgradeNg2Component(BarHorizontal))
  .directive('barHorizontal2D', adapter.downgradeNg2Component(BarHorizontal2D))
  .directive('barHorizontalStacked', adapter.downgradeNg2Component(BarHorizontalStacked))
  .directive('barHorizontalNormalized', adapter.downgradeNg2Component(BarHorizontalNormalized))
  .directive('dateBar', adapter.downgradeNg2Component(DateBar))

  .directive('pieChart', adapter.downgradeNg2Component(PieChart))
  .directive('pieGrid', adapter.downgradeNg2Component(PieGrid))
  .directive('advancedPieChart', adapter.downgradeNg2Component(AdvancedPieChart))

  .directive('lineChart', adapter.downgradeNg2Component(LineChart))
  .directive('lineChart2D', adapter.downgradeNg2Component(LineChart2D))

  .directive('areaChart', adapter.downgradeNg2Component(AreaChart))
  .directive('areaChartStacked', adapter.downgradeNg2Component(AreaChartStacked))
  .directive('areaChartNormalized', adapter.downgradeNg2Component(AreaChartNormalized))

  .directive('numberCard', adapter.downgradeNg2Component(NumberCard))
  .directive('heatMap', adapter.downgradeNg2Component(HeatMap))
  .directive('treeMap', adapter.downgradeNg2Component(TreeMap))
