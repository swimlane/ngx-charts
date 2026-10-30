import { Component } from '@angular/core';
import { TestBed } from '@angular/core/testing';

import { ChartCommonModule } from '../chart-common.module';

@Component({
  template: `
    <div
      ngx-charts-count-up
      [countFrom]="0"
      [countTo]="countTo"
      [countDuration]="0.001"
      [valueFormatting]="valueFormatting"
    ></div>
  `,
  imports: [ChartCommonModule]
})
class CountUpHostComponent {
  countTo = 140;
  valueFormatting = (value: number) => `${Math.round(value)} €`;
}

describe('CountUpDirective', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [CountUpHostComponent]
    });
  });

  it('applies valueFormatting after countTo is bound', async () => {
    const fixture = TestBed.createComponent(CountUpHostComponent);
    fixture.detectChanges();

    await new Promise<void>(resolve => setTimeout(resolve, 50));
    fixture.detectChanges();

    const element = fixture.nativeElement.querySelector('[ngx-charts-count-up]');
    expect(element.textContent.trim()).toBe('140 €');
  });
});
