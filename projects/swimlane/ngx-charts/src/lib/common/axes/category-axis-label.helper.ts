import { maxCharsForPixelWidth, trimLabel } from '../trim-label.helper';

/** Must stay in sync with y-axis.component padding and calculateViewDimensions y-axis spacer. */
export const CATEGORY_AXIS_Y_PADDING = 5;
export const CATEGORY_AXIS_VIEW_DIMS_SPACER = 10;
export const CATEGORY_AXIS_INNER_TICK_SIZE = 6;
export const CATEGORY_AXIS_TICK_PADDING = 3;
export const CATEGORY_AXIS_LAYOUT_INSET =
  CATEGORY_AXIS_Y_PADDING + CATEGORY_AXIS_INNER_TICK_SIZE + CATEGORY_AXIS_TICK_PADDING - CATEGORY_AXIS_VIEW_DIMS_SPACER;
export const CATEGORY_AXIS_TRIM_CHAR_WIDTH = 7;
/** Hard display cap per line (including ellipsis), matching SSR/print clip budget. */
export const CATEGORY_AXIS_MAX_LINE_CHARS = 23;
/** trimLabel content budget so content + '...' fits in CATEGORY_AXIS_MAX_LINE_CHARS. */
export const CATEGORY_AXIS_MAX_CONTENT_CHARS = CATEGORY_AXIS_MAX_LINE_CHARS - 3;
export const DEFAULT_CATEGORY_WRAP_MAX_LINES = 2;

export function requiredCategoryAxisWidth(textWidth: number): number {
  return Math.max(0, textWidth + CATEGORY_AXIS_LAYOUT_INSET);
}

export const CATEGORY_AXIS_MAX_WIDTH = requiredCategoryAxisWidth(
  CATEGORY_AXIS_MAX_LINE_CHARS * CATEGORY_AXIS_TRIM_CHAR_WIDTH
);

export function charsPerLine(yAxisWidth: number, charWidth: number = CATEGORY_AXIS_TRIM_CHAR_WIDTH): number {
  if (yAxisWidth <= 0) {
    return 0;
  }
  return Math.min(
    CATEGORY_AXIS_MAX_LINE_CHARS,
    maxCharsForPixelWidth(yAxisWidth - CATEGORY_AXIS_LAYOUT_INSET, charWidth)
  );
}

export function displayWidthForLines(lines: string[], charWidth: number = CATEGORY_AXIS_TRIM_CHAR_WIDTH): number {
  if (!lines?.length) {
    return 0;
  }
  const maxChars = Math.max(0, ...lines.map(line => Math.min(line.length, CATEGORY_AXIS_MAX_LINE_CHARS)));
  return maxChars * charWidth;
}

export function cappedCharsPerLine(pixelOrLayoutLimit: number): number {
  if (pixelOrLayoutLimit <= 0) {
    return 0;
  }
  return Math.min(CATEGORY_AXIS_MAX_LINE_CHARS, pixelOrLayoutLimit);
}

/** Content chars for trimLabel so the rendered string (with ...) stays within displayLimit. */
export function contentCharsForDisplayLimit(displayLimit: number): number {
  if (displayLimit <= 0) {
    return 0;
  }
  return Math.min(CATEGORY_AXIS_MAX_CONTENT_CHARS, Math.max(0, displayLimit - 3));
}

export function effectiveCharsPerLine(yAxisWidth: number, trimTicks: boolean = true, label?: string): number {
  const slots = charsPerLine(yAxisWidth);
  if (!trimTicks || slots <= 0) {
    return slots;
  }
  if (label === undefined) {
    return slots;
  }
  const labelLength = String(label).trim().length;
  return labelLength > slots ? contentCharsForDisplayLimit(slots) : slots;
}

/** Greedy word-wrap for category y-axis labels; ellipsis only on the final line. */
export function wrapCategoryLabel(
  label: string,
  charsPerLineLimit: number,
  maxLines: number,
  trimTicks: boolean = true
): string[] {
  const text = String(label ?? '').trim();
  const displayLimit = cappedCharsPerLine(charsPerLineLimit);
  const contentLimit = contentCharsForDisplayLimit(displayLimit);

  if (!text) {
    return [''];
  }
  if (!trimTicks || displayLimit <= 0 || maxLines <= 0) {
    return [text];
  }
  if (maxLines === 1 || text.length <= displayLimit) {
    return text.length <= displayLimit ? [text] : [trimLabel(text, contentLimit)];
  }

  const words = text.split(/\s+/).filter(Boolean);
  const lines: string[] = [];
  let currentLine = '';

  const pushLine = (line: string) => {
    if (line) {
      lines.push(line);
    }
  };

  const trimRemaining = (remainingWords: string[]): string[] => {
    // If we already filled maxLines, fold the last packed line into the truncated remainder.
    const overflowStart = lines.length >= maxLines ? maxLines - 1 : lines.length;
    const kept = lines.slice(0, overflowStart);
    const remainder = [...lines.slice(overflowStart), currentLine, ...remainingWords].filter(Boolean).join(' ').trim();
    kept.push(trimLabel(remainder, contentLimit));
    return kept;
  };

  for (let i = 0; i < words.length; i++) {
    const word = words[i];

    if (word.length > displayLimit) {
      pushLine(currentLine);
      currentLine = '';
      if (lines.length >= maxLines || lines.length === maxLines - 1) {
        return trimRemaining(words.slice(i));
      }
      lines.push(trimLabel(word, contentLimit));
      continue;
    }

    const candidate = currentLine ? `${currentLine} ${word}` : word;
    if (candidate.length <= displayLimit) {
      currentLine = candidate;
      continue;
    }

    pushLine(currentLine);
    currentLine = word;

    if (lines.length >= maxLines) {
      return trimRemaining(words.slice(i + 1));
    }
  }

  pushLine(currentLine);

  if (lines.length > maxLines) {
    const kept = lines.slice(0, maxLines - 1);
    const remainder = lines.slice(maxLines - 1).join(' ');
    kept.push(trimLabel(remainder, contentLimit));
    return kept;
  }

  return lines;
}

export function displayLinesForLabel(
  label: string,
  yAxisWidth: number,
  trimTicks: boolean,
  wrapTicks: boolean,
  maxLines: number = DEFAULT_CATEGORY_WRAP_MAX_LINES
): string[] {
  const text = String(label).trim();
  if (!trimTicks) {
    return [text];
  }
  const limit = charsPerLine(yAxisWidth);
  if (limit <= 0) {
    return [trimLabel(text, CATEGORY_AXIS_MAX_CONTENT_CHARS)];
  }
  if (!wrapTicks || !/\s/.test(text)) {
    const contentMax = effectiveCharsPerLine(yAxisWidth, trimTicks, text);
    return text.length <= contentMax ? [text] : [trimLabel(text, contentMax)];
  }
  const wrapped = wrapCategoryLabel(text, limit, Math.min(maxLines, DEFAULT_CATEGORY_WRAP_MAX_LINES), trimTicks);
  return wrapped.length ? wrapped : [text];
}

export function resolveCategoryAxisLayout(
  labels: string[],
  trimTicks: boolean = true,
  wrapTicks: boolean = true,
  maxLines: number = DEFAULT_CATEGORY_WRAP_MAX_LINES,
  initialYAxisWidth: number = 0
): { yAxisWidth: number; charsPerLine: number } {
  if (!labels?.length) {
    return { yAxisWidth: 0, charsPerLine: 0 };
  }

  const wrapLineLimit = Math.min(maxLines, DEFAULT_CATEGORY_WRAP_MAX_LINES);

  let yAxisWidth =
    initialYAxisWidth > 0
      ? Math.min(initialYAxisWidth, CATEGORY_AXIS_MAX_WIDTH)
      : requiredCategoryAxisWidth(
          Math.max(
            0,
            ...labels.map(label => {
              const text = String(label).trim();
              if (!trimTicks) {
                return Math.min(text.length, CATEGORY_AXIS_MAX_LINE_CHARS) * CATEGORY_AXIS_TRIM_CHAR_WIDTH;
              }
              const displayChars =
                text.length <= CATEGORY_AXIS_MAX_LINE_CHARS ? text.length : CATEGORY_AXIS_MAX_LINE_CHARS;
              return displayChars * CATEGORY_AXIS_TRIM_CHAR_WIDTH;
            })
          )
        );

  yAxisWidth = Math.min(yAxisWidth, CATEGORY_AXIS_MAX_WIDTH);

  for (let i = 0; i < 5; i++) {
    let maxTextWidth = 0;
    for (const label of labels) {
      const lines = displayLinesForLabel(label, yAxisWidth, trimTicks, wrapTicks, wrapLineLimit);
      maxTextWidth = Math.max(maxTextWidth, displayWidthForLines(lines));
    }
    const nextYAxisWidth = Math.min(requiredCategoryAxisWidth(maxTextWidth), CATEGORY_AXIS_MAX_WIDTH);
    if (nextYAxisWidth === yAxisWidth) {
      break;
    }
    yAxisWidth = nextYAxisWidth;
  }

  return { yAxisWidth, charsPerLine: charsPerLine(yAxisWidth) };
}

/** Left edge of longest tick label given layout inputs (horizontal left y-axis). */
export function categoryLabelLeftFromLayout(marginsLeft: number, yAxisWidth: number, textWidth: number): number {
  const tickOffset = CATEGORY_AXIS_Y_PADDING + CATEGORY_AXIS_INNER_TICK_SIZE + CATEGORY_AXIS_TICK_PADDING;
  return marginsLeft + yAxisWidth + CATEGORY_AXIS_VIEW_DIMS_SPACER - tickOffset - textWidth;
}
