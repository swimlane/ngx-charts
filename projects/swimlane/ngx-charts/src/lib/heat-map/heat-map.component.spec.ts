import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { multi } from '../../../../../../src/app/data';
import { APP_BASE_HREF } from '@angular/common';

import { HeatMapModule } from './heat-map.module';

vi.setConfig({ testTimeout: 30000, hookTimeout: 30000 });

@Component({
  selector: 'test-component',
  template: `
    <ngx-charts-heat-map
      [animations]="false"
      [view]="[400, 800]"
      [scheme]="colorScheme"
      [results]="multi"
      [gradient]="gradient"
      [innerPadding]="innerPadding"
    >
    </ngx-charts-heat-map>
  `,
  imports: [HeatMapModule]
})
class TestComponent {
  multi: any = multi;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  gradient = false;
  innerPadding: number | number[] = 8;
}

describe('<ngx-charts-heat-map>', () => {
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

    it('should render 12 cell elements', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('rect.cell').length).toEqual(12);
    });

    it('should render correct cell size', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

      expect(svg.getAttribute('width')).toBe('84');
      expect(svg.getAttribute('height')).toBe('254');
    });
  });

  describe('with gradiant', () => {
    it('should set fill attr', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.gradient = true;
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

      expect(svg.getAttribute('fill')).toMatch(/url\(.*\)/);
    });
  });

  describe('padding', () => {
    it('should render correct cell size, with zero padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.innerPadding = 0;
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

      expect(svg.getAttribute('width')).toBe('90');
      expect(svg.getAttribute('height')).toBe('260');
    });
  });

  describe('padding - 2', () => {
    it('should render correct cell size, with padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.innerPadding = 20;
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

      expect(svg.getAttribute('width')).toBe('75'); // ~(360 - 3 * innerPadding) / 4
      expect(svg.getAttribute('height')).toBe('246'); // ~(780 - 2 * innnerPadding) / 3
    });
  });

  describe('padding - 3', () => {
    it('should render correct cell size, with x and y padding', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.componentInstance.innerPadding = [50, 40];
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

      expect(svg.getAttribute('width')).toBe('52'); // ~(360 - 3 * innerPadding) / 4
      expect(svg.getAttribute('height')).toBe('233'); // ~(780 - 2 * innnerPadding) / 3
    });
  });
});
