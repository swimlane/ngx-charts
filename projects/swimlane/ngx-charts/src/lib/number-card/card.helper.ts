import { calculateTextWidth } from '../utils/calculate-width';
import { VERDANA_FONT_WIDTHS_16_PX } from '../common/constants/font-widths';

export function calculateCardTextPadding(
  cardWidth: number,
  cardHeight: number,
  textFontSize: number,
  labelFontSize: number
): number[] {
  const paddingX = cardWidth / 8;
  const paddingY = cardHeight / 2;
  return [paddingY - textFontSize - labelFontSize / 2, paddingX, paddingY - labelFontSize, paddingX];
}

export function getCardScaleText(
  width: number,
  height: number,
  cardWidth: number,
  cardHeight: number,
  textFontSize: number
): { textFontSize: number; labelFontSize: number } {
  const textPadding = cardWidth / 8;
  const availableWidth = cardWidth - 2 * textPadding;
  const availableHeight = cardHeight / 3;

  const resizeScale = Math.min(availableWidth / width, availableHeight / height);
  const newTextFontSize = Math.floor(textFontSize * resizeScale);
  const newLabelFontSize = Math.min(newTextFontSize, 15);
  return { textFontSize: newTextFontSize, labelFontSize: newLabelFontSize };
}

export function scaleCardTextSSR(
  value: string,
  cardWidth: number,
  cardHeight: number,
  textFontSize: number
): { textFontSize: number; labelFontSize: number } {
  const width = calculateTextWidth(VERDANA_FONT_WIDTHS_16_PX, value, 10);
  const height = 18;
  return getCardScaleText(width, height, cardWidth, cardHeight, textFontSize);
}

export function paddedValue(value: string, medianSize: number): string {
  if (medianSize && medianSize > value.length) {
    value += '\u2007'.repeat(medianSize - value.length);
  }
  return value;
}
