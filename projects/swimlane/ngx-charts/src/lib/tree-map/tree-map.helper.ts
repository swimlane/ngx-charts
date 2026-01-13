import { Gradient } from '../common/types/gradient.interface';
import { trimLabel } from '../common/trim-label.helper';
import { escapeLabel } from '../common/label.helper';
import { select } from 'd3-selection';
import { invertColor } from '../utils/color-utils';

export function getTreeMapCellGradientStops(fill: string): Gradient[] {
  return [
    {
      offset: 0,
      color: fill,
      opacity: 0.3
    },
    {
      offset: 100,
      color: fill,
      opacity: 1
    }
  ];
}

export function getTreeMapCellFormattedValue(value: any, valueFormatting: any): string {
  const formatting = valueFormatting || (val => val.toLocaleString());
  return formatting(value);
}

export function getTreeMapCellFormattedLabel(label: string, labelFormatting: any, data: any, value: any): string {
  const formatting = labelFormatting || (cell => escapeLabel(trimLabel(cell.label, 55)));
  return formatting({ label, data, value });
}

export function animateTreeMapCellToCurrentForm(
  node: any,
  animations: boolean,
  x: number,
  y: number,
  width: number,
  height: number
): void {
  if (animations) {
    node
      .transition()
      .duration(750)
      .attr('opacity', 1)
      .attr('x', x)
      .attr('y', y)
      .attr('width', width)
      .attr('height', height);
  } else {
    node.attr('opacity', 1).attr('x', x).attr('y', y).attr('width', width).attr('height', height);
  }
}

export function loadTreeMapCellAnimation(
  element: HTMLElement,
  x: number,
  y: number,
  animations: boolean,
  width: number,
  height: number
): void {
  const node = select(element).select('.cell');
  node.attr('opacity', 0).attr('x', x).attr('y', y);
  animateTreeMapCellToCurrentForm(node, animations, x, y, width, height);
}

export function updateTreeMapCell(component: any): void {
  if (component.initialized) {
    animateTreeMapCellToCurrentForm(
      select(component.element).select('.cell'),
      component.animations,
      component.x,
      component.y,
      component.width,
      component.height
    );
  } else {
    if (component.animations) {
      loadTreeMapCellAnimation(
        component.element,
        component.x,
        component.y,
        component.animations,
        component.width,
        component.height
      );
    }
    component.initialized = true;
  }
}

export function getTextColor(fill: string): string {
  return invertColor(fill);
}
