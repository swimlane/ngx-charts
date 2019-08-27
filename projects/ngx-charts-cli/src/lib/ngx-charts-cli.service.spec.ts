import { TestBed } from '@angular/core/testing';

import { NgxChartsCliService } from './ngx-charts-cli.service';

describe('NgxChartsCliService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: NgxChartsCliService = TestBed.get(NgxChartsCliService);
    expect(service).toBeTruthy();
  });
});
