import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';

import '../../config/testing-utils';
import { single } from '../../demo/data';
import { APP_BASE_HREF } from '@angular/common';

import { BarChartModule } from './bar-chart.module';
import { BarComponent } from './bar.component'; 

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  single: any = single;
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-bar-vertical>', () => {

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [BarChartModule],
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
               <ngx-charts-bar-vertical
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single">
              </ngx-charts-bar-vertical>`
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

        expect(compiled.querySelectorAll('path.bar').length).toEqual(6);
        done();
      });
    });

    it('should render correct cell size', (done) => {
      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.width).toEqual(53); // ~(360 - 5 * barPadding) / 6 
        done();
      });
    });
  });

  describe('padding', () => {

    it('should render correct cell size, with zero padding', (done) => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-vertical
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="0">
              </ngx-charts-bar-vertical>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.width).toEqual(60); // ~(360 - 5 * barPadding) / 6 
        done();
      });
    });

    it('should render correct cell size, with padding', (done) => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-vertical
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="20">
              </ngx-charts-bar-vertical>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.width).toEqual(43); // ~(360 - 5 * barPadding) / 6 
        done();
      });
    });
  });
});
