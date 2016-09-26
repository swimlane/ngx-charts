/// <reference types="core-js" />
export declare class TooltipService {
    components: Map<{}, {}>;
    register(id: string, component: any, callback: any): void;
    destroy(id: string): void;
    destroyAll(): void;
}
