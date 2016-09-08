import { NgModule } from "@angular/core";
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { App } from './app';
import { NG2D3Module } from "../src/ng2d3";

@NgModule({
  imports: [NG2D3Module, BrowserModule, FormsModule],
  declarations: [App],
  bootstrap: [App]
})
class AppModule {}

 document.addEventListener('DOMContentLoaded', () => {
   platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.error(err));
 });
