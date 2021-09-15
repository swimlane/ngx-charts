import { DataItem } from '../../models/chart-data.model';
import { Gradient } from '../../common/types/gradient.interface';

export interface Bar {
  ariaLabel: string;
  color: string;
  data: DataItem;
  formattedLabel: string;
  gradientStops: Gradient[];
  height: number;
  label: string;
  roundEdges: boolean;
  tooltipText: string;
  value: number;
  width: number;
  x: number;
  y: number;
}
