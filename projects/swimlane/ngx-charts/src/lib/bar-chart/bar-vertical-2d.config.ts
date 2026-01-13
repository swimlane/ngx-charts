import { LegendPosition } from '../common/types/legend.model';
import { ScaleType } from '../common/types/scale-type.enum';

export interface BarVertical2DConfig {
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
  scaleType: ScaleType;
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
  groupPadding: number;
  barPadding: number;
  roundDomains: boolean;
  roundEdges: boolean;
  yScaleMax: number;
  showDataLabel: boolean;
  dataLabelFormatting: any;
  noBarWhenZero: boolean;
  wrapTicks: boolean;
}
