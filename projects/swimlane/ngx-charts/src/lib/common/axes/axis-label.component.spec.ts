import { TestBed, ComponentFixture } from '@angular/core/testing';
import { Component, ChangeDetectionStrategy } from '@angular/core';
import { By } from '@angular/platform-browser';
import { AxesModule } from './axes.module';
import { Orientation } from '../types/orientation.enum';

@Component({
  selector: 'test-axis-label',
  template: `
    <svg>
      <g
        ngx-charts-axis-label
        [label]="label"
        [orient]="orient"
        [width]="width"
        [height]="height"
        [offset]="offset"
        [fontSize]="fontSize"
      ></g>
    </svg>
  `,
  // eslint-disable-next-line @angular-eslint/prefer-on-push-component-change-detection -- preserve pre-Angular-22 Default CD behavior
  changeDetection: ChangeDetectionStrategy.Eager,
  imports: [AxesModule]
})
class TestAxisLabelComponent {
  label = 'Test Label';
  orient = Orientation.Bottom;
  width = 500;
  height = 300;
  offset = 20;
  fontSize: number | string = 16;
}

describe('AxisLabelComponent', () => {
  let fixture: ComponentFixture<TestAxisLabelComponent>;
  let component: TestAxisLabelComponent;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [TestAxisLabelComponent]
    });
    fixture = TestBed.createComponent(TestAxisLabelComponent);
    component = fixture.componentInstance;
  });

  it('renders axis label with axis-label class', () => {
    fixture.detectChanges();
    const textEl = fixture.debugElement.query(By.css('text.axis-label'));
    expect(textEl).toBeTruthy();
    expect(textEl.nativeElement.textContent.trim()).toBe('Test Label');
  });

  it('sets font-size attribute and style when fontSize is a number', () => {
    fixture.detectChanges();
    const textEl = fixture.debugElement.query(By.css('text.axis-label'));
    expect(textEl.nativeElement.getAttribute('font-size')).toBe('16px');
    expect(textEl.nativeElement.style.fontSize).toBe('16px');
  });

  it('sets font-size attribute and style when fontSize is a string', () => {
    component.fontSize = '20px';
    fixture.detectChanges();
    const textEl = fixture.debugElement.query(By.css('text.axis-label'));
    expect(textEl.nativeElement.getAttribute('font-size')).toBe('20px');
    expect(textEl.nativeElement.style.fontSize).toBe('20px');
  });

  it('does not set font-size attribute when fontSize is undefined', () => {
    component.fontSize = undefined;
    fixture.detectChanges();
    const textEl = fixture.debugElement.query(By.css('text.axis-label'));
    expect(textEl.nativeElement.getAttribute('font-size')).toBeNull();
    expect(textEl.nativeElement.style.fontSize).toBeFalsy();
  });
});
