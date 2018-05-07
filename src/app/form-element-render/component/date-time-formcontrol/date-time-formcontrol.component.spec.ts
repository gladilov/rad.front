import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateTimeFormcontrolComponent } from './date-time-formcontrol.component';

describe('DateTimeFormcontrolComponent', () => {
  let component: DateTimeFormcontrolComponent;
  let fixture: ComponentFixture<DateTimeFormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateTimeFormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateTimeFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
