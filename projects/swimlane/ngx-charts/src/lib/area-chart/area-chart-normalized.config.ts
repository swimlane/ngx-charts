import { LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';

export interface AreaChartNormalizedConfig {
  legend: boolean;
  legendTitle: string;
  legendPosition: LegendPosition;
  xAxis: boolean;
  yAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  timeline: boolean;
  gradient: boolean;
  showGridLines: boolean;
  curve: any;
  activeEntries: any[];
  schemeType: ScaleType;
  trimXAxisTicks: boolean;
  trimYAxisTicks: boolean;
  rotateXAxisTicks: boolean;
  maxXAxisTickLength: number;
  maxYAxisTickLength: number;
  xAxisTickFormatting: any;
  yAxisTickFormatting: any;
  xAxisTicks: any[];
  yAxisTicks: any[];
  roundDomains: boolean;
  tooltipDisabled: boolean;
  wrapTicks: boolean;
}
