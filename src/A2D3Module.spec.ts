/// <reference path="../node_modules/@types/jasmine/index.d.ts" />

import { A2D3Module } from './A2D3Module';

/*
  This file is to import the main module. By importing it into this
  spec file, all the attached components get traversed and recognized
  in the code coverage stats.
*/

describe('A2D3 Module', () => {

  it('should load', () => {
    expect(A2D3Module).toBeDefined();
  });

});
