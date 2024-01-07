import {
  Component,
  Input,
  ViewEncapsulation,
  ChangeDetectionStrategy,
  ContentChild,
  TemplateRef,
  Output,
  EventEmitter
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
            stroke-opacity="0.5"
            fill="none"
            (click)="select.emit(link.data)"
            (mouseenter)="activate.emit(link.data)"
          ></svg:path>
        </svg:g>

        <svg:g *ngFor="let rect of nodeRects" [attr.transform]="rect.transform" class="node">
          <svg:rect
            [attr.x]="0"
            [attr.y]="0"
            [attr.width]="rect.width"
            [attr.height]="rect.height"
            [attr.fill]="rect.fill"
            ngx-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipType]="styleTypes.tooltip"
            [tooltipPlacement]="'top'"
            [tooltipTitle]="tooltipTemplate ? undefined : rect.tooltip"
            [tooltipTemplate]="tooltipTemplate"
            [tooltipContext]="rect.data"
            (click)="select.emit(rect.data)"
            (mouseenter)="activate.emit(rect.data)"
          ></svg:rect>
        </svg:g>

        <svg:g *ngFor="let rect of nodeRects" [attr.transform]="rect.transform">
          <svg:text
            *ngIf="showLabels && rect.height > 15"
            class="label"
            [attr.x]="rect.width + 5"
            [attr.y]="rect.height / 2"
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
  encapsulation: ViewEncapsulation.None
})
export class SankeyComponent extends BaseChartComponent {
  @Input() showLabels: boolean = true;
  @Input() gradient: boolean;
  @Input() tooltipDisabled: boolean = false;
  @Input() activeEntries: any[] = [];
  @Input() labelFormatting: any;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

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
    this.colors = new ColorHelper(this.scheme, this.scaleType, this.valueDomain);
  }

  getValueDomain(nodes): any[] {
    return nodes.map(n => n.name);
  }
}
