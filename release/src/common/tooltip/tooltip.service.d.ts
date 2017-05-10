import { InjectionService } from './injection.service';
import { InjectionRegistery } from './injection-registery.service';
export declare class TooltipService extends InjectionRegistery {
    injectionService: InjectionService;
    type: any;
    constructor(injectionService: InjectionService);
}
