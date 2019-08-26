import { IVector2D } from './coordinates.model';

export interface DataItem {
  name: string | number | Date;
  value: string | number | Date;
  extra?: any;
  min?: number;
  max?: number;
  label?: string;
}

export interface SingleSeries extends Array<DataItem> {}

export interface Series {
  name: string | number | Date;
  series: DataItem[];
}

export interface MultiSeries extends Array<Series> {}

export interface BubbleChartDataItem {
  name: string | number | Date;
  x: string | number | Date;
  y: string | number | Date;
  r: number;
  extra?: any;
}

export interface BubbleChartSeries {
  name: string | number | Date;
  series: BubbleChartDataItem[];
}

export interface BubbleChartMultiSeries extends Array<BubbleChartSeries> {}

export interface TreeMapDataItem {
  name: string | number | Date;
  size?: number;
  children?: TreeMapDataItem[];
  extra?: any;
}

export interface TreeMapData extends Array<TreeMapDataItem> {}

export interface BoxChartDataItem extends DataItem {
  value: number | Date;
}

export interface BoxChartSeries {
  name: string | number | Date;
  series: BoxChartDataItem[];
}

export interface BoxChartMultiSeries extends Array<BoxChartSeries> {}

export interface IBoxModel {
  value: number | Date;
  label: string | number | Date;
  data: BoxChartDataItem[];
  formattedLabel: string;
  height: number;
  width: number;
  x: number;
  y: number;
  horizontalLines: IVector2D[];
  lineCoordinates: number[];
  quartiles: number[];
  tooltipText?: string;
  ariaLabel?: string;
  color?: string;
}
