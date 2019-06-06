export declare const MouseEvent: MouseEvent & {
    new (typeArg: string, eventInitDict?: MouseEventInit): MouseEvent;
    prototype?: MouseEvent;
};
export declare function createMouseEvent(name: string, bubbles?: boolean, cancelable?: boolean): MouseEvent;
