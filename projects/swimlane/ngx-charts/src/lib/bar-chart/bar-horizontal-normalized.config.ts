import { LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';

export interface BarHorizontalNormalizedConfig {
  legend: boolean;
  legendTitle: string;
  legendPosition: LegendPosition;
  xAxis: boolean;
  yAxis: boolean;
  showXAxisLabel: boolean;
  showYAxisLabel: boolean;
  xAxisLabel: string;
  yAxisLabel: string;
  tooltipDisabled: boolean;
  gradient: boolean;
  showGridLines: boolean;
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
  barPadding: number;
  roundDomains: boolean;
  noBarWhenZero: boolean;
  wrapTicks: boolean;
}
