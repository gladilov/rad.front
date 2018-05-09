import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConditionalHoldingDateTimeComponent } from './conditional-holding-date-time.component';

describe('ConditionalHoldingDateTimeComponent', () => {
  let component: ConditionalHoldingDateTimeComponent;
  let fixture: ComponentFixture<ConditionalHoldingDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConditionalHoldingDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConditionalHoldingDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
