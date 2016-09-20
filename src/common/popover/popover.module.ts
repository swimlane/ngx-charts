import {CommonModule} from "@angular/common";
import {Popover} from "./popover.directive";
import {PopoverComponent} from "./popover.component";
import {NgModule} from "@angular/core";

export * from "./popover.directive";
export * from "./popover.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        PopoverComponent,
        Popover,
    ],
    exports: [
        PopoverComponent,
        Popover,
    ],
    entryComponents: [
        PopoverComponent
    ]
})
export class PopoverModule {

}
