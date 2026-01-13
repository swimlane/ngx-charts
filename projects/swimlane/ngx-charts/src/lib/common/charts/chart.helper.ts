import { LegendOptions, LegendType, LegendPosition } from '../types/legend.model';
import { ScaleType } from '../types/scale-type.enum';

export function getLegendType(legendOptions: LegendOptions): LegendType {
  return legendOptions.scaleType === ScaleType.Linear ? LegendType.ScaleLegend : LegendType.Legend;
}

export function calculateViewDimensions(
  view: [number, number],
  showLegend: boolean,
  legendOptions: LegendOptions,
  providedLegendType: LegendType
): { chartWidth: number; legendWidth: number; legendType: LegendType } {
  let legendType = providedLegendType;
  let legendColumns = 0;

  if (showLegend) {
    legendType = getLegendType(legendOptions);

    if (!legendOptions || legendOptions.position === LegendPosition.Right) {
      if (legendType === LegendType.ScaleLegend) {
        legendColumns = 1;
      } else {
        legendColumns = 2;
      }
    }
  }

  const chartColumns = 12 - legendColumns;
  const chartWidth = Math.floor((view[0] * chartColumns) / 12.0);
  const legendWidth =
    !legendOptions || legendOptions.position === LegendPosition.Right
      ? Math.floor((view[0] * legendColumns) / 12.0)
      : chartWidth;

  return { chartWidth, legendWidth, legendType };
}
