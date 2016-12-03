/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { NG2D3Module } from '.';

/*
  This file is to import the main module. By importing it into this
  spec file, all the attached components get traversed and recognized
  in the code coverage stats.
*/

describe('ng2d3 Module', () => {

  it('should load', () => {
    expect(NG2D3Module).toBeDefined();
  });

});
