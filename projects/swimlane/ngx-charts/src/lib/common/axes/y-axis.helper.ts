import { getTickLines, reduceTicks } from './ticks.helper';
import { Orientation } from '../types/orientation.enum';
import { TextAnchor } from '../types/text-anchor.enum';
import { roundedRect } from '../../common/shape.helper';
import { trimLabel } from '../trim-label.helper';

export function getYAxisTicks(scale: any, tickValues: any[], height: number): any[] {
  let ticks;
  const maxTicks = Math.floor(height / 20);
  const maxScaleTicks = Math.floor(height / 50);

  if (tickValues) {
    ticks = tickValues;
  } else if (scale.ticks) {
    ticks = scale.ticks.apply(scale, [maxScaleTicks]);
  } else {
    ticks = scale.domain();
    ticks = reduceTicks(ticks, maxTicks);
  }

  return ticks;
}

export function getYAxisApproximateWidth(
  ticks: any[],
  tickTrim: (label: string) => string,
  tickFormat: (o: any) => string
): number {
  if (ticks.length === 0) return 0;
  const maxChars = Math.max(...ticks.map(t => tickTrim(tickFormat(t)).length));
  const charWidth = 7;
  return maxChars * charWidth;
}

export function getYAxisTickChunks(
  label: string,
  maxTickLength: number,
  bandwidth: number,
  tickTrim: (label: string) => string,
  tickFormat: (o: any) => string
): string[] {
  if (label.toString().length > maxTickLength && bandwidth) {
    const preferredWidth = maxTickLength;
    const maxLines = Math.floor(bandwidth / 15);

    if (maxLines <= 1) {
      return [tickTrim(label)];
    }

    return getTickLines(label, preferredWidth, Math.min(maxLines, 5));
  }

  return [tickFormat(label)];
}

export function updateYAxisTicks(component: any): void {
  const scale = component.scale;
  const sign = component.orient === Orientation.Top || component.orient === Orientation.Right ? -1 : 1;
  component.tickSpacing = Math.max(component.innerTickSize, 0) + component.tickPadding;
  component.ticks = getYAxisTicks(scale, component.tickValues, component.height);
  component.tickFormat =
    component.tickFormatting ||
    (scale.tickFormat
      ? scale.tickFormat(...(component.tickArguments || []))
      : d => (d.constructor.name === 'Date' ? d.toLocaleDateString() : d.toLocaleString()));
  component.adjustedScale = scale.bandwidth
    ? d => {
        const positionMiddle = scale(d) + scale.bandwidth() * 0.5;
        if (component.wrapTicks && d.toString().length > component.maxTickLength) {
          const chunksLength = component.tickChunks(d).length;
          if (chunksLength === 1) return positionMiddle;
          const bandWidth = scale.bandwidth();
          const heightOfLines = chunksLength * 8;
          const availableFreeSpace = bandWidth * 0.5 - heightOfLines * 0.5;
          return scale(d) + availableFreeSpace;
        }
        return positionMiddle;
      }
    : scale;
  if (component.showRefLines && component.referenceLines) {
    component.refMin = component.adjustedScale(
      Math.min.apply(
        null,
        component.referenceLines.map(item => item.value)
      )
    );
    component.refMax = component.adjustedScale(
      Math.max.apply(
        null,
        component.referenceLines.map(item => item.value)
      )
    );
    component.referenceLineLength = component.referenceLines.length;
    component.referenceAreaPath = roundedRect(
      0,
      component.refMax,
      component.gridLineWidth,
      component.refMin - component.refMax,
      0,
      [false, false, false, false]
    );
  }
  switch (component.orient) {
    case Orientation.Top:
    case Orientation.Bottom:
      component.transform = tick => 'translate(' + component.adjustedScale(tick) + ',0)';
      component.textAnchor = TextAnchor.Middle;
      component.y2 = component.innerTickSize * sign;
      component.y1 = component.tickSpacing * sign;
      component.dy = sign < 0 ? '0em' : '.71em';
      break;
    case Orientation.Left:
      component.transform = tick => 'translate(0,' + component.adjustedScale(tick) + ')';
      component.textAnchor = TextAnchor.End;
      component.x2 = component.innerTickSize * -sign;
      component.x1 = component.tickSpacing * -sign;
      component.dy = '.32em';
      break;
    case Orientation.Right:
      component.transform = tick => 'translate(0,' + component.adjustedScale(tick) + ')';
      component.textAnchor = TextAnchor.Start;
      component.x2 = component.innerTickSize * -sign;
      component.x1 = component.tickSpacing * -sign;
      component.dy = '.32em';
      break;
  }
}

export function gridLineTransform(): string {
  return `translate(5,0)`;
}

export function tickTrim(label: string, trimTicks: boolean, maxTickLength: number): string {
  return trimTicks ? trimLabel(label, maxTickLength) : label;
}
