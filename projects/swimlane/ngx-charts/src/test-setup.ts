import { getPlatform, NgModule, provideZonelessChangeDetection } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

@NgModule({
  providers: [provideZonelessChangeDetection()]
})
class ZonelessTestModule {}

const testBed = getTestBed();
testBed.resetTestEnvironment();
getPlatform()?.destroy();
testBed.initTestEnvironment([BrowserTestingModule, ZonelessTestModule], platformBrowserTesting(), {
  errorOnUnknownElements: false,
  errorOnUnknownProperties: false,
  teardown: { destroyAfterEach: true }
});
