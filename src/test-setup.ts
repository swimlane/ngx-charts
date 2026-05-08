import { getPlatform } from '@angular/core';
import { getTestBed } from '@angular/core/testing';
import { BrowserTestingModule, platformBrowserTesting } from '@angular/platform-browser/testing';

const testBed = getTestBed();
testBed.resetTestEnvironment();
getPlatform()?.destroy();
testBed.initTestEnvironment(BrowserTestingModule, platformBrowserTesting(), {
  errorOnUnknownElements: false,
  errorOnUnknownProperties: false,
  teardown: { destroyAfterEach: true }
});
