import { NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserDynamicTestingModule, platformBrowserDynamicTesting } from '@angular/platform-browser-dynamic/testing';

@NgModule({
  providers: [provideZonelessChangeDetection()]
})
class ZonelessModule {}

getTestBed().initTestEnvironment([BrowserDynamicTestingModule, ZonelessModule], platformBrowserDynamicTesting());
