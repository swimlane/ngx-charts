import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter,
  ViewChildren,
  QueryList,
  ElementRef
} from '@angular/core';
import { sankey, sankeyLeft, sankeyLinkHorizontal } from 'd3-sankey';

import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions } from '../common/view-dimensions.helper';
import { ColorHelper } from '../common/color.helper';
import { ViewDimensions } from '../common/types/view-dimension.interface';
import { ScaleType } from '../common/types/scale-type.enum';
import { StyleTypes } from '../common/tooltip/style.type';
import { escapeLabel } from '../common/label.helper';
import { id } from '../utils/id';
import { TextAnchor } from '../common/types/text-anchor.enum';
import { trimLabel } from '../common/trim-label.helper';

interface RectItem {
  fill: string;
  height: number;
  rx: number;
  width: number;
  x: number;
  y: number;
  label: string;
  labelAnchor: string;
  tooltip: string;
  transform: string;
  data: any;
  originalLabel: string;
  node?: any;
  active?: boolean;
}

@Component({
  selector: 'ngx-charts-sankey',
  template: `
    <ngx-charts-chart [view]="[width, height]" [animations]="animations">
      <svg:g [attr.transform]="transform" class="sankey chart">
        <svg:g
          *ngFor="let link of linkPaths"
          class="link"
          ngx-tooltip
          [tooltipDisabled]="tooltipDisabled"
          [tooltipType]="styleTypes.tooltip"
          [tooltipPlacement]="'top'"
          [tooltipTitle]="tooltipTemplate ? undefined : link.tooltip"
          [tooltipTemplate]="tooltipTemplate"
          [tooltipContext]="link.data"
        >
          <svg:defs>
            <svg:linearGradient
              [attr.id]="link.id"
              gradientUnits="userSpaceOnUse"
              [attr.x1]="link.source.x1"
              [attr.x2]="link.target.x0"
            >
              <svg:stop offset="0%" [attr.stop-color]="link.startColor"></svg:stop>
              <svg:stop offset="100%" [attr.stop-color]="link.endColor"></svg:stop>
            </svg:linearGradient>
          </svg:defs>
          <svg:path
            [attr.d]="link.path"
            [attr.stroke]="link.gradientFill"
            [attr.stroke-width]="link.strokeWidth"
            [attr.stroke-opacity]="link.active ? 0.5 : hasActive ? 0.1 : 0.5"
            fill="none"
            (click)="select.emit(link.data)"
            (mouseenter)="activateLink(link)"
            (mouseleave)="deactivateLink(link)"
          ></svg:path>
        </svg:g>

        <svg:g *ngFor="let rect of nodeRects" [attr.transform]="rect.transform" class="node">
          <svg:rect
            [attr.x]="0"
            [attr.y]="0"
            [attr.width]="rect.width"
            [attr.height]="rect.height"
            [attr.fill]="rect.fill"
            [attr.fill-opacity]="rect.active ? 1 : hasActive ? 0.3 : 1"
            ngx-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipType]="styleTypes.tooltip"
            [tooltipPlacement]="'top'"
            [tooltipTitle]="tooltipTemplate ? undefined : rect.tooltip"
            [tooltipTemplate]="tooltipTemplate"
            [tooltipContext]="rect.data"
            (click)="select.emit(rect.data)"
            (mouseenter)="activateRect(rect)"
            (mouseleave)="deactivateRect(rect)"
          ></svg:rect>
        </svg:g>

        <svg:g *ngFor="let rect of nodeRects" [attr.transform]="rect.transform">
          <svg:text
            #labelElement
            *ngIf="showLabels && rect.height > 15"
            class="label"
            [attr.x]="rect.width + 5"
            [attr.y]="rect.height / 2"
            [attr.fill-opacity]="rect.active ? 1 : hasActive ? 0.3 : 1"
            [attr.text-anchor]="rect.labelAnchor"
            dy="0.35em"
            [attr.dx]="rect.labelAnchor === 'end' ? -25 : 0"
          >
            {{ rect.label }}
          </svg:text>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styleUrls: ['../common/base-chart.component.scss'],
  encapsulation: ViewEncapsulation.None,
  standalone: false
})
export class SankeyComponent extends BaseChartComponent {
  @Input() showLabels: boolean = true;
  @Input() gradient: boolean;
  @Input() tooltipDisabled: boolean = false;
  @Input() activeEntries: any[] = [];
  @Input() labelFormatting: any;
  @Input() truncateLabels: boolean = true;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ViewChildren('labelElement') labelElements: QueryList<ElementRef<SVGTextElement>>;
  @ContentChild('tooltipTemplate') tooltipTemplate: TemplateRef<any>;

  dims: ViewDimensions;
  colors: ColorHelper;
  colorScale: any;
  transform: string;
  margin: number[] = [10, 10, 10, 10];
  scaleType: ScaleType = ScaleType.Ordinal;
  valueDomain: any[];
  styleTypes = StyleTypes;

  nodeRects: RectItem[];
  linkPaths: any[];
  nodeLayerMap: Map<number, any[]>;
  labelWidthMap: Map<string, number>;
  chartHasActive: boolean = false;

  ngOnChanges(): void {
    this.update();
  }

  update(): void {
    super.update();

    this.dims = calculateViewDimensions({
      width: this.width,
      height: this.height,
      margins: this.margin,
      legendType: this.scaleType as any
    });

    const linkDefs = this.results;
    const nodeDefs = Array.from(new Set(linkDefs.flatMap(l => [l.source, l.target])), (name: string) => ({
      name,
      value: linkDefs.filter(l => l.source === name).reduce((acc, l) => acc + l.value, 0)
    }));

    // Configure generator
    const sankeyGenerator = sankey()
      .nodeId(d => d.name)
      .nodeAlign(sankeyLeft)
      .nodeWidth(15)
      .nodePadding(10)
      .extent([
        [1, 5],
        [this.dims.width - 1, this.dims.height - 5]
      ]);

    // Generate links and nodes
    const data = sankeyGenerator({
      nodes: nodeDefs.map(d => Object.assign({}, d)),
      links: linkDefs.map(d => Object.assign({}, d))
    });

    this.valueDomain = this.getValueDomain(data.nodes);
    this.setColors();

    this.nodeRects = data.nodes.map(node => {
      const rect: RectItem = {
        x: node.x0,
        y: node.y0,
        height: node.y1 - node.y0,
        width: node.x1 - node.x0,
        fill: this.colors.getColor(node.name),
        tooltip: this.getNodeTooltipText(node),
        rx: 5,
        data: {
          name: node.name,
          value: node.value
        },
        transform: '',
        label: this.labelFormatting ? this.labelFormatting(node.name) : node.name,
        originalLabel: node.name,
        node: node,
        labelAnchor: TextAnchor.Start
      };
      rect.labelAnchor = this.getTextAnchor(node);
      rect.transform = `translate(${rect.x},${rect.y})`;
      return rect;
    });

    this.linkPaths = data.links.map(link => {
      const gradientId = 'mask' + id().toString();
      const linkPath = {
        path: sankeyLinkHorizontal()(link),
        strokeWidth: Math.max(1, link.width),
        tooltip: this.getLinkTooltipText(link.source, link.target, link.value),
        id: gradientId,
        gradientFill: `url(#${gradientId})`,
        source: link.source,
        target: link.target,
        startColor: this.colors.getColor(link.source.name),
        endColor: this.colors.getColor(link.target.name),
        data: {
          source: link.source.name,
          target: link.target.name,
          value: link.value
        }
      };
      return linkPath;
    });

    this.nodeLayerMap = this.getNodeLayerMap(data.nodes);
    if (this.truncateLabels) {
      this.truncateLabelsBasedOnAdjacentNodes();
      this.fixOverlappingLabels();
    }
    this.transform = `translate(${this.dims.xOffset} , ${this.margin[0]})`;
  }

  getNodeTooltipText(node): string {
    return `
      <span class="tooltip-label">${escapeLabel(node.name)}</span>
      <span class="tooltip-val">${node.value.toLocaleString()}</span>
    `;
  }

  getLinkTooltipText(sourceNode, targetNode, value: number): string {
    return `
      <span class="tooltip-label">${escapeLabel(sourceNode.name)} • ${escapeLabel(targetNode.name)}</span>
      <span class="tooltip-val">${value.toLocaleString()} (${(value / sourceNode.value).toLocaleString(undefined, {
      style: 'percent',
      maximumFractionDigits: 2
    })})</span>
    `;
  }

  getTextAnchor(node): TextAnchor {
    if (node.layer === 0) {
      return TextAnchor.Start;
    } else {
      return TextAnchor.End;
    }
  }

  onClick(data): void {
    this.select.emit(data);
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain, this.customColors);
  }

  getValueDomain(nodes): any[] {
    return nodes.map(n => n.name);
  }

  activateLink(link) {
    this.linkPaths.forEach(l => {
      l.active = false;
    });

    this.nodeRects.forEach(r => {
      if (r.data.name === link.source.name || r.data.name === link.target.name) {
        r.active = true;
      } else {
        r.active = false;
      }
    });

    link.active = true;

    this.activate.emit(link.data);
  }

  deactivateLink(link) {
    link.active = false;

    this.nodeRects.forEach(r => {
      r.active = false;
    });

    this.deactivate.emit(link.data);
  }

  activateRect(rect) {
    const links = this.linkPaths.filter(l => l.source.name === rect.data.name || l.target.name === rect.data.name);

    this.nodeRects.forEach(r => {
      if (links.some(l => l.source.name === r.data.name || l.target.name === r.data.name)) {
        r.active = true;
      } else {
        r.active = false;
      }
    });

    this.linkPaths.forEach(l => {
      if (l.source.name === rect.data.name || l.target.name === rect.data.name) {
        l.active = true;
      } else {
        l.active = false;
      }
    });

    this.activate.emit(rect.data);
  }

  deactivateRect(rect) {
    this.nodeRects.forEach(r => {
      r.active = false;
    });

    this.linkPaths.forEach(l => {
      l.active = false;
    });

    this.deactivate.emit(rect.data);
  }

  get hasActive(): boolean {
    return this.linkPaths.some(l => l.active) || this.nodeRects.some(r => r.active);
  }

  /** Truncate labels to prevent overflow outside the chart */
  truncateLabelsBasedOnAdjacentNodes(): void {
    this.nodeRects.forEach(rect => {
      // Currently we dont display labels for nodes with height less than 15
      if (rect.height <= 15 || !rect.node) {
        return;
      }
      const availableWidth = this.calculateAvailableSpaceForLabel(rect);

      if (availableWidth > 0) {
        const charWidth = 6;
        const maxChars = Math.floor(availableWidth / charWidth);
        const truncatedLabel = trimLabel(rect.originalLabel, maxChars);
        rect.label = this.labelFormatting ? this.labelFormatting(truncatedLabel) : truncatedLabel;
      }
    });
  }

  calculateAvailableSpaceForLabel(rect: RectItem): number {
    const node = rect.node;
    const labelMargin = 10; // Margin between label and adjacent nodes
    const labelOffset = 5; // using in template [attr.x]="rect.width + 5"
    const rightSideExtraOffset = 15; // from [attr.dx]

    // Checking if the node is on left side or right side to label
    const isLeftSideNode = rect.labelAnchor === TextAnchor.Start;

    // Get corresponding nodes from adjacent layer
    const adjacentNodes = this.getAdjacentLayerNodes(node, isLeftSideNode);

    // Find nodes that vertically overlap with this node's label area
    const labelCenterY = rect.y + rect.height / 2;
    const labelHeight = 14;
    const labelTop = labelCenterY - labelHeight / 2;
    const labelBottom = labelCenterY + labelHeight / 2;

    let minDistance = Infinity;

    adjacentNodes.forEach(adjNode => {
      if (adjNode.y0 < labelBottom && adjNode.y1 > labelTop) {
        let distance: number;
        if (isLeftSideNode) {
          // Label starts at node.x1 + labelOffset and extends to the right
          const labelStart = rect.x + rect.width + labelOffset;
          distance = adjNode.x0 - labelStart - labelMargin;
        } else {
          // For right-side labels, text-anchor="end" means text extends left from the anchor point
          // The anchor is at node.x0 - rightSideExtraOffset
          const labelStart = rect.x - rightSideExtraOffset;
          distance = labelStart - adjNode.x1 - labelMargin;
        }

        minDistance = Math.min(minDistance, distance);
      }
    });

    // If no adjacent nodes found, use distance to chart edge
    if (minDistance === Infinity) {
      const chartPadding = 20; // Padding from chart edges
      if (isLeftSideNode) {
        // Check distance to right edge of chart
        const labelStart = rect.x + rect.width + labelOffset;
        minDistance = this.dims.width - labelStart - chartPadding;
      } else {
        // Check distance to left edge of chart
        const labelAnchor = rect.x - rightSideExtraOffset;
        minDistance = labelAnchor - chartPadding;
      }
    }

    return Math.max(minDistance, 20); // At least 20px for label
  }

  getAdjacentLayerNodes(node: any, isLeftSideNode: boolean): any[] {
    const currentLayer = node.layer;

    // Determine which layer to check based on label position
    const targetLayer = isLeftSideNode ? currentLayer + 1 : currentLayer - 1;

    // Filter nodes in the target layer
    const adjacentNodes = this.nodeLayerMap.get(targetLayer);
    // If no nodes in adjacent layer, try the next layer
    if (adjacentNodes.length === 0) {
      const nextLayer = isLeftSideNode ? currentLayer + 2 : currentLayer - 2;
      return this.nodeLayerMap.get(nextLayer);
    }

    return adjacentNodes;
  }

  getNodeLayerMap(nodes: any[]): Map<number, any[]> {
    const nodeLayerMap = new Map<number, any[]>();
    nodes.forEach(node => {
      if (!nodeLayerMap.has(node.layer)) {
        nodeLayerMap.set(node.layer, []);
      }
      nodeLayerMap.get(node.layer).push(node);
    });
    return nodeLayerMap;
  }

  /** handle label overlapping between nodes on layer1 and layer2 */
  fixOverlappingLabels() {
    const firstLayerRects = this.nodeRects.filter(r => r.node && r.node.layer === 0);
    const secondLayerRects = this.nodeRects.filter(r => r.node && r.node.layer === 1);

    firstLayerRects.forEach(rect1 => {
      secondLayerRects.forEach(rect2 => {
        if (
          Math.abs(rect1.y + rect1.height / 2 - (rect2.y + rect2.height / 2)) < 14 &&
          rect1.height > 15 &&
          rect2.height > 15
        ) {
          let width = rect2.x - (rect1.x + rect1.width);
          width /= 2;
          const charsToFit = Math.floor(width / 7);
          rect2.label = trimLabel(rect2.originalLabel, charsToFit);
          rect1.label = trimLabel(rect1.originalLabel, charsToFit);
        }
      });
    });
  }
}
