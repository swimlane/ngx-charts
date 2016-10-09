export declare function debounce(func: any, wait: any, immediate: any): () => any;
export declare function debounceable(duration: any, immediate: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
export declare function throttle(func: any, wait: number, options?: any): () => any;
export declare function throttleable(duration: number, options?: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
