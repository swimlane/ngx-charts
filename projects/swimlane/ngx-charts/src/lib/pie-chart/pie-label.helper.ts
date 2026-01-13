import { arc, DefaultArcObject } from 'd3-shape';
import { DataItem } from '../models/chart-data.model';
import { TextAnchor } from '../common/types/text-anchor.enum';

export interface PieData extends DefaultArcObject {
  data: DataItem;
  index: number;
  pos: [number, number];
  value: number;
}

export function getPieLabelLine(data: PieData, radius: number, explodeSlices: boolean, max: number, value: number): string {
  let startRadius = radius;
  if (explodeSlices) {
    startRadius = (radius * value) / max;
  }

  const innerArc = arc().innerRadius(startRadius).outerRadius(startRadius);

  // Calculate innerPos then scale outer position to match label position
  const innerPos = innerArc.centroid(data as any);

  let scale = data.pos[1] / innerPos[1];
  if (data.pos[1] === 0 || innerPos[1] === 0) {
    scale = 1;
  }
  const outerPos = [scale * innerPos[0], scale * innerPos[1]];

  return `M${innerPos}L${outerPos}L${data.pos}`;
}

export function getPieLabelTransforms(
  isServer: boolean,
  animations: boolean,
  textX: number,
  textY: number
): { styleTransform: string; attrTransform: string; textTransition: string } {
  let styleTransform: string;
  let attrTransform: string;
  let textTransition: string;

  if (isServer) {
    styleTransform = `translate3d(${textX}px,${textY}px, 0)`;
    attrTransform = `translate(${textX},${textY})`;
    textTransition = !animations ? null : 'transform 0.75s';
  } else {
    const isIE = /(edge|msie|trident)/i.test(navigator.userAgent);
    styleTransform = isIE ? null : `translate3d(${textX}px,${textY}px, 0)`;
    attrTransform = !isIE ? null : `translate(${textX},${textY})`;
    textTransition = isIE || !animations ? null : 'transform 0.75s';
  }

  return { styleTransform, attrTransform, textTransition };
}

export function getPieLabelTextAnchor(data: any): TextAnchor {
  return midAngle(data) < Math.PI ? TextAnchor.Start : TextAnchor.End;
}

function midAngle(d): number {
  return d.startAngle + (d.endAngle - d.startAngle) / 2;
}
