import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DateFormcontrolComponent } from './date-time-formcontrol.component';

describe('DateTimeFormcontrolComponent', () => {
  let component: DateFormcontrolComponent;
  let fixture: ComponentFixture<DateFormcontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DateFormcontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DateFormcontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
