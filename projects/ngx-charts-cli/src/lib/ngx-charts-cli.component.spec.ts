import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NgxChartsCliComponent } from './ngx-charts-cli.component';

describe('NgxChartsCliComponent', () => {
  let component: NgxChartsCliComponent;
  let fixture: ComponentFixture<NgxChartsCliComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NgxChartsCliComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NgxChartsCliComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
