import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeLimitsComponent } from './time-limits.component';

describe('TimeLimitsComponent', () => {
  let component: TimeLimitsComponent;
  let fixture: ComponentFixture<TimeLimitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TimeLimitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TimeLimitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
