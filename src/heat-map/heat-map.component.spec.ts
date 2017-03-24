import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';

import '../../config/testing-utils';
import { multi } from '../../demo/data';
import {APP_BASE_HREF} from '@angular/common';

import { HeatMapModule } from './heat-map.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  multi: any = multi;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

(TRAVIS ? xdescribe : describe)('<ngx-charts-heat-map>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [HeatMapModule],
      providers: [
        {provide: APP_BASE_HREF, useValue: '/'}
      ]
    });
  });

  describe('basic setup', () => {

    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-heat-map
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="multi">
              </ngx-charts-heat-map>`
        }
      });
    });

    it('should set the svg width and height', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('svg');

        expect(svg.getAttribute('width')).toBe('400');
        expect(svg.getAttribute('height')).toBe('800');
        done();
      });
    });

    it('should render 12 cell elements', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const compiled = fixture.debugElement.nativeElement;

        expect(compiled.querySelectorAll('rect.cell').length).toEqual(12);
        done();
      });
    });

    it('should render correct cell size', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

        expect(svg.getAttribute('width')).toBe('84');
        expect(svg.getAttribute('height')).toBe('254');
        done();
      });
    });
  });

  describe('with gradiant', () => {

    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-heat-map
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="multi"
                [gradient]="true">
              </ngx-charts-heat-map>`
        }
      });
    });

    it('should set fill attr', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

        expect(svg.getAttribute('fill')).toMatch('url(.*)');
        done();
      });
    });
  });

  describe('padding', () => {

    it('should render correct cell size, with zero padding', (done) => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-heat-map
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="multi"
                [innerPadding]="0">
              </ngx-charts-heat-map>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

        expect(svg.getAttribute('width')).toBe('90');
        expect(svg.getAttribute('height')).toBe('260');
        done();
      });
    });

    it('should render correct cell size, with padding', (done) => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-heat-map
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="multi"
                [innerPadding]="20">
              </ngx-charts-heat-map>
          `
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

        expect(svg.getAttribute('width')).toBe('75'); // ~(360 - 3 * innerPadding) / 4
        expect(svg.getAttribute('height')).toBe('246'); // ~(780 - 2 * innnerPadding) / 3
        done();
      });
    });

    it('should render correct cell size, with x and y padding', (done) => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-heat-map
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="multi"
                [innerPadding]="[50,40]">
              </ngx-charts-heat-map>
          `
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const svg = fixture.debugElement.nativeElement.querySelector('rect.cell');

        expect(svg.getAttribute('width')).toBe('52'); // ~(360 - 3 * innerPadding) / 4
        expect(svg.getAttribute('height')).toBe('233'); // ~(780 - 2 * innnerPadding) / 3
        done();
      });
    });
  });
});
