import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestEndGiveDateTimeComponent } from './request-end-give-date-time.component';

describe('RequestEndGiveDateTimeComponent', () => {
  let component: RequestEndGiveDateTimeComponent;
  let fixture: ComponentFixture<RequestEndGiveDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestEndGiveDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestEndGiveDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
