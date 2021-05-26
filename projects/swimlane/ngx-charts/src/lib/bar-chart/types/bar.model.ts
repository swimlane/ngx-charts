import { DataItem } from '../../models/chart-data.model';

export interface Bar {
  ariaLabel: string;
  color: string;
  data: DataItem;
  formattedLabel: string;
  height: number;
  label: string;
  roundedEdges: boolean;
  tooltipText: string;
  value: number;
  width: number;
  x: number;
  y: number;
}
