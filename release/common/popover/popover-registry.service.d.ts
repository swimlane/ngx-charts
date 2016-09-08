export declare class PopoverRegistry {
    private static _instance;
    popovers: any;
    instance: any;
    constructor();
    static getInstance(): PopoverRegistry;
    add(id: any, object: any): void;
    find(id: any): any;
    remove(id: any): void;
    removeGroup(group: any, currentId: any): void;
    cleanUp(): void;
}
