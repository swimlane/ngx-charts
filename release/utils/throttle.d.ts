export declare function debounce(func: any, wait: any, immediate: any): () => any;
export declare function debounceable(duration: any, immediate: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
export declare function throttle(func: any, wait: any, options?: any): () => any;
export declare function throttleable(duration: any, options: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
