import { TestBed, async } from '@angular/core/testing';
import { Component } from '@angular/core';
import { By } from '@angular/platform-browser';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { single } from '../../../../../../src/app/data';
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

describe('<ngx-charts-bar-horizontal>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, BarChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-horizontal
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single">
              </ngx-charts-bar-horizontal>`
        }
      }).compileComponents();
    }));

    it('should set the svg width and height', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    }));

    it('should render 12 cell elements', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const compiled = fixture.debugElement.nativeElement;

      expect(compiled.querySelectorAll('path.bar').length).toEqual(6);
    }));

    it('should render correct cell size', async(() => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const bar = fixture.debugElement.query(By.directive(BarComponent));

      expect(bar.componentInstance.height).toEqual(123); // ~(780 - 5 * barPadding) / 6
    }));
  });

  describe('padding', () => {
    it('should render correct cell size, with zero padding', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-horizontal
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="0">
              </ngx-charts-bar-horizontal>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.height).toEqual(130); // ~(780 - 5 * barPadding) / 6
      });
    }));

    it('should render correct cell size, with padding', async(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-bar-horizontal
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="single"
                [barPadding]="20">
              </ngx-charts-bar-horizontal>`
        }
      });

      TestBed.compileComponents().then(() => {
        const fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();

        const bar = fixture.debugElement.query(By.directive(BarComponent));

        expect(bar.componentInstance.height).toEqual(113); // ~(780 - 5 * barPadding) / 6
      });
    }));
  });
});
