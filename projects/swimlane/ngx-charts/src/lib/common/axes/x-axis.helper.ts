import { Orientation } from '../types/orientation.enum';
import { TextAnchor } from '../types/text-anchor.enum';
import { getTickLines, reduceTicks } from './ticks.helper';
import { roundedRect } from '../../common/shape.helper';
import { trimLabel } from '../trim-label.helper';

export function getXAxisRotationAngle(
  ticks: any[],
  tickFormat: (o: any) => string,
  trimTicks: boolean,
  tickTrim: (label: string) => string,
  width: number,
  maxAllowedLength: number
): number {
  let angle = 0;
  let maxTicksLength = 0;
  for (let i = 0; i < ticks.length; i++) {
    const tick = tickFormat(ticks[i]).toString();
    let tickLength = tick.length;
    if (trimTicks) {
      tickLength = tickTrim(tick).length;
    }

    if (tickLength > maxTicksLength) {
      maxTicksLength = tickLength;
    }
  }

  const len = Math.min(maxTicksLength, maxAllowedLength);
  const charWidth = 7;
  const wordWidth = len * charWidth;

  let baseWidth = wordWidth;
  const maxBaseWidth = Math.floor(width / ticks.length);

  while (baseWidth > maxBaseWidth && angle > -90) {
    angle -= 30;
    baseWidth = Math.cos(angle * (Math.PI / 180)) * wordWidth;
  }
  return angle;
}

export function getXAxisTicks(scale: any, tickValues: any[], width: number): any[] {
  let ticks;
  const maxTicks = Math.floor(width / 20);
  const maxScaleTicks = Math.floor(width / 100);

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

export function getXAxisTickChunks(
  label: string,
  maxTickLength: number,
  bandwidth: number,
  rotateTicks: boolean,
  step: number,
  tickTrim: (label: string) => string,
  maxPossibleLengthForTickIfWrapped: number,
  isPlatformBrowser: boolean,
  approxHeight: number
): string[] {
  if (label.toString().length > maxTickLength && bandwidth) {
    const maxAllowedLines = 5;
    let maxLines = rotateTicks ? Math.floor(step / 14) : maxAllowedLines;

    if (maxLines <= 1) {
      return [tickTrim(label)];
    }

    let possibleStringLength = Math.max(maxPossibleLengthForTickIfWrapped, maxTickLength);

    if (!isPlatformBrowser) {
      possibleStringLength = Math.floor(
        Math.min(approxHeight / maxAllowedLines, Math.max(maxPossibleLengthForTickIfWrapped, maxTickLength))
      );
    }

    maxLines = Math.min(maxLines, maxAllowedLines);
    return getTickLines(label, possibleStringLength, maxLines < 1 ? 1 : maxLines);
  }

  return [tickTrim(label)];
}

export function setXAxisReferenceLines(referenceLines: any[], adjustedScale: any, gridLineHeight: number): any {
  const refMin = adjustedScale(
    Math.min.apply(
      null,
      referenceLines.map(item => item.value)
    )
  );
  const refMax = adjustedScale(
    Math.max.apply(
      null,
      referenceLines.map(item => item.value)
    )
  );
  const referenceLineLength = referenceLines.length;
  const referenceAreaPath = roundedRect(refMax, -gridLineHeight + 25, refMin - refMax, gridLineHeight, 0, [
    false,
    false,
    false,
    false
  ]);
  return { refMin, refMax, referenceLineLength, referenceAreaPath };
}

export function getXAxisHeight(ticksElement: any): number {
  return parseInt(ticksElement.nativeElement.getBoundingClientRect().height, 10);
}

export function updateXAxisTicks(component: any): void {
  const scale = component.scale;
  component.adjustedScale = scale.bandwidth ? d => scale(d) + scale.bandwidth() * 0.5 : scale;
  component.ticks = getXAxisTicks(scale, component.tickValues, component.width);
  component.tickSpacing = Math.max(component.innerTickSize, 0) + component.tickPadding;
  component.tickFormat =
    component.tickFormatting ||
    (scale.tickFormat
      ? scale.tickFormat(...(component.tickArguments || []))
      : d => (d.constructor.name === 'Date' ? d.toLocaleDateString() : d.toLocaleString()));
  const angle = component.rotateTicks
    ? getXAxisRotationAngle(
        component.ticks,
        component.tickFormat,
        component.trimTicks,
        component.tickTrim.bind(component),
        component.width,
        component.maxAllowedLength
      )
    : null;
  component.textTransform = angle && angle !== 0 ? `rotate(${angle})` : '';
  component.textAnchor = angle && angle !== 0 ? TextAnchor.End : TextAnchor.Middle;
  if (angle && angle !== 0) component.verticalSpacing = 10;
  if (component.isWrapTicksSupported) {
    const longestTick = component.ticks.reduce(
      (earlier, current) => (current.length > earlier.length ? current : earlier),
      ''
    );
    const tickLines = component.tickChunks(longestTick);
    const labelHeight = 14 * (tickLines.length || 1);
    component.maxPossibleLengthForTickIfWrapped = scale.bandwidth
      ? Math.max(Math.floor(scale.bandwidth() / 7), component.maxTickLength)
      : component.maxTickLength;
    component.approxHeight = Math.min(
      angle !== 0
        ? Math.max(Math.abs(Math.sin((angle * Math.PI) / 180)) * component.maxTickLength * 7, 10)
        : labelHeight,
      200
    );
  }
  if (component.showRefLines && component.referenceLines) {
    const { refMin, refMax, referenceLineLength, referenceAreaPath } = setXAxisReferenceLines(
      component.referenceLines,
      component.adjustedScale,
      component.gridLineHeight
    );
    component.refMin = refMin;
    component.refMax = refMax;
    component.referenceLineLength = referenceLineLength;
    component.referenceAreaPath = referenceAreaPath;
  }
}

export function tickTransform(tick: number, adjustedScale: any, verticalSpacing: number): string {
  return 'translate(' + adjustedScale(tick) + ',' + verticalSpacing + ')';
}

export function gridLineTransform(verticalSpacing: number): string {
  return `translate(0, ${-verticalSpacing - 5})`;
}

export function tickTrim(label: string, trimTicks: boolean, maxTickLength: number): string {
  return trimTicks ? trimLabel(label, maxTickLength) : label;
}
