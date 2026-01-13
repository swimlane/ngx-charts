import { formatLabel } from '../label.helper';
import { ColorHelper } from '../color.helper';

export interface LegendEntry {
  color: string;
  formattedLabel: string;
  label: string;
}

export function getLegendEntries(data: string[], colors: ColorHelper): LegendEntry[] {
  const items: LegendEntry[] = [];
  for (const label of data) {
    const formattedLabel = formatLabel(label);

    const idx = items.findIndex(i => {
      return i.label === formattedLabel;
    });

    if (idx === -1) {
      items.push({
        label,
        formattedLabel,
        color: colors.getColor(label)
      });
    }
  }

  return items;
}

export function areActiveEntriesEqual(prev: any[], curr: any[]): boolean {
  if (prev === curr) return true;
  if (!prev || !curr) return false;
  if (prev.length !== curr.length) return false;
  if (prev.length === 0 && curr.length === 0) return true;
  return prev.every((v, i) => v === curr[i]);
}
