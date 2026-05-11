import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { multi } from '../../../../../../src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { NumberCardModule } from './number-card.module';

vi.setConfig({ testTimeout: 30000, hookTimeout: 30000 });

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-number-card [animations]="false" [view]="[400, 800]" [scheme]="colorScheme" [results]="multi">
    </ngx-charts-number-card>
  `,
  imports: [NumberCardModule]
})
class TestComponent {
  multi: any = multi;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-number-card>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [NoopAnimationsModule, TestComponent],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    it('should set the svg width and height', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });

    it(`should render ${multi.length} ngx-charts-cards`, () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('g[ngx-charts-card]').length).toEqual(multi.length);
    });
  });
});
