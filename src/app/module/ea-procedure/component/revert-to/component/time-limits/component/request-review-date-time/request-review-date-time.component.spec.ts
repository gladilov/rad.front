import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestReviewDateTimeComponent } from './request-review-date-time.component';

describe('RequestReviewDateTimeComponent', () => {
  let component: RequestReviewDateTimeComponent;
  let fixture: ComponentFixture<RequestReviewDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestReviewDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestReviewDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
