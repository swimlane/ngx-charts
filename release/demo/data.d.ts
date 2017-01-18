export declare let single: {
    name: string;
    value: number;
}[];
export declare let multi: {
    name: string;
    series: {
        name: string;
        value: number;
    }[];
}[];
export declare let countries: string[];
export declare function generateGraph(nodeCount: number): {
    links: any[];
    nodes: any[];
};
export declare function generateData(seriesLength: any): any[];
