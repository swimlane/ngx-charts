
export declare class RegistryService {
    components: Map<{}, {}>;
    register(id: string, component: any, callback?: any): void;
    get(id: string): any;
    destroy(id: string): void;
    destroyAll(): void;
}
