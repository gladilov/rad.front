import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ResultDateTimeComponent } from './result-date-time.component';

describe('ResultDateTimeComponent', () => {
  let component: ResultDateTimeComponent;
  let fixture: ComponentFixture<ResultDateTimeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ResultDateTimeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ResultDateTimeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
