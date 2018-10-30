import { OnChanges, SimpleChanges, EventEmitter, TemplateRef } from '@angular/core';
export declare class TreeMapCellSeriesComponent implements OnChanges {
    data: any;
    dims: any;
    colors: any;
    valueFormatting: any;
    labelFormatting: any;
    gradient: boolean;
    tooltipDisabled: boolean;
    tooltipTemplate: TemplateRef<any>;
    animations: boolean;
    select: EventEmitter<{}>;
    cells: any[];
    ngOnChanges(changes: SimpleChanges): void;
    getCells(): any[];
    getTooltipText({ label, value }: {
        label: any;
        value: any;
    }): string;
    onClick(data: any): void;
    trackBy(index: any, item: any): string;
}
