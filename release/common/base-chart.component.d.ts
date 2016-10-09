export declare abstract class BaseChart {
    results: any[];
    update(): void;
    cloneData(data: any): any[];
    abstract setColors(): any;
    abstract click(data: any, group: any): any;
}
