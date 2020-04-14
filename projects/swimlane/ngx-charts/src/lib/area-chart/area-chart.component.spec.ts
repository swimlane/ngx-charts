import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, DebugElement } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { APP_BASE_HREF } from '@angular/common';

import { multi } from '../../../../../../src/app/data';

import { AreaChartModule } from './area-chart.module';

jasmine.DEFAULT_TIMEOUT_INTERVAL = 30000;

const colors = ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'];

@Component({
  selector: 'test-component',
  template: ''
})
class TestComponent {
  data: any = multi;
  colorScheme = {
    domain: colors
  };
}

describe('<ngx-charts-area-chart>', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TestComponent],
      imports: [NoopAnimationsModule, AreaChartModule],
      providers: [{ provide: APP_BASE_HREF, useValue: '/' }]
    });
  });

  describe('basic setup', () => {
    let fixture: ComponentFixture<TestComponent>;
    let de: DebugElement;

    beforeEach(() => {
      TestBed.overrideComponent(TestComponent, {
        set: {
          template: `
               <ngx-charts-area-chart
                [animations]="false"
                [view]="[400,800]"
                [scheme]="colorScheme"
                [results]="data">
              </ngx-charts-area-chart>`
        }
      }).compileComponents();
      fixture = TestBed.createComponent(TestComponent);
      fixture.detectChanges();
      de = fixture.debugElement;
    });

    it('should set the svg width and height', () => {
      const svg = de.nativeElement.querySelector('svg');

      expect(svg.getAttribute('width')).toBe('400');
      expect(svg.getAttribute('height')).toBe('800');
    });

    it('should render 4 area elements', () => {
      const compiled = de.nativeElement;
      expect(compiled.querySelectorAll('path.area').length).toEqual(4);
    });

    it('should match specified colors for area elements', () => {
      const compiled = de.nativeElement;

      const fills = Array.from(compiled.querySelectorAll('path.area')).map((areaElement: Element) =>
        areaElement.getAttribute('fill')
      );
      expect(colors.every(color => fills.includes(color))).toBeTruthy();
    });
  });
});
