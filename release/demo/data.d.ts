export declare const single: {
    name: string;
    value: number;
}[];
export declare const multi: {
    name: string;
    series: {
        name: string;
        value: number;
    }[];
}[];
export declare const bubble: {
    name: string;
    series: {
        name: Date;
        x: Date;
        y: number;
        r: number;
    }[];
}[];
export declare const countries: string[];
export declare function generateGraph(nodeCount: number): {
    links: any[];
    nodes: any[];
};
export declare function generateData(seriesLength: number, includeMinMaxRange: boolean): any[];
