import { PieGridDataItem } from "./chart-data.model";

export interface PieArc {
  animate: boolean;
  class: string;
  data: PieGridDataItem;
  endAngle: number;
  fill: string;
  pointerEvents: boolean;
  startAngle: number;
}