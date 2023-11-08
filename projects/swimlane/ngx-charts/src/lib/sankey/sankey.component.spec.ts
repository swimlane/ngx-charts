import { TestBed } from '@angular/core/testing';
import { Component } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';

import { APP_BASE_HREF } from '@angular/common';

import { SankeyModule } from './sankey.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
}

describe('<ngx-charts-sankey>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, SankeyModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
              <ngx-charts-sankey
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="[
                  { source: 'United States Of America', target: 'Japan', value: 50 },
                  { source: 'Germany', target: 'Japan', value: 80 },
                  { source: 'Germany', target: 'South Korea', value: 25 },
                  { source: 'France', target: 'South Korea', value: 30 },
                  { source: 'France', target: 'Italy', value: 10 },
                  { source: 'France', target: 'North Macedonia', value: 15 },
                  { source: 'India', target: 'Japan', value: 10 },
                  { source: 'Japan', target: 'UK', value: 60 },
                  { source: 'Japan', target: 'UK', value: 10 },
                  { source: 'Japan', target: 'Democratic Republic of São Tomé and Príncipe', value: 50 },
                  { source: 'Japan', target: 'Republic of Equatorial Guinea', value: 20 },
                  { source: 'South Korea', target: 'UK', value: 55 },
                  { source: 'Italy', target: 'UK', value: 10 },
                  { source: 'North Macedonia', target: 'Republic of Equatorial Guinea', value: 15 },
                  { source: 'UK', target: 'Independent and the Sovereign Republic of Kiribati', value: 10 },
                  { source: 'UK', target: 'Commonwealth of the Northern Mariana Islands', value: 60 },
                  { source: 'UK', target: 'Bosnia and Herzegovina', value: 25 },
                  { source: 'UK', target: 'Spain', value: 20 },
                  { source: 'UK', target: 'Bosnia and Herzegovina', value: 20 },
                  { source: 'Republic of Equatorial Guinea', target: 'Republic of Costa Rica', value: 30 },
                  { source: 'Republic of Equatorial Guinea', target: 'Portugal', value: 5 }
                ]">
              </ngx-charts-sankey>`
        }
      }).compileComponents();
    });

    it('should set the svg width and height', () => {
      const fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();

      const svg = fixture.debugElement.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });
  });
});
