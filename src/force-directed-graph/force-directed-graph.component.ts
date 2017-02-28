import {
  Component,
  ContentChild,
  ElementRef,
  HostListener,
  Input,
  TemplateRef,
  ViewChild,
  Output,
  ViewEncapsulation,
  EventEmitter,
  ChangeDetectionStrategy
} from '@angular/core';

import { ChartComponent } from '../common/charts/chart.component';
import { BaseChartComponent } from '../common/base-chart.component';
import { calculateViewDimensions, ViewDimensions } from '../common/view-dimensions.helper';
import d3 from '../d3';
import { ColorHelper } from '../common/color.helper';

@Component({
  selector: 'ngx-charts-force-directed-graph',
  template: `
    <ngx-charts-chart
      [view]="[width, height]"
      [showLegend]="legend"
      [legendOptions]="legendOptions"
      (legendLabelClick)="onClick($event)"
      (legendLabelActivate)="onActivate($event)"
      (legendLabelDeactivate)="onDeactivate($event)">
      <svg:g [attr.transform]="transform" class="force-directed-graph chart">
        <svg:g class="links">
          <svg:g *ngFor="let link of links; trackBy:trackLinkBy">
            <template *ngIf="linkTemplate"
              [ngTemplateOutlet]="linkTemplate"
              [ngOutletContext]="{ $implicit: link }">
            </template>
            <svg:line *ngIf="!linkTemplate"
              strokeWidth="1" class="edge"
              [attr.x1]="link.source.x"
              [attr.y1]="link.source.y"
              [attr.x2]="link.target.x"
              [attr.y2]="link.target.y"
            />
          </svg:g>
        </svg:g>
        <svg:g class="nodes">
          <svg:g *ngFor="let node of nodes; trackBy:trackNodeBy"
            [attr.transform]="'translate(' + node.x + ',' + node.y + ')'"
            [attr.fill]="colors.getColor(groupResultsBy(node))"
            [attr.stroke]="colors.getColor(groupResultsBy(node))"
            (mousedown)="onDragStart(node, $event)"
            (click)="onClick({name: node.value})"
            ngx-tooltip
            [tooltipDisabled]="tooltipDisabled"
            [tooltipPlacement]="'top'"
            [tooltipType]="'tooltip'"
            [tooltipTitle]="node.value">
            <template *ngIf="nodeTemplate"
              [ngTemplateOutlet]="nodeTemplate"
              [ngOutletContext]="{ $implicit: node }">
            </template>
            <svg:circle *ngIf="!nodeTemplate" r="5" />
          </svg:g>
        </svg:g>
      </svg:g>
    </ngx-charts-chart>
  `,
  styleUrls: [
    '../common/base-chart.component.scss',
    './force-directed-graph.component.scss'
  ],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ForceDirectedGraphComponent extends BaseChartComponent {

  @Input() force = d3.forceSimulation()
    .force('charge', d3.forceManyBody())
    .force('collide', d3.forceCollide(5))
    .force('x', d3.forceX())
    .force('y', d3.forceY());

  @Input() forceLink = d3.forceLink().id(node => node.value);
  @Input() legend: boolean;
  @Input() nodes: any[] = [];
  @Input() links: Array<{ source: any, target: any }> = [];
  @Input() activeEntries: any[] = [];
  @Input() tooltipDisabled: boolean = false;

  @Output() activate: EventEmitter<any> = new EventEmitter();
  @Output() deactivate: EventEmitter<any> = new EventEmitter();

  @ContentChild('linkTemplate') linkTemplate: TemplateRef<any>;
  @ContentChild('nodeTemplate') nodeTemplate: TemplateRef<any>;
  @ViewChild(ChartComponent, { read: ElementRef }) chart: ElementRef;

  colors: ColorHelper;
  dims: ViewDimensions;
  draggingNode: any;
  draggingStart: { x: number, y: number };
  margin = [0, 0, 0, 0];
  results = [];
  seriesDomain: any;
  transform: string;
  legendOptions: any;

  @Input() groupResultsBy: (node: any) => string = node => node.value;

  update(): void {
    super.update();

    this.zone.run(() => {
      // center graph
      this.dims = calculateViewDimensions({
        width: this.width,
        height: this.height,
        margins: this.margin,
        showLegend: this.legend,
      });

      this.seriesDomain = this.getSeriesDomain();
      this.setColors();
      this.legendOptions = this.getLegendOptions();

      this.transform = `
        translate(${ this.dims.xOffset + this.dims.width / 2 }, ${ this.margin[0] + this.dims.height / 2 })
      `;
      if(this.force) {
        this.force.nodes(this.nodes)
          .force('link', this.forceLink.links(this.links))
          .alpha(0.5).restart();
      }
    });
  }

  onClick(data): void {
    this.select.emit(data);
  }

  onActivate(event): void {
    if(this.activeEntries.indexOf(event) > -1) return;
    this.activeEntries = [ event, ...this.activeEntries ];
    this.activate.emit({ value: event, entries: this.activeEntries });
  }

  onDeactivate(event): void {
    const idx = this.activeEntries.indexOf(event);

    this.activeEntries.splice(idx, 1);
    this.activeEntries = [...this.activeEntries];

    this.deactivate.emit({ value: event, entries: this.activeEntries });
  }

  getSeriesDomain(): any[] {
    return this.nodes.map(d => this.groupResultsBy(d))
      .reduce((nodes: any[], node): any[] => nodes.includes(node) ? nodes : nodes.concat([node]), [])
      .sort();
  }

  trackLinkBy(index, link): any {
    return link.index;
  }

  trackNodeBy(index, node): any {
    return node.value;
  }

  setColors(): void {
    this.colors = new ColorHelper(this.scheme, 'ordinal', this.seriesDomain, this.customColors);
  }

  getLegendOptions() {
    return {
      scaleType: 'ordinal',
      domain: this.seriesDomain,
      colors: this.colors
    };
  }

  // Easier to use Angular2 event management than use d3.drag
  onDragStart(node, $event: MouseEvent): void {
    this.force.alphaTarget(0.3).restart();
    this.draggingNode = node;
    this.draggingStart = { x: $event.x - node.x, y: $event.y - node.y };
    this.draggingNode.fx = $event.x - this.draggingStart.x;
    this.draggingNode.fy = $event.y - this.draggingStart.y;
  }

  @HostListener('document:mousemove', ['$event'])
  onDrag($event: MouseEvent): void {
    if (!this.draggingNode) return;

    this.draggingNode.fx = $event.x - this.draggingStart.x;
    this.draggingNode.fy = $event.y - this.draggingStart.y;
  }

  @HostListener('document:mouseup')
  onDragEnd(node, $event: MouseEvent): void {
    if (!this.draggingNode) return;

    this.force.alphaTarget(0);
    this.draggingNode.fx = undefined;
    this.draggingNode.fy = undefined;
    this.draggingNode = undefined;
  }
}
