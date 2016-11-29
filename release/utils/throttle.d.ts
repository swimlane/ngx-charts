export declare function debounce(func: any, wait: any, immediate: any): () => any;
/**
 * Debounce decorator
 *
 *  class MyClass {
 *    debounceable(10)
 *    myFn() { ... }
 *  }
 */
export declare function debounceable(duration: any, immediate: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
/**
 * Throttle a function
 * @param  {any}    func    function to execute
 * @param  {number} wait    duration to wait
 * @param  {any}    options options
 */
export declare function throttle(func: any, wait: number, options?: any): () => any;
/**
 * Throttle decorator
 *
 *  class MyClass {
 *    throttleable(10)
 *    myFn() { ... }
 *  }
 */
export declare function throttleable(duration: number, options?: any): (target: any, key: any, descriptor: any) => {
    configurable: boolean;
    enumerable: any;
    get: () => any;
};
