import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ExtraConditionsComponent } from './extra-conditions.component';

describe('ExtraConditionsComponent', () => {
  let component: ExtraConditionsComponent;
  let fixture: ComponentFixture<ExtraConditionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ExtraConditionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ExtraConditionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
